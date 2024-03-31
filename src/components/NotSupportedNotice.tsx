import React from "react";

export function NotSupportedNotice() {
  return (
    <>
      <style>{`
        @media screen {
          .not-supported .not-supported-notice {
            background: yellow;
            color: black;
            padding: 0 1em 1em;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
            height: 100vh;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            max-width: none;
            max-height: none;
            margin: 0;
          }
        }
      `}</style>
      <dialog role="alert" className="not-supported-notice" hidden>
        <h1>Browser Not Supported</h1>
        <p>
          This site is designed with recently implemented web technologies.
          Please use a browser that supports these features:
        </p>
        <ul className="list">
          <li>
            <a
              href="https://caniuse.com/mdn-api_htmlelement_popover"
              target="_blank"
            >
              The <code>popover</code> HTML element
            </a>
          </li>
          <li>
            <a href="https://caniuse.com/css-has" target="_blank">
              The CSS <code>:has</code> selector
            </a>
          </li>
          <li>
            <a href="https://caniuse.com/css-nesting" target="_blank">
              CSS Nesting
            </a>
          </li>
          <li>
            <a href="https://caniuse.com/css-subgrid" target="_blank">
              CSS Subgrid (CSS Grid Level 2)
            </a>
          </li>
        </ul>
        <p>
          There are currently no fallback mechanisms. Consider opening an issue
          or contributing on{" "}
          <a
            href="https://www.github.com/michaelcpuckett/aria-reference-guide"
            target="_blank"
          >
            GitHub
          </a>
          .
        </p>
      </dialog>
    </>
  );
}
