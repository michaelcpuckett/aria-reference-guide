import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

const app = express();

const abstractAriaRolesByType = {
  interactive: ["composite", "widget"],
  "non-interactive": ["landmark", "structure", "live", "window"],
};

const mappedAbstractAriaRolesToTitles = {
  composite: "Composite Roles",
  landmark: "Landmark Roles",
  structure: "Structural Roles",
  widget: "Widget Roles",
  window: "Window Roles",
  live: "Live Region Roles",
};

const mappedAriaRolesToDisplayNames = {
  presentation: "presen<wbr />tation",
  definition: "defi<wbr />ni<wbr />tion",
  document: "docu<wbr />ment",
  emphasis: "emph<wbr />asis",
  paragraph: "para<wbr />graph",
  toolbar: "tool<wbr />bar",
  tooltip: "tool<wbr />tip",
  marquee: "mar<wbr />quee",
  application: "app<wbr />li<wbr />ca<wbr />tion",
  subscript: "sub<wbr />script",
  superscript: "super<wbr />script",
  contentinfo: "con<wbr />tent<wbr />info",
  complementary: "com<wbr />ple<wbr />men<wbr />tary",
  alertdialog: "alert<wbr />dialog",
  article: "arti<wbr />cle",
  treegrid: "tree<wbr />grid",
  radiogroup: "radio<wbr />group",
  treeitem: "tree<wbr />item",
  insertion: "ins<wbr />ertion",
  deletion: "del<wbr />etion",
  tabpanel: "tab<wbr />panel",
  columnheader: "column<wbr />header*",
  rowheader: "row<wbr />header*",
  row: "row*",
  menuitemcheckbox: "menu<wbr />item<wbr />check<wbr />box",
  separator: "separ<wbr />ator*",
  menuitemradio: "menu<wbr />item<wbr />radio",
  menuitem: "menu<wbr />item",
  progressbar: "prog<wbr />ress<wbr />bar",
  navigation: "navi<wbr />gation",
  combo: "combo<wbr />box",
  checkbox: "check<wbr />box",
  gridcell: "grid<wbr />cell",
  spinbutton: "spin<wbr />button",
  searchbox: "search<wbr />box",
  textbox: "text<wbr />box",
  scrollbar: "scroll<wbr />bar",
  combobox: "combo<wbr />box",
  rowgroup: "row<wbr />group",
  blockquote: "block<wbr />quote",
};

const mappedAbstractAriaRolesToDescriptions = {
  composite:
    "Composites are made up of multiple interactive widgets. Focus management may be handled by the composite element.",
  landmark:
    "Landmarks define top-level sections of a page that should appear in a site map or table of contents.",
  structure: "Structures represent non-interactive document semantics.",
  widget:
    "Widgets represent focusable, interactive elements. For user agents with browsing modes, widgets switch the mode to keyboard passthrough.",
  window:
    "Windows represent dialogs or windows that are children of the main window.",
  live: "Live regions represent dynamic content or announcements that may be updated without user interaction.",
};

const ariaRolesByCategory = {
  widget: [
    "button",
    "combobox",
    "checkbox",
    "columnheader",
    "gridcell",
    "link",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "option",
    "radio",
    "rowheader",
    "slider",
    "spinbutton",
    "switch",
    "tab",
    "textbox",
    "searchbox",
    "treeitem",
    "meter",
    "progressbar",
    "scrollbar",
    "separator",
  ],
  structure: [
    "application",
    "article",
    "blockquote",
    "caption",
    "cell",
    "code",
    "columnheader",
    "definition",
    "deletion",
    "document",
    "emphasis",
    "feed",
    "figure",
    "generic",
    "group",
    "heading",
    "img",
    "insertion",
    "list",
    "listitem",
    "mark",
    "math",
    "none",
    "note",
    "presentation",
    "paragraph",
    "row",
    "rowgroup",
    "rowheader",
    "separator",
    "strong",
    "subscript",
    "superscript",
    "table",
    "tabpanel",
    "term",
    "time",
    "tooltip",
    "toolbar",
  ],
  landmark: [
    "banner",
    "complementary",
    "contentinfo",
    "form",
    "main",
    "navigation",
    "region",
    "search",
  ],
  live: ["alert", "log", "marquee", "status", "timer"],
  composite: [
    "grid",
    "listbox",
    "menu",
    "menubar",
    "row",
    "radiogroup",
    "tree",
    "tablist",
    "treegrid",
  ],
  window: ["alertdialog", "dialog"],
};

