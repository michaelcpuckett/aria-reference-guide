import { ExternalLinkIcon } from "./Icons";

export function Overview() {
  return (
    <div className="content">
      <div className="content__header__info">
        <div className="content__heading__container">
          <h1 className="content__heading" id="overview" tabIndex={-1}>
            Overview of ARIA Roles
          </h1>
        </div>
      </div>
      <div className="content__details">
        <p>
          <abbr>ARIA</abbr> (Accessible Rich Internet Applications) is a set of
          HTML attributes that make web content more accessible to users of
          assistive technologies, such as screen readers and refreshable braille
          displays.
        </p>
        <p>
          This representation of ARIA roles is intended to be a reference for
          web developers and designers. The ARIA roles are grouped by abstract
          ARIA role. Each role is a link that will take you to a page with more
          information about the role.
        </p>
        <p>
          This reference guide is based on the{" "}
          <a href="https://www.w3.org/TR/wai-aria-1.2/" target="_blank">
            WAI-ARIA 1.2 Recommendation
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
            <ExternalLinkIcon />
          </a>
        </p>
      </div>
    </div>
  );
}
