"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navigation = Navigation;
const jsx_runtime_1 = require("react/jsx-runtime");
const data_1 = require("../../data");
function Navigation({ role }) {
    return ((0, jsx_runtime_1.jsxs)("nav", { className: "nav", children: [(0, jsx_runtime_1.jsx)("h2", { children: "All Roles" }), (0, jsx_runtime_1.jsx)("ul", { className: "nav__list nav__list--role", children: Object.keys(data_1.mappedAriaRolesToDisplayNames)
                    .sort()
                    .map((ariaRole) => {
                    const roleDisplayName = data_1.mappedAriaRolesToDisplayNames[ariaRole] || ariaRole;
                    const roleDisplayHtml = { __html: roleDisplayName };
                    const roleUrl = `/role/${ariaRole}.html`;
                    return ((0, jsx_runtime_1.jsx)("li", { className: "nav__list-item nav__list-item--role", children: (0, jsx_runtime_1.jsx)("a", { "aria-label": ariaRole, className: "nav__list-item__link", href: roleUrl, "aria-current": ariaRole === role ? "page" : undefined, children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", dangerouslySetInnerHTML: roleDisplayHtml }) }) }, ariaRole));
                }) })] }));
}
//# sourceMappingURL=Navigation.js.map