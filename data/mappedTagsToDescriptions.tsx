export const mappedTagsToDescriptions = {
  "Flow Content": (
    <>
      <p>Defines the structure of the body content.</p>
      <p>
        As opposed to Phrasing Content, Flow Content can contain other Flow
        Content.
      </p>
    </>
  ),
  "Phrasing Content": (
    <>
      <p>Defines the text of the body content.</p>
      <p>
        Phrasing Content can contain other Phrasing Content, but not Flow
        Content.
      </p>
    </>
  ),
  "Interactive Content": (
    <>
      <p>Can be manipulated by the user.</p>
    </>
  ),
  "Required Context": (
    <>
      <p>Needs to have certain roles as its parent or ancestor.</p>
    </>
  ),
};
