"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getStyles;
const autoprefixer_1 = __importDefault(require("autoprefixer"));
const cssnano_1 = __importDefault(require("cssnano"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const postcss_1 = __importDefault(require("postcss"));
function getCssFile(filePath) {
    return fs_1.default.readFileSync(path_1.default.resolve(filePath), "utf8");
}
async function getStyles() {
    const authoredStyles = getCssFile("./styles/tailwind.css");
    const cssResult = await (0, postcss_1.default)([
        require("tailwindcss")("./tailwind.config.cjs"),
        autoprefixer_1.default,
        (0, cssnano_1.default)({
            preset: "default",
        }),
    ])
        .process(authoredStyles, { from: "styles.css", to: "styles.css" })
        .then((result) => {
        return result.css;
    });
    return cssResult;
}
//# sourceMappingURL=getStyles.js.map