const ariaToHtmlMapping = {
  button: ["<button>", "<summary>", '<input[type="submit"]>', '<input[type="reset]'],
  caption: ["<caption>"],
  cell: ["<td>"],
  blockquote: ["<blockquote>"],
  code: ["<code>"],
  checkbox: ['<input[type="checkbox"]>'],
  combobox: ["<select>"],
  dialog: ["<dialog>"],
  group: ["<fieldset>", "<details>"],
  figure: ["<figure>"],
  form: ["<form>"],
  heading: ["<h1>-<h6>"],
  img: ["<img>"],
  link: ["<a[href]>"],
  list: ["<ul>", "<ol>", "<dl>"],
  listbox: ["<select[multiple]>"],
  listitem: ["<li>"],
  term: ["<dfn>", "<dt>"],
  definition: ["<dd>"],
  option: ["<option>"],
  generic: ["<div>"],
  paragraph: ["<p>"],
  meter: ["<meter>"],
  progressbar: ["<progress>"],
  slider: ['<input[type="range"]>'],
  radio: ['<input[type="radio"]>'],
  region: ["<section>"],
  row: ["<tr>"],
  rowgroup: ["<thead>", "<tbody>", "<tfoot>"],
  rowheader: ['<th[scope="row"]>'],
  columnheader: ['<th[scope="col"]>'],
  search: ["<search>"],
  searchbox: ['<input[type="search"]>'],
  strong: ["<strong>"],
  status: ["<output>"],
  emphasis: ["<em>"],
  separator: ["<hr>"],
  deletion: ["<del>"],
  insertion: ["<ins>"],
  spinbutton: ['<input[type="number"]>'],
  textbox: ['<input[type="text"]>', '<textarea>'],
  table: ["<table>"],
  article: ["<article>"],
  banner: ["<header>"],
  complementary: ["<aside>"],
  contentinfo: ["<footer>"],
  main: ["<main>"],
  navigation: ["<nav>"],
  subscript: ["<sub>"],
  superscript: ["<sup>"],
  time: ["<time>"],
};

