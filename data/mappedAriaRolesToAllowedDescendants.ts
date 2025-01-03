export const mappedAriaRolesToAllowedDescendants = {
  alert: [["flow", "No main element descendants allowed."]],
  alertdialog: [["flow"]],
  application: [["flow"]],
  article: [["flow", "No main element descendants allowed."]],
  banner: [["flow", "No main, header, or footer element descendants allowed."]],
  blockquote: [["flow", "No main element descendants allowed."]],
  button: [
    [
      "phrasing",
      "No interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  caption: [["flow", "No main or table element descendants allowed."]],
  cell: [["flow", "No main element descendants allowed."]],
  checkbox: [
    [
      "phrasing",
      "No interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  code: [["phrasing"]],
  columnheader: [
    ["flow", "No main, header, or footer element descendants allowed."],
  ],
  combobox: [["flow", "No main element descendants allowed."]],
  complementary: [["flow", "No main element descendants allowed."]],
  contentinfo: [
    ["flow", "No main, header, or footer element descendants allowed."],
  ],
  definition: [["phrasing"]],
  deletion: [["phrasing"]],
  dialog: [["flow"]],
  directory: [["flow", "No main element descendants allowed."]],
  document: [["flow"]],
  emphasis: [["phrasing"]],
  feed: [["flow", "No main element descendants allowed."]],
  figure: [["flow", "No main element descendants allowed."]],
  form: [["flow", "No form element descendants allowed."]],
  generic: [["flow"]],
  grid: [["specific", "Only row and rowgroup roles allowed."]],
  gridcell: [["flow", "No main element descendants allowed."]],
  group: [["flow"]],
  heading: [["phrasing"]],
  img: [["phrasing", "No interactive content descendants allowed."]],
  insertion: [["phrasing"]],
  link: [
    [
      "flow",
      "No interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  list: [["specific", "Only listitem roles allowed."]],
  listbox: [["specific", "Only option and group roles allowed."]],
  listitem: [["flow", "No main element descendants allowed."]],
  log: [["flow", "No main element descendants allowed."]],
  main: [["flow", "No main element descendants allowed."]],
  marquee: [["flow", "No main element descendants allowed."]],
  math: [["flow"]],
  menu: [
    [
      "specific",
      "Only menuitem, menuitemcheckbox, and menuitemradio roles allowed.",
    ],
  ],
  menubar: [
    [
      "specific",
      "Only menuitem, menuitemcheckbox, and menuitemradio roles allowed.",
    ],
  ],
  menuitem: [
    [
      "phrasing",
      "No interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  menuitemcheckbox: [
    [
      "phrasing",
      "No interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  menuitemradio: [
    [
      "phrasing",
      "No interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  meter: [["phrasing", "No meter element descendants allowed."]],
  navigation: [["flow", "No main element descendants allowed."]],
  none: [["flow"]],
  note: [["flow", "No main element descendants allowed."]],
  option: [
    [
      "phrasing",
      "No interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  paragraph: [["phrasing"]],
  presentation: [["flow"]],
  progressbar: [["phrasing", "No progress element descendants allowed."]],
  radio: [
    [
      "phrasing",
      "No interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  radiogroup: [["flow"]],
  region: [["flow", "No main element descendants allowed."]],
  row: [["specific", "Only cell, rowheader, and columnheader roles allowed."]],
  rowgroup: [["specific", "Only row roles allowed."]],
  rowheader: [["flow", "No main element descendants allowed."]],
  scrollbar: [["phrasing"]],
  search: [["flow", "No main element descendants allowed."]],
  searchbox: [["flow", "No main element descendants allowed."]],
  separator: [["phrasing"]],
  slider: [["phrasing"]],
  spinbutton: [["flow", "No main element descendants allowed."]],
  status: [["flow", "No main element descendants allowed."]],
  strong: [["phrasing"]],
  subscript: [["phrasing"]],
  superscript: [["phrasing"]],
  switch: [
    [
      "phrasing",
      "No interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  tab: [
    [
      "phrasing",
      "No interactive content descendants, and no descendants with a tabindex attribute specified.",
    ],
  ],
  table: [["specific", "Only row and rowgroup roles allowed."]],
  tablist: [["specific", "Only tab roles allowed."]],
  tabpanel: [["flow"]],
  term: [["phrasing"]],
  textbox: [["flow", "No main element descendants allowed."]],
  time: [["phrasing"]],
  timer: [["flow", "No main element descendants allowed."]],
  toolbar: [["flow", "No main element descendants allowed."]],
  tooltip: [["phrasing"]],
  tree: [["specific", "Only treeitem and group roles allowed."]],
  treegrid: [["specific", "Only row and rowgroup roles allowed."]],
  treeitem: [["phrasing"]],
};
