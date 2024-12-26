export const mappedAriaRolesToAllowedDescendants = {
  alert: [["flow", "but with no main element descendants."]],
  alertdialog: ["flow"],
  application: ["flow"],
  article: [["flow", "but with no main element descendants."]],
  banner: [
    ["flow", "but with no main, header, or footer element descendants."],
  ],
  blockquote: [["flow", "but with no main element descendants."]],
  button: [
    [
      "phrasing",
      "but with no interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  caption: [["flow", "but with no main or table element descendants."]],
  cell: [["flow", "but with no main element descendants."]],
  checkbox: [
    [
      "phrasing",
      "but with no interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  code: ["phrasing"],
  columnheader: [
    [["flow", "but with no main, header, or footer element descendants."]],
  ],
  combobox: [["flow", "but with no main element descendants."]],
  complementary: [["flow", "but with no main element descendants."]],
  contentinfo: [
    [["flow", "but with no main, header, or footer element descendants."]],
  ],
  definition: ["phrasing"],
  deletion: ["phrasing"],
  dialog: ["flow"],
  directory: [["flow", "but with no main element descendants."]],
  document: ["flow"],
  emphasis: ["phrasing"],
  feed: [["flow", "but with no main element descendants."]],
  figure: [["flow", "but with no main element descendants."]],
  form: [["flow", "but with no form element descendants."]],
  generic: ["flow"],
  grid: [["specific", "Includes row and rowgroup roles."]],
  gridcell: [["flow", "but with no main element descendants."]],
  group: ["flow"],
  heading: ["phrasing"],
  img: [["phrasing", "but with no interactive content descendants."]],
  insertion: ["phrasing"],
  link: [
    [
      "flow",
      "but with no interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  list: [["specific", "Includes listitem roles."]],
  listbox: [["specific", "Includes option and group roles."]],
  listitem: [["flow", "but with no main element descendants."]],
  log: [["flow", "but with no main element descendants."]],
  main: [["flow", "but with no main element descendants."]],
  marquee: [["flow", "but with no main element descendants."]],
  math: ["flow"],
  menu: [
    [
      "specific",
      "Includes menuitem, menuitemcheckbox, and menuitemradio roles.",
    ],
  ],
  menubar: [
    [
      "specific",
      "Includes menuitem, menuitemcheckbox, and menuitemradio roles.",
    ],
  ],
  menuitem: [
    [
      "phrasing",
      "but with no interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  menuitemcheckbox: [
    [
      "phrasing",
      "but with no interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  menuitemradio: [
    [
      "phrasing",
      "but with no interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  meter: [["phrasing", "but with no meter element descendants."]],
  navigation: [["flow", "but with no main element descendants."]],
  none: ["flow"],
  note: [["flow", "but with no main element descendants."]],
  option: [
    [
      "phrasing",
      "but with no interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  paragraph: ["phrasing"],
  presentation: ["flow"],
  progressbar: [["phrasing", "but with no progress element descendants."]],
  radio: [
    [
      "phrasing",
      "but with no interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  radiogroup: ["flow"],
  region: [["flow", "but with no main element descendants."]],
  row: [["specific", "Includes cell, rowheader, and columnheader roles."]],
  rowgroup: [["specific", "Includes row roles."]],
  rowheader: [["flow", "but with no main element descendants."]],
  scrollbar: ["phrasing"],
  search: [["flow", "but with no main element descendants."]],
  searchbox: [["flow", "but with no main element descendants."]],
  separator: ["phrasing"],
  slider: ["phrasing"],
  spinbutton: [["flow", "but with no main element descendants."]],
  status: [["flow", "but with no main element descendants."]],
  strong: ["phrasing"],
  subscript: ["phrasing"],
  superscript: ["phrasing"],
  switch: [
    [
      "phrasing",
      "but with no interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  tab: [
    [
      "phrasing",
      "but with no interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  table: [["specific", "Includes row and rowgroup roles."]],
  tablist: [["specific", "Includes tab roles."]],
  tabpanel: ["flow"],
  term: ["phrasing"],
  textbox: [["flow", "but with no main element descendants."]],
  time: ["phrasing"],
  timer: [["flow", "but with no main element descendants."]],
  toolbar: [["flow", "but with no main element descendants."]],
  tooltip: ["phrasing"],
  tree: [["specific", "Includes treeitem and group roles."]],
  treegrid: [["specific", "Includes row and rowgroup roles."]],
  treeitem: ["phrasing"],
};
