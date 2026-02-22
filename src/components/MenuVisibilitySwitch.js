"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuVisibilitySwitch = MenuVisibilitySwitch;
const jsx_runtime_1 = require("react/jsx-runtime");
function MenuVisibilitySwitch() {
    return ((0, jsx_runtime_1.jsx)("menu-visibility-switch", { children: (0, jsx_runtime_1.jsxs)("label", { className: "switch", id: "menu-visibility-switch-label", "aria-label": "Toggle Menu", role: "none", children: [(0, jsx_runtime_1.jsx)("input", { id: "menu-visibility-switch", type: "checkbox", className: "visually-hidden", role: "button", "aria-expanded": "false", "aria-controls": "nav" }), (0, jsx_runtime_1.jsx)("svg", { "aria-hidden": "true", "data-if-unchecked": true, width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: (0, jsx_runtime_1.jsx)("use", { href: "#icon--open-menu" }) }), (0, jsx_runtime_1.jsx)("svg", { "aria-hidden": "true", "data-if-checked": true, width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: (0, jsx_runtime_1.jsx)("use", { href: "#icon--close-menu" }) })] }) }));
}
//# sourceMappingURL=MenuVisibilitySwitch.js.map