const mappedAriaRolesToDescriptions = {
  alert: "A live region for important, time-sensitive information.",
  alertdialog: "A type of dialog that contains an alert message.",
  application:
    "A region that represents an application. For user agents that support browse modes, this role switches to keyboard passthrough mode.",
  article:
    "A section of a page that consists of a composition that forms an independent part of a document, page, or site.",
  banner:
    "A region that contains mostly site-oriented content, rather than page-specific content.",
  button:
    "An input that allows for user-triggered actions when clicked or pressed.",
  checkbox:
    "A checkable input that has three possible values: true, false, or mixed.",
  columnheader:
    "A cell containing header information for a column. This may be interactive if it is a descendant of a grid.",
  rowheader:
    "A cell containing header information for a row. This may be interactive if it is a descendant of a grid.",
  code: "A piece of computer code.",
  mark: "A run of text in one document marked or highlighted for reference purposes, due to its relevance in another context.",
  marquee:
    "A type of live region where non-essential information changes frequently.",
  combobox:
    "A presentation of a select; usually similar to a textbox where users can type ahead to select an option, or type to enter arbitrary text as a new item in the list.",
  complementary:
    "A supporting section of the document, designed to be complementary to the main content at a similar level in the DOM hierarchy, but remains meaningful when separated from the main content.",
  contentinfo:
    "A large perceivable region that contains information about the parent document.",
  definition: "A definition of a term or concept.",
  deletion: "An element containing deleted content.",
  dialog:
    "A dialog is a descendant window of the primary window of a web application.",
  document:
    "A region that represents document content (as opposed to a web application.) For user agents that support browse modes, this role switches to document browse mode.",
  emphasis:
    "A range of text with a different semantic meaning than the surrounding content.",
  feed: "A scrollable list of articles where scrolling may cause articles to be added to or removed from either end of the list.",
  figure:
    "A figure is a block of content that is self-contained and typically referenced as a single unit from the main flow of the document.",
  form: "A landmark region that contains a collection of items and objects that, as a whole, combine to create a form.",
  generic: "A catch-all element without semantics.",
  grid: "A grid is an interactive control which contains cells of tabular data arranged in rows and columns (like a table).",
  gridcell:
    "A cell in a grid or treegrid. This is an interactive widget only if it is a descendant of a treetgrid.",
  group:
    "A set of user interface objects which are not intended to be included in a page summary or table of contents by assistive technologies.",
  heading: "A header that introduces the section.",
  img: "A container for a collection of elements that form an image.",
  insertion: "An element containing inserted content.",
  link: "An interactive reference to an internal or external resource that, when activated, causes the user agent to navigate to that resource.",
  list: "A group of non-interactive list items.",
  listbox:
    "A widget that allows the user to select one or more items from a list of choices.",
  listitem: "A single item in a list.",
  log: "A type of live region where new information is added in meaningful order and old information may disappear.",
  main: "The main content area of a document.",
  math: "Content that represents a mathematical expression.",
  menu: "A type of widget that offers a list of choices to the user.",
  menubar:
    "A presentation of menu that usually remains visible and is usually presented horizontally.",
  menuitem: "An option in a group of choices contained by a menu or menubar.",
  menuitemcheckbox:
    "A menuitem with a checkable state whose possible values are true, false, or mixed.",
  menuitemradio:
    "A checkable menuitem in a group of menuitemradio roles, only one of which can be checked at a time.",
  meter: "A measurement within a known range.",
  navigation:
    "A collection of navigational elements (usually links) for navigating the document or related documents.",
  note: "A section whose content is parenthetic or ancillary to the main content of the resource.",
  option: "A selectable item in a select list.",
  paragraph: "A paragraph of text.",
  presentation:
    "An element whose implicit native role semantics will not be mapped to the accessibility API.",
  none: "An element whose implicit native role semantics will not be mapped to the accessibility API.",
  progressbar:
    "A type of live region containing a numerical counter which indicates an amount of elapsed time from a start point, or the time remaining until an end point.",
  radiogroup: "A group of radio buttons.",
  radio:
    "A checkable input in a group of radio roles, only one of which can be checked at a time.",
  slider:
    "A user input where the user selects a value from within a given range.",
  spinbutton:
    "A form of range that expects a user to select from among discrete choices.",
  region:
    "A large perceivable section of a web page or document, that typically contains a collection of items and objects.",
  row: "A row of cells in a grid. This is an interactive widget only if it is a descendant of a treegrid.",
  rowgroup: "A group containing one or more row elements in a grid.",
  separator: "A divider that separates and distinguishes sections of content or groups of menuitems.",
  search: "A landmark region that contains a search facility.",
  searchbox: "A type of textbox intended for specifying search criteria.",
  scrollbar: "A graphical object that controls the scrolling of content within a viewing area, regardless of whether the content is fully displayed within the viewing area.",
  section: "A generic section of a document or application.",
  status: "A status message that is not interactive.",
  strong: "A range of text with strong importance, seriousness, or urgency.",
  subscript:
    "A subscript is a character that is set slightly below the normal line of type.",
  superscript:
    "A superscript is a character that is set slightly above the normal line of type.",
  switch:
    "A type of checkbox that represents on/off values, as opposed to checked/unchecked values.",
  table: "A non-interactive set of tabular data, with rows and columns.",
  tabpanel:
    "A container for the resources associated with a tab, where each tab is contained in a tablist.",
  term: "A word or phrase with a corresponding definition.",
  time: "A specific period in time.",
  toolbar: "A collection of commonly used function buttons.",
  tooltip: "A contextual popup that displays a description for an element.",
  tree: "A type of list that may contain sub-level elements that can be expanded and collapsed.",
  treegrid:
    "A grid whose rows can be expanded and collapsed in the same manner as for a tree.",
  treeitem: "An option item of a tree.",
};

