"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexPage = IndexPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const Icons_1 = require("../components/Icons");
const MenuVisibilitySwitch_1 = require("../components/MenuVisibilitySwitch");
const Navigation_1 = require("../components/Navigation");
const Overview_1 = require("../components/Overview");
function IndexPage() {
    const pageTitle = "ARIA Reference Guide";
    return ((0, jsx_runtime_1.jsxs)("html", { lang: "en", children: [(0, jsx_runtime_1.jsxs)("head", { children: [(0, jsx_runtime_1.jsx)("meta", { charSet: "utf-8" }), (0, jsx_runtime_1.jsx)("meta", { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" }), (0, jsx_runtime_1.jsx)("title", { children: pageTitle }), (0, jsx_runtime_1.jsx)("meta", { name: "description", content: "This representation of ARIA roles contains links to each role that will take you to a page with more information about the role." }), (0, jsx_runtime_1.jsx)("link", { rel: "manifest", href: "/manifest.json" }), (0, jsx_runtime_1.jsx)("link", { rel: "stylesheet", href: "/styles.css" }), (0, jsx_runtime_1.jsx)("script", { src: "/scripts.js" })] }), (0, jsx_runtime_1.jsxs)("body", { children: [(0, jsx_runtime_1.jsx)(Icons_1.IconDefinitions, {}), (0, jsx_runtime_1.jsxs)("div", { className: "root", children: [(0, jsx_runtime_1.jsxs)("header", { role: "banner", className: "top", children: [(0, jsx_runtime_1.jsx)("a", { href: "/", className: "page-heading", children: pageTitle }), (0, jsx_runtime_1.jsx)(MenuVisibilitySwitch_1.MenuVisibilitySwitch, {})] }), (0, jsx_runtime_1.jsxs)("div", { className: "middle", children: [(0, jsx_runtime_1.jsx)("div", { className: "menu", id: "nav", children: (0, jsx_runtime_1.jsx)(Navigation_1.Navigation, {}) }), (0, jsx_runtime_1.jsx)("main", { className: "main", children: (0, jsx_runtime_1.jsx)(Overview_1.Overview, {}) })] })] })] })] }));
}
//# sourceMappingURL=IndexPage.js.map