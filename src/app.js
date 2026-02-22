"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("react-dom/server"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const data_1 = require("../data");
const IndexPage_1 = require("./pages/IndexPage");
const RolePage_1 = require("./pages/RolePage");
const getScripts_1 = __importDefault(require("./getScripts"));
const getStyles_1 = __importDefault(require("./getStyles"));
const app = (0, express_1.default)();
function writePublicFile(filePath, content) {
    const resolvedPath = path_1.default.resolve(filePath);
    fs_1.default.mkdirSync(path_1.default.dirname(resolvedPath), { recursive: true });
    fs_1.default.writeFileSync(resolvedPath, content, "utf8");
}
app.get("/", async (_, res) => {
    const bodyHtml = server_1.default.renderToString((0, jsx_runtime_1.jsx)(IndexPage_1.IndexPage, {}));
    const htmlResult = "<!doctype html>" + bodyHtml;
    writePublicFile("./public/index.html", htmlResult);
    res.send(htmlResult);
});
app.get("/role/:role.html", (req, res) => {
    const [abstractRole] = Object.entries(data_1.ariaRolesByAbstractRole)
        .sort(([a], [b]) => (a > b ? 1 : -1))
        .find(([_, roles]) => roles.includes(req.params.role)) || [];
    if (!abstractRole) {
        return res.status(404).send("Role not found");
    }
    const htmlResult = `<!doctype html>
    ${server_1.default.renderToString((0, jsx_runtime_1.jsx)(RolePage_1.RolePage, { role: req.params.role, abstractAriaRole: abstractRole }))}
  `;
    writePublicFile(`./public/role/${req.params.role}.html`, htmlResult);
    res.send(htmlResult);
});
app.get("/styles.css", async (req, res) => {
    const cssResult = await (0, getStyles_1.default)();
    writePublicFile("./public/styles.css", cssResult);
    res.setHeader("Content-Type", "text/css");
    res.send(cssResult);
});
app.get("/scripts.js", async (req, res) => {
    const jsResult = await (0, getScripts_1.default)();
    writePublicFile("./public/scripts.js", jsResult);
    res.setHeader("Content-Type", "application/javascript");
    res.send(jsResult);
});
app.get("/build", (req, res) => {
    const allAriaRoles = Object.values(data_1.ariaRolesByAbstractRole).flat();
    const fetchPromises = allAriaRoles.map((role) => {
        return fetch(`http://localhost:10101/role/${role}.html`);
    });
    Promise.all([
        fetch("http://localhost:10101"),
        fetch("http://localhost:10101/scripts.js"),
        fetch("http://localhost:10101/styles.css"),
        ...fetchPromises,
    ]).then(() => {
        res.send("done");
    });
});
app.listen(10101, () => {
    console.log("Running on 10101");
});
//# sourceMappingURL=app.js.map