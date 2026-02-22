export type HtmlContentCategory = "flow" | "phrasing" | "interactive";

export const htmlElementsToContentCategories: Record<
  string,
  HtmlContentCategory[]
> = {
  // From the HTML Standard "Element content categories" index.
  // We only include categories needed for wildcard role filtering.
  abbr: ["flow", "phrasing"],
  address: ["flow"],
  b: ["flow", "phrasing"],
  blockquote: ["flow"],
  canvas: ["flow", "phrasing"],
  cite: ["flow", "phrasing"],
  code: ["flow", "phrasing"],
  "custom-element": ["flow", "phrasing"],
  data: ["flow", "phrasing"],
  del: ["flow", "phrasing"],
  dfn: ["flow", "phrasing"],
  div: ["flow"],
  em: ["flow", "phrasing"],
  figure: ["flow"],
  i: ["flow", "phrasing"],
  ins: ["flow", "phrasing"],
  kbd: ["flow", "phrasing"],
  mark: ["flow", "phrasing"],
  output: ["flow", "phrasing"],
  p: ["flow"],
  pre: ["flow"],
  q: ["flow", "phrasing"],
  samp: ["flow", "phrasing"],
  small: ["flow", "phrasing"],
  span: ["flow", "phrasing"],
  table: ["flow"],
  time: ["flow", "phrasing"],
  u: ["flow", "phrasing"],
  var: ["flow", "phrasing"],

  // Table section elements are explicitly "None" for content categories.
  tbody: [],
  tfoot: [],
  thead: [],
};
