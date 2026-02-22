"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePage = RolePage;
const jsx_runtime_1 = require("react/jsx-runtime");
const data_1 = require("../../data");
const Icons_1 = require("../components/Icons");
const MenuVisibilitySwitch_1 = require("../components/MenuVisibilitySwitch");
const Navigation_1 = require("../components/Navigation");
function RolePage({ role, abstractAriaRole }) {
    const roleTitle = data_1.mappedAriaRolesToDisplayNames[role] || role;
    const pageTitle = "ARIA Reference Guide";
    const roleWildcard = "*";
    const semanticContentCategories = ["flow", "phrasing", "interactive"];
    const normalizeSemanticCategories = (categories) => {
        const filtered = categories.filter((category) => semanticContentCategories.includes(category));
        if (filtered.includes("phrasing") && filtered.includes("flow")) {
            return filtered.filter((category) => category !== "flow");
        }
        return filtered;
    };
    const abstractAriaRoleTags = Object.entries(data_1.ariaRolesByAbstractRole)
        .filter(([, value]) => value.includes(role))
        .map(([key]) => key)
        .sort()
        .map((key) => ({
        tagName: data_1.mappedAbstractAriaRolesToTitles[key] || key,
        url: data_1.mappedAbstractAriaRolesToUrls[key] || "",
        raw: key,
    }));
    const contentCategories = data_1.mappedAriaRolesToContentCategories[role] || [];
    const filteredContentCategories = contentCategories.filter((contentCategory) => ["flow", "phrasing", "interactive"].includes(contentCategory));
    if (filteredContentCategories.includes("flow") &&
        filteredContentCategories.includes("phrasing")) {
        filteredContentCategories.splice(filteredContentCategories.indexOf("flow"), 1);
    }
    const contentCategoryTags = filteredContentCategories
        .sort()
        .map((contentCategory) => ({
        tagName: data_1.mappedContentTypesToTitles[contentCategory] || contentCategory,
        url: data_1.mappedContentTypesToUrls[contentCategory] || "",
        raw: contentCategory,
    }));
    const allowedDescendantRule = data_1.mappedAriaRolesToAllowedDescendants[role] || {
        category: "specific",
        note: "N/A",
    };
    const roleCategories = normalizeSemanticCategories(data_1.mappedAriaRolesToContentCategories[role] || []);
    const nativeRoleElements = Array.from(new Set((data_1.ariaToHtmlMapping[role] || [])));
    const explicitRoleElements = Object.entries(data_1.allowedAriaRolesByHtmlElement)
        .filter(([, roles]) => roles.includes(role))
        .map(([elementName]) => elementName);
    const explicitUsageElements = Array.from(new Set(nativeRoleElements.concat(explicitRoleElements))).sort((a, b) => {
        const aNative = nativeRoleElements.includes(a);
        const bNative = nativeRoleElements.includes(b);
        if (aNative && !bNative) {
            return -1;
        }
        if (!aNative && bNative) {
            return 1;
        }
        return a.localeCompare(b);
    });
    const explicitUsageElementSet = new Set(explicitUsageElements);
    const wildcardUsageElements = Object.entries(data_1.allowedAriaRolesByHtmlElement)
        .filter(([elementName, roles]) => {
        if (!roles.includes(roleWildcard)) {
            return false;
        }
        if (explicitUsageElementSet.has(elementName)) {
            return false;
        }
        const knownElementCategories = data_1.htmlElementsToContentCategories[elementName];
        if (!roleCategories.length || knownElementCategories === undefined) {
            return true;
        }
        const elementCategories = normalizeSemanticCategories(knownElementCategories);
        return roleCategories.some((category) => elementCategories.includes(category));
    })
        .map(([elementName]) => elementName)
        .sort((a, b) => a.localeCompare(b));
    return ((0, jsx_runtime_1.jsxs)("html", { lang: "en", children: [(0, jsx_runtime_1.jsxs)("head", { children: [(0, jsx_runtime_1.jsx)("meta", { charSet: "utf-8" }), (0, jsx_runtime_1.jsx)("meta", { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" }), (0, jsx_runtime_1.jsx)("title", { children: `The ${role} role - ${pageTitle}` }), (0, jsx_runtime_1.jsx)("meta", { name: "description", content: data_1.mappedAriaRolesToDescriptions[role] }), (0, jsx_runtime_1.jsx)("link", { rel: "stylesheet", href: "/styles.css" }), (0, jsx_runtime_1.jsx)("link", { rel: "manifest", href: "/manifest.json" })] }), (0, jsx_runtime_1.jsxs)("body", { children: [(0, jsx_runtime_1.jsx)(Icons_1.IconDefinitions, {}), (0, jsx_runtime_1.jsxs)("div", { className: "root", children: [(0, jsx_runtime_1.jsxs)("header", { role: "banner", className: "top", children: [(0, jsx_runtime_1.jsx)("a", { href: "/", className: "page-heading", children: pageTitle }), (0, jsx_runtime_1.jsx)(MenuVisibilitySwitch_1.MenuVisibilitySwitch, {})] }), (0, jsx_runtime_1.jsxs)("div", { className: "middle", children: [(0, jsx_runtime_1.jsx)("div", { className: "menu", id: "nav", children: (0, jsx_runtime_1.jsx)(Navigation_1.Navigation, { role: role }) }), (0, jsx_runtime_1.jsx)("main", { className: "main", children: (0, jsx_runtime_1.jsxs)("div", { className: `content content--is-aria-role-${role} content--abstract-role-${abstractAriaRole}`, children: [(0, jsx_runtime_1.jsx)("div", { className: "content__header", children: (0, jsx_runtime_1.jsxs)("div", { className: "content__header__info", children: [(0, jsx_runtime_1.jsx)("div", { className: "content__heading__container", children: (0, jsx_runtime_1.jsx)("h1", { className: "content__heading", id: role, "aria-label": `The ${role} role`, tabIndex: -1, dangerouslySetInnerHTML: {
                                                                        __html: `<span aria-hidden="true">The ${roleTitle} role</span>`,
                                                                    } }) }), (0, jsx_runtime_1.jsx)("div", { className: "content__links", children: Object.entries(data_1.links).map(([name, link]) => ((0, jsx_runtime_1.jsxs)("a", { href: link + role, target: "_blank", children: [name, (0, jsx_runtime_1.jsx)(Icons_1.ExternalLinkIcon, {})] }, link))) })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "content__details", children: (0, jsx_runtime_1.jsxs)("div", { className: "list--gap", children: [(0, jsx_runtime_1.jsxs)("card-item", { children: [(0, jsx_runtime_1.jsx)("h2", { id: "h2--semantics", children: "Semantics" }), (0, jsx_runtime_1.jsx)("p", { className: "info", children: data_1.mappedAriaRolesToDescriptions[role] || "--" })] }, "semantics"), !!abstractAriaRoleTags.length && ((0, jsx_runtime_1.jsxs)("card-item", { class: "card--abstract-role", children: [(0, jsx_runtime_1.jsx)("h2", { id: "h2--abstract-roles", children: "Abstract Role" }), (0, jsx_runtime_1.jsx)("ul", { className: "list", children: abstractAriaRoleTags.map(({ tagName, raw }) => ((0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("svg", { fill: "none", "aria-hidden": "true", viewBox: "0 0 542 542", children: (0, jsx_runtime_1.jsx)("use", { href: `#icon--${raw}` }) }), (0, jsx_runtime_1.jsxs)("p", { className: "term-dfn", children: [(0, jsx_runtime_1.jsx)("dfn", { className: "info", children: tagName }), (0, jsx_runtime_1.jsx)("span", { className: "note", children: data_1.mappedAbstractAriaRolesToDescriptions[raw] })] })] }, "abstract-role-" + raw))) }), abstractAriaRoleTags.length > 1 && ((0, jsx_runtime_1.jsx)("p", { children: "May be an interactive Widget or non-interactive Structure, depending on the context." }))] }, "abstract-roles")), !!contentCategoryTags.length && ((0, jsx_runtime_1.jsxs)("card-item", { children: [(0, jsx_runtime_1.jsx)("h2", { id: "h2--content-categories", children: "Content Categories" }), (0, jsx_runtime_1.jsx)("ul", { className: "list", children: contentCategoryTags.map(({ tagName, raw }) => ((0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("svg", { fill: "none", "aria-hidden": "true", viewBox: "0 0 542 542", children: (0, jsx_runtime_1.jsx)("use", { href: `#icon--${raw}` }) }), (0, jsx_runtime_1.jsxs)("p", { className: "term-dfn", children: [(0, jsx_runtime_1.jsxs)("dfn", { className: "info", children: [tagName, " Content"] }), (0, jsx_runtime_1.jsx)("span", { className: "note", children: data_1.mappedContentTypesToDescriptions[raw] })] })] }, "content-category-" + raw))) })] }, "content-categories")), !contentCategoryTags.length && ((0, jsx_runtime_1.jsxs)("card-item", { children: [(0, jsx_runtime_1.jsx)("h2", { id: "h2--content-category", children: "Content Category" }), (0, jsx_runtime_1.jsx)("svg", { fill: "none", "aria-hidden": "true", viewBox: "0 0 542 542", children: (0, jsx_runtime_1.jsx)("use", { href: "#icon--parent" }) }), (0, jsx_runtime_1.jsx)("p", { className: "info", children: "Only Used with Specific Parent Roles" }), (0, jsx_runtime_1.jsx)("p", { children: "This role must be a direct descendant of one of the following roles:" }), data_1.mappedAriaRolesToContextRoles[role] && ((0, jsx_runtime_1.jsx)("ul", { className: "list", children: data_1.mappedAriaRolesToContextRoles[role].map((contextRole) => ((0, jsx_runtime_1.jsx)("li", { children: contextRole }, contextRole))) }))] }, "content-category")), (0, jsx_runtime_1.jsxs)("card-item", { children: [(0, jsx_runtime_1.jsx)("h2", { id: "h2--allowed-descendants", children: "Allowed Descendants" }), (0, jsx_runtime_1.jsx)("svg", { fill: "none", "aria-hidden": "true", viewBox: "0 0 542 542", children: (0, jsx_runtime_1.jsx)("use", { href: "#icon--children" }) }), (0, jsx_runtime_1.jsx)("p", { className: "info", children: allowedDescendantRule.category === "specific"
                                                                            ? "Specific Guidance"
                                                                            : `${data_1.mappedContentTypesToTitles[allowedDescendantRule.category]} Children Allowed` }), allowedDescendantRule.note ? ((0, jsx_runtime_1.jsx)("p", { children: allowedDescendantRule.note })) : null] }, "allowed-descendants"), data_1.ariaRolesWithPresentationalChildren.includes(role) && ((0, jsx_runtime_1.jsxs)("card-item", { children: [(0, jsx_runtime_1.jsx)("h2", { id: "h2--presentational-children", children: "Note" }), (0, jsx_runtime_1.jsx)("svg", { fill: "none", "aria-hidden": "true", viewBox: "0 0 542 542", children: (0, jsx_runtime_1.jsx)("use", { href: "#icon--warning" }) }), (0, jsx_runtime_1.jsx)("p", { className: "info", children: "Children Become Presentational" }), (0, jsx_runtime_1.jsxs)("p", { className: "note", children: ["Browsers automatically apply the", " ", (0, jsx_runtime_1.jsx)("code", { children: "presentation" }), " role to all descendant elements, so their semantics are not conveyed to assistive technologies."] })] }, "presentational-children")), (0, jsx_runtime_1.jsxs)("card-item", { children: [(0, jsx_runtime_1.jsx)("h2", { id: "h2--usage", children: "Usage" }), (0, jsx_runtime_1.jsx)("svg", { fill: "none", "aria-hidden": "true", viewBox: "0 0 542 542", children: (0, jsx_runtime_1.jsx)("use", { href: "#icon--html" }) }), (0, jsx_runtime_1.jsx)("p", { className: "info", children: "Allowed HTML elements" }), (0, jsx_runtime_1.jsx)("h3", { className: "usage__subheading", children: "Explicitly listed elements" }), (0, jsx_runtime_1.jsxs)("ul", { className: "list", children: [explicitUsageElements.map((elementName) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)("code", { children: [data_1.htmlElementsToDisplayNames[elementName] ||
                                                                                            elementName, nativeRoleElements.includes(elementName)
                                                                                            ? ""
                                                                                            : `[role=${role}]`] }) }, elementName))), !explicitUsageElements.length && ((0, jsx_runtime_1.jsx)("li", { children: "None" }, "explicit-none"))] }), (0, jsx_runtime_1.jsxs)("h3", { className: "usage__subheading", children: ["Wildcard (", (0, jsx_runtime_1.jsx)("code", { children: "*" }), ") elements filtered by content category"] }), (0, jsx_runtime_1.jsxs)("ul", { className: "list", children: [wildcardUsageElements.map((elementName) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)("code", { children: [data_1.htmlElementsToDisplayNames[elementName] ||
                                                                                            elementName, "[role=", role, "]"] }) }, elementName))), !wildcardUsageElements.length && ((0, jsx_runtime_1.jsx)("li", { children: "None" }, "wildcard-none"))] })] }, "usage")] }) })] }) })] })] }), (0, jsx_runtime_1.jsx)("script", { src: "/scripts.js" })] })] }));
}
//# sourceMappingURL=RolePage.js.map