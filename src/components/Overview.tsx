import { ExternalLinkIcon } from "./Icons";

export function Overview() {
  return (
    <div className="w-full min-[721px]:mx-auto min-[721px]:max-w-[860px] [&_a:focus-visible]:outline-offset-4">
      <div className="mb-4 flex">
        <div className="mb-2 grid flex-1 place-items-start gap-x-2 gap-y-2">
          <div className="flex flex-col gap-4">
            <h1
              className="m-0 text-4xl leading-tight tracking-[-0.1rem] max-[320px]:text-[1.75rem]"
              id="overview"
              tabIndex={-1}
            >
              ARIA Reference Guide
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p>
          <abbr title="Accessible Rich Internet Applications">ARIA</abbr> is a
          set of HTML attributes that make web content more accessible to users
          of assistive technologies, such as screen readers and refreshable
          braille displays.
        </p>
        <p>
          This reference guide is based on the{" "}
          <a href="https://www.w3.org/TR/wai-aria-1.2/" target="_blank">
            WAI-ARIA 1.2{" "}
            <span className="whitespace-nowrap">
              Recommendation
              <ExternalLinkIcon />
            </span>
          </a>
        </p>
        <p>
          This representation of ARIA roles is intended to be a reference for
          web developers and designers. This is not a substitute for the
          official documentation, but because it is paginated, it may be easier
          to navigate.
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
