"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlElementsToDisplayNames = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
exports.htmlElementsToDisplayNames = {
    "a[href]": (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "a\u00AD[href]" }),
    "input[type=checkbox]": (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "input\u00AD[type=\u00ADcheckbox]" }),
    "input[type=number]": (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "input\u00AD[type=\u00ADnumber]" }),
    "input[type=radio]": (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "input\u00AD[type=\u00ADradio]" }),
    "input[type=range]": (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "input\u00AD[type=\u00ADrange]" }),
    "input[type=reset]": (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "input\u00AD[type=\u00ADreset]" }),
    "input[type=submit]": (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "input\u00AD[type=\u00ADsubmit]" }),
    "input[type=text]": (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "input\u00AD[type=\u00ADtext]" }),
    "th[scope=col]": (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "th\u00AD[scope=\u00ADcol]" }),
    "th[scope=row]": (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "th\u00AD[scope=\u00ADrow]" }),
};
//# sourceMappingURL=htmlElementsToDisplayNames.js.map