const allowedAriaRolesByHtmlElement = {
  "<a[href]>": [
    "link",
    "button",
    "checkbox",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "option",
    "radio",
    "switch",
    "tab",
    "treeitem",
  ],
  "<abbr>": ["*"],
  "<address>": ["*"],
  '<article>': [
    "article",
    "application",
    "document",
    "feed",
    "main",
    "none",
    "presentation",
    "region",
  ],
  "<aside>": [
    "complementary",
    "feed",
    "none",
    "note",
    "presentation",
    "region",
    "search",
  ],
  "<audio>": ["application"],
  "<b>": ["*"],
  // "<bdi>": ["*"],
  // "<bdo>": ["*"],
  "<blockquote>": ["*"],
  "<br>": ["none", "presentation"],
  "<button>": [
    "button",
    "checkbox",
    "combobox",
    "link",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "option",
    "radio",
    "switch",
    "tab",
  ],
  "<canvas>": ["*"],
  "<caption>": ["caption"],
  "<cite>": ["*"],
  "<code>": ["*"],
  "<custom-element>": ["*"],
  "<data>": ["*"],
  "<datalist>": ["listbox"],
  "<del>": ["*"],
  "<details>": ["group"],
  "<dfn>": ["*"],
  "<dialog>": ["dialog", "alertdialog"],
  "<div>": ["*"],
  "<dl>": ["group", "list", "none", "presentation"],
  "<dt>": ["listitem"],
  "<em>": ["*"],
  "<embed>": ["application", "document", "img", "none", "presentation"],
  "<fieldset>": ["group", "none", "presentation", "radiogroup"],
  "<figcaption>": ["group", "none", "presentation"],
  "<figure>": ["*"],
  "<footer>": ["contentinfo", "group", "none", "presentation"],
  "<form>": ["form", "none", "presentation", "search"],
  "<h1>-<h6>": ["heading"],
  "<header>": ["banner", "group", "none", "presentation"],
  "<hgroup>": ["*"],
  "<hr>": ["separator", "none", "presentation"],
  "<i>": ["*"],
  "<iframe>": ["application", "document", "img", "none", "presentation"],
  "<img>": [
    "img",
    "button",
    "checkbox",
    "link",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "meter",
    "option",
    "progressbar",
    "radio",
    "scrollbar",
    "separator",
    "slider",
    "switch",
    "tab",
    "treeitem",
  ],
  "<input[type=checkbox]>": ["checkbox", "button", "menuitemcheckbox", "option", "switch"],
  "<input[type=number]>": ["spinbutton"],
  "<input[type=radio]>": ["radio", "menuitemradio"],
  "<input[type=range]>": ["slider"],
  "<input[type=text]>": ["textbox", "combobox", "searchbox", "spinbutton"],
  "<ins>": ["*"],
  "<kbd>": ["*"],
  "<li>": ["listitem"],
  "<main>": ["main"],
  "<mark>": ["*"],
  "<math>": ["math"],
  "<menu>": ["list", "group", "listbox", "menu", "menubar", "none", "presentation", "radiogroup", "tablist", "toolbar", "tree"],
  "<meter>": ["meter"],
  "<nav>": ["navigation", "menu", "menubar", "none", "presentation", "tablist"],
  "<object>": ["application", "document", "img"],
  "<ol>": ["list", "group", "listbox", "menu", "menubar", "none", "presentation", "radiogroup", "tablist", "toolbar", "tree"],
  "<optgroup>": ["group"],
  "<option>": ["option"],
  "<output>": ["*"],
  "<p>": ["*"],
  "<pre>": ["*"],
  "<progress>": ["progressbar"],
  "<q>": ["*"],
  // "<rp>": ["*"],
  // "<rt>": ["*"],
  // "<ruby>": ["*"],
  "<s>": ["deletion"],
  "<samp>": ["*"],
  "<search>": ["search"],
  "<section>": ["region", "alert", "alertdialog", "application", "banner", "complementary", "contentinfo", "dialog", "document", "feed", "log", "main", "marquee", "navigation", "none", "presentation", "search", "status", "tabpanel"],
  "<select>": ["menu", "combobox"],
  "<select[multiple]>": ["listbox"],
  "<small>": ["*"],
  "<span>": ["*"],
  "<strong>": ["strong"],
  "<sub>": ["subscript"],
  "<sup>": ["superscript"],
  "<summary>": ["button"],
  "<svg>": ["*"],
  "<table>": ["*"],
  "<tbody>": ["*"],
  "<td>": ["cell", "gridcell"],
  "<textarea>": ["textbox"],
  "<tfoot>": ["*"],
  "<th>": ["cell", "columnheader", "rowheader"],
  "<thead>": ["*"],
  "<time>": ["*"],
  "<tr>": ["row"],
  "<u>": ["*"],
  "<ul>": ["list", "group", "listbox", "menu", "menubar", "none", "presentation", "radiogroup", "tablist", "toolbar", "tree"],
  "<var>": ["*"],
  "<video>": ["application"],
  "<wbr>": ["none", "presentation"],
};

