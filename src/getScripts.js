"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getScripts;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filterJsFiles = (file) => file.endsWith(".js");
const getDirectoryFiles = (dir) => {
    const absolutePath = path_1.default.resolve(dir);
    if (!fs_1.default.existsSync(absolutePath))
        return [];
    if (!fs_1.default.statSync(absolutePath).isDirectory())
        return [];
    return fs_1.default.readdirSync(absolutePath).filter(filterJsFiles);
};
async function getScripts() {
    const utilityFiles = getDirectoryFiles("./scripts/utilities");
    const componentFiles = getDirectoryFiles("./scripts/components");
    const getJsFiles = async (files, filePath) => {
        return files
            .map((file) => `${fs_1.default.readFileSync(path_1.default.resolve(filePath, file))}`)
            .join("");
    };
    const utilityJs = await getJsFiles(utilityFiles, "./scripts/utilities");
    const componentJs = await getJsFiles(componentFiles, "./scripts/components");
    return `${utilityJs}${componentJs}`;
}
//# sourceMappingURL=getScripts.js.map