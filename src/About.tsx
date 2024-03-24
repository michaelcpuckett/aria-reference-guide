import { ExternalLinkIcon } from "./Icons";

export function About() {
  return (
    <div className="dialog" id="about">
      <div className="dialog__content">
        <h1 className="visually-hidden" tabIndex={-1}>
          About
        </h1>
        <div className="aria-role__details">
          <p>
            <abbr>ARIA</abbr> (Accessible Rich Internet Applications) is a set
            of HTML attributes that make web content more accessible to users of
            assistive technologies, such as screen readers and refreshable
            braille displays.
          </p>
          <p>
            This representation of ARIA roles is intended to be a reference for
            web developers and designers. The ARIA roles are grouped by abstract
            ARIA role. Each role is a link that will take you to a page with
            more information about the role.
          </p>
          <p>
            This reference guide is based on the{" "}
            <a href="https://www.w3.org/TR/wai-aria-1.2/" target="_blank">
              WAI-ARIA 1.2 Recommendation
              <span className="visually-hidden">(opens in new window)</span>
              <ExternalLinkIcon />
            </a>
          </p>
          <p>
            This is not a substitute for the official documentation, but because
            it is paginated, it may be easier to navigate.
          </p>
          <p>
            The source code is availble on{" "}
            <a
              href="https://www.github.com/michaelcpuckett/aria-reference-guide"
              target="_blank"
            >
              GitHub
              <span className="visually-hidden">(opens in new window)</span>
              <ExternalLinkIcon />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