const mappedAbstractAriaRolesToBackgroundColors = {
  composite: "#371453",
  landmark: "rgb(255, 102, 0)",
  structure: "yellow",
  widget: "#5b0303",
  window: "rgb(255, 150, 255)",
  live: "rgb(100, 255, 100)",
};

const mappedAbstractAriaRolesToTextColors = {
  composite: "white",
  landmark: "black",
  structure: "black",
  widget: "white",
  window: "black",
  live: "black",
};

const ariaRolesWithOnlyPhrasingDescendants = [
  "button",
  "checkbox",
  "menuitem",
  "menuitemcheckbox",
  "menuitemradio",
  "meter",
  "option",
  "radio",
  "switch",
  "tab",
  "treeitem",
  "scrollbar",
  "separator",
  "slider",

  "code",
  "definition",
  "deletion",
  "emphasis",
  "heading",
  "img",
  "insertion",
  "paragraph",
  "progressbar",
  "strong",
  "subscript",
  "superscript",
  "time",
  "tooltip",
  "term",
];

const mappedAriaRolesToContentType = {
  alert: ["flow"],
  alertdialog: ["flow"],
  application: ["flow"],
  article: ["flow", "sectioning", "palpable"],
  banner: ["flow", "palpable"],
  blockquote: ["flow", "palpable"],
  button: ["flow", "phrasing", "interactive", "palpable"],
  caption: [],
  cell: [],
  checkbox: ["flow", "phrasing", "interactive"],
  code: ["flow", "phrasing", "palpable"],
  columnheader: [],
  combobox: ["flow", "phrasing", "interactive", "palpable"],
  complementary: ["flow", "sectioning", "palpable"],
  contentinfo: ["flow", "palpable"],
  definition: ["flow", "phrasing", "palpable"],
  deletion: ["flow", "phrasing"],
  dialog: ["flow"],
  document: ["flow"],
  emphasis: ["flow", "phrasing", "palpable"],
  feed: ["flow"],
  figure: ["flow", "palpable"],
  form: ["flow", "palpable"],
  generic: ["flow", "phrasing", "palpable"],
  grid: ["flow", "interactive", "palpable"],
  gridcell: ["interactive"],
  group: ["flow", "palpable"],
  heading: ["flow", "heading", "palpable"],
  img: ["flow", "phrasing", "embedded", "palpable"],
  insertion: ["flow", "phrasing", "palpable"],
  link: ["flow", "phrasing", "interactive", "palpable"],
  list: ["flow"],
  listbox: ["flow", "interactive", "palpable"],
  listitem: [],
  log: ["flow"],
  main: ["flow"],
  marquee: ["flow"],
  math: ["flow"],
  menu: ["flow", "interactive"],
  menubar: ["flow", "interactive"],
  menuitem: ["interactive"],
  menuitemcheckbox: ["interactive"],
  menuitemradio: ["interactive"],
  meter: ["flow", "phrasing", "palpable"],
  navigation: ["flow", "sectioning", "palpable"],
  none: [],
  note: ["flow"],
  option: ["interactive"],
  paragraph: ["flow", "palpable"],
  presentation: [],
  progressbar: ["flow", "phrasing"],
  radio: ["flow", "phrasing", "interactive"],
  radiogroup: ["flow", "palpable"],
  region: ["flow", "sectioning", "palpable"],
  row: [],
  rowgroup: [],
  rowheader: [],
  search: ["flow", "palpable"],
  searchbox: ["flow", "phrasing", "interactive"],
  separator: [],
  slider: ["flow", "phrasing", "interactive"],
  spinbutton: ["flow", "phrasing", "interactive"],
  status: ["flow"],
  strong: ["flow", "phrasing", "palpable"],
  subscript: ["flow", "phrasing", "palpable"],
  superscript: ["flow", "phrasing", "palpable"],
  switch: ["flow", "phrasing", "interactive"],
  tab: ["interactive"],
  table: ["flow", "palpable"],
  tablist: ["flow", "palpable"],
  tabpanel: ["flow"],
  term: ["phrasing"],
  textbox: ["interactive"],
  time: ["flow", "phrasing", "palpable"],
  timer: ["flow"],
  toolbar: ["flow"],
  tooltip: ["flow"],
  tree: ["flow"],
  treegrid: ["flow"],
  treeitem: ["interactive"],
};

function ARIAPeriodicTable() {
  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          * {
            box-sizing: border-box;
          }

          :root {
            font-family: sans-serif;
            font-size: 15px;
          }

          body {
            background: black;
          }

          .periodic-table__root {
            display: grid;
            place-content: center;
            list-style: none;
            padding: 0;
            grid-template-columns: 100%;
          }

          @media (min-width: 600px) {
            .periodic-table__root {
              grid-template-columns: repeat(auto-fill, minmax(8em, 1fr));
            }
          }

          .periodic-table__subgrid {
            display: grid;
            grid-template-columns: subgrid;
            grid-auto-flow: dense;
            font-size: 1em;
          }

          .periodic-table__subgrid-area {
            grid-column: 1 / -1;
          }

          .periodic-table__subgrid-area .periodic-table__subgrid-area-heading {
            background: #515151;
            color: white;
            letter-spacing: 0.25em;
            text-transform: uppercase;
            border-bottom: 4px solid black;
            border-right: 4px solid black;
          }

          .periodic-table__subgrid-row {
            display: contents;
          }

          h1 {
            text-align: center;
            font-size: 1.5em;
            color: white;
          }

          .periodic-table__subgrid-area h2 {
            grid-column: 1 / -1;
            border-bottom: 4px solid black;
            border-right: 4px solid black;
            text-align: center;
            margin: 0;
            padding: 1em 0;
            font-size: 1.333em;
          }

          ul {
            padding: 0;
            margin: 0;
            list-style: none;
          }

          .aria-role {
            display: grid;
            width: 100%;
            word-break: break-word;
            height: 100%;
            border-bottom: 4px solid black;
            border-right: 4px solid black;
          }

          @media (min-width: 600px) {
            .aria-role {
              aspect-ratio: 1;
            }
          }

          ${Object.entries(mappedAbstractAriaRolesToBackgroundColors)
            .map(([role, color]) => {
              return `
              .aria-role--abstract-role-${role} {
                background-color: ${color};
                color: ${mappedAbstractAriaRolesToTextColors[role]};
              }
            `;
            })
            .join("")}

          .aria-role--content-type-phrasing {
            background-color: rgb(160, 175, 255);
            color: black;
          }

          .aria-role--content-type-phrasing:is(.aria-role--abstract-role-widget, .aria-role--abstract-role-composite) {
            background-color: #074153;
            color: white;
          }

          .aria-role--interactive.aria-role--only-phrasing-descendants:not(.aria-role--content-type-phrasing) {
            background-image: linear-gradient(45deg, #074153 50%, transparent 50%);
          }

          .aria-role--non-interactive.aria-role--only-phrasing-descendants:not(.aria-role--content-type-phrasing) {
            background-image: linear-gradient(45deg, rgb(160, 175, 255) 50%, transparent 50%);
          }

          .aria-role__summary {
            text-align: center;
            display: grid;
            height: 100%;
            width: 100%;
            place-content: center;
            padding: 1em;
            cursor: pointer;
            font-size: 1em;
            font-weight: bold;
            text-decoration: underline;
          }
          
          .aria-role__dialog {
            min-height: 0;
            max-height: none;
            min-width: 0;
            max-width: none;
            border: 0;

            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            place-content: center;
            place-items: center;
          }

          .aria-role__dialog[open] {
            display: grid;
          }

          .aria-role__table {
            margin: 0;
            list-style: none;
            padding: 8px;
            display: grid;
            place-content: center;
            place-items: center;
            grid-auto-columns: 1fr;
          }

          .aria-role__dfn {
            margin: 0;
            padding: 0;
            text-align: center;
            display: block;
          }

          .visually-hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            margin: -1px;
            padding: 0;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
          }

          .is-strong {
            font-weight: bold;
          }

          dialog table {
            border-collapse: collapse;
          }

          dialog :is(td, th) {
            padding: 8px;
            border: 1px solid black;
          }
        `,
        }}
      />
      <h1>ARIA Roles</h1>
      <ul className="periodic-table__root">
        {Object.entries(abstractAriaRolesByType).map(
          ([type, abstractAriaRoles]) => {
            return (
              <li
                className="periodic-table__subgrid periodic-table__subgrid-area"
                key={type}
              >
                <h2 className="periodic-table__subgrid-area-heading">
                  {type}
                </h2>
                <ul
                  className="periodic-table__subgrid periodic-table__subgrid-row"
                  style={{}}
                >
                  {abstractAriaRoles.map((abstractAriaRole) => {
                    const ariaRoles = (
                      ariaRolesByCategory[abstractAriaRole] || []
                    ).sort((a?: string, b?: string) =>
                      a?.localeCompare(b || "")
                    );
                    const title =
                      mappedAbstractAriaRolesToTitles[abstractAriaRole];
                    const description =
                      mappedAbstractAriaRolesToDescriptions[abstractAriaRole];

                    return (
                      <li
                        key={abstractAriaRole}
                        className="periodic-table__subgrid periodic-table__subgrid-row"
                        style={{}}
                      >
                        <h3 className="visually-hidden">{title}</h3>
                        <ul
                          className="periodic-table__subgrid periodic-table__subgrid-row"
                          style={{}}
                        >
                          {ariaRoles
                            .sort((a, b) => {
                              const isAPhrasing = (
                                mappedAriaRolesToContentType[a] || []
                              ).includes("phrasing");
                              const isBPhrasing = (
                                mappedAriaRolesToContentType[b] || []
                              ).includes("phrasing");
                              const isAPhrasingDescedantsOnly =
                                ariaRolesWithOnlyPhrasingDescendants.includes(
                                  a
                                );
                              const isBPhrasingDescedantsOnly =
                                ariaRolesWithOnlyPhrasingDescendants.includes(
                                  b
                                );

                              if (isAPhrasing && !isBPhrasing) {
                                return 1;
                              }

                              if (!isAPhrasing && isBPhrasing) {
                                return -1;
                              }

                              if (
                                isAPhrasingDescedantsOnly &&
                                !isBPhrasingDescedantsOnly
                              ) {
                                return 1;
                              }

                              if (
                                !isAPhrasingDescedantsOnly &&
                                isBPhrasingDescedantsOnly
                              ) {
                                return -1;
                              }

                              return a.localeCompare(b);
                            })
                            .map((role) => {
                              const displayName =
                                mappedAriaRolesToDisplayNames[role] || role;

                              return (
                                <li
                                  aria-label={role}
                                  className={`
                                aria-role
                                aria-role--${
                                  type === "interactive"
                                    ?
                                  'interactive' : 'non-interactive'
                                }
                                aria-role--abstract-role-${abstractAriaRole}
                                ${
                                  ariaRolesWithOnlyPhrasingDescendants.includes(
                                    role
                                  )
                                    ? "aria-role--only-phrasing-descendants"
                                    : ""
                                }
                                ${(mappedAriaRolesToContentType[role] || [])
                                  .map(
                                    (contentType) =>
                                      `aria-role--content-type-${contentType}`
                                  )
                                  .join(" ")}
                              `}
                                  key={role}
                                >
                                  <expansion-button
                                    role="button"
                                    aria-haspopup="dialog"
                                    class="aria-role__summary"
                                    tabIndex={0}
                                    dangerouslySetInnerHTML={{
                                      __html: displayName,
                                    }}
                                  ></expansion-button>
                                  <dialog className="aria-role__dialog">
                                    <close-dialog-button>
                                      <button type="button">Close</button>
                                    </close-dialog-button>
                                    <div className="aria-role__details">
                                      <h1>{role}</h1>
                                      <table className="aria-role__table">
                                        <tr className="aria-role__row">
                                          <th
                                            className="aria-role__column-header"
                                            scope="col"
                                          >
                                            Description
                                          </th>
                                          <td className="aria-role__cell">
                                            {mappedAriaRolesToDescriptions[
                                              role
                                            ] || "--"}
                                          </td>
                                        </tr>
                                        
                                        <tr className="aria-role__row">
                                          <th
                                            className="aria-role__column-header"
                                            scope="col"
                                          >
                                            Category Description
                                          </th>
                                          <td className="aria-role__cell">
                                            <p>{description}</p>
                                          </td>
                                        </tr>

                                        <tr className="aria-role__row">
                                          <th
                                            className="aria-role__column-header"
                                            scope="col"
                                          >
                                            HTML Elements with Implicit ARIA
                                            Role
                                          </th>
                                          <td className="aria-role__cell">
                                            <ul>
                                              {(ariaToHtmlMapping[role] || []).map((htmlElement) => (
                                                <li key={htmlElement}>{htmlElement}</li>
                                              ))}
                                            </ul>
                                          </td>
                                        </tr>
                                        
                                        <tr className="aria-role__row">
                                          <th
                                            className="aria-role__column-header"
                                            scope="col"
                                          >
                                            Allowed HTML Elements
                                          </th>
                                          <td className="aria-role__cell">
                                            <details>
                                              <summary>See Allowed HTML Elements</summary>
                                              <ul>
                                                {Object.entries(allowedAriaRolesByHtmlElement).filter(([_, roles]) => roles.includes(role) || roles.includes('*')).map(([tagName, roles]) => (
                                                  <li className={roles.includes('*') ? '' : 'is-strong'} key={tagName}>{tagName}</li>
                                                ))}
                                              </ul>
                                            </details>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </dialog>
                                </li>
                              );
                            })}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          }
        )}
      </ul>

      <script
        dangerouslySetInnerHTML={{
          __html: `
        customElements.define('expansion-button', class extends HTMLElement {
          constructor() {
            super();

            const clickHandler = () => {
              const containerElement = this.closest('.aria-role');
              const dialogElement = containerElement.querySelector('dialog');

              if (!dialogElement) {
                return;
              }

              dialogElement.showModal();
            };

            this.addEventListener('click', clickHandler);
            this.addEventListener('keydown', (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                clickHandler();
              }
            });
          }
        });

        customElements.define('close-dialog-button', class extends HTMLElement {
          constructor() {
            super();

            const buttonElement = this.querySelector('button');

            console.log(this, buttonElement);

            if (!buttonElement) {
              throw new Error('No button element found');
            }

            buttonElement.addEventListener('click', () => {
              const dialogElement = this.closest('dialog');

              if (!dialogElement) {
                return;
              }

              dialogElement.close();
            });
          }
        });
      `,
        }}
      ></script>
    </div>
  );
}

app.get("/", (req, res) => {
  const htmlResult = `<!doctype HTML>${ReactDOMServer.renderToString(
    <ARIAPeriodicTable />
  )}`;
  res.send(htmlResult);
});

app.listen(10101, () => {
  console.log("Running on 10101");
});

type CustomElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement> & {
    class?: string;
    tabindex?: string;
  },
  HTMLElement
>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "expansion-button": CustomElement;
      "close-dialog-button": CustomElement;
    }
  }
}
