import { IconDefinitions } from "../components/Icons";
import { MenuVisibilitySwitch } from "../components/MenuVisibilitySwitch";
import { Navigation } from "../components/Navigation";
import { Overview } from "../components/Overview";

export function IndexPage() {
  const pageTitle = "ARIA Reference Guide";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="This representation of ARIA roles contains links to each role that will take you to a page with more information about the role."
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className="h-full overflow-hidden">
        <IconDefinitions />
        <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] print:contents max-[720px]:[&:has(#menu-visibility-switch:not(:checked))_#nav]:hidden max-[720px]:[&:has(#menu-visibility-switch:checked)_main]:hidden">
          <header
            role="banner"
            className="grid bg-[VisitedText] p-4 pt-[calc(1rem+env(safe-area-inset-top))] pl-[calc(1rem+env(safe-area-inset-left))] pr-[calc(1rem+env(safe-area-inset-right))] touch-none max-[720px]:grid-cols-[minmax(0,1fr)_auto] max-[720px]:items-center max-[720px]:gap-4 print:hidden"
          >
            <a
              href="/"
              className="m-0 self-center font-bold uppercase leading-tight tracking-[0.15rem] text-[canvas] min-[721px]:text-center focus-visible:outline-4 focus-visible:outline-dashed"
            >
              {pageTitle}
            </a>
            <MenuVisibilitySwitch />
          </header>
          <div className="grid min-h-0 min-[721px]:grid-cols-[280px_minmax(0,1fr)]">
            <div
              className="min-h-0 overflow-y-auto bg-white p-4 pl-[calc(1rem+env(safe-area-inset-left))] dark:bg-black print:hidden"
              id="nav"
            >
              <Navigation />
            </div>
            <main className="min-h-0 overflow-y-auto p-4 pr-[calc(1rem+env(safe-area-inset-right))] text-lg min-[721px]:min-w-0 min-[721px]:p-12 min-[721px]:pr-[calc(3rem+env(safe-area-inset-right))] print:[&_a]:font-bold print:[&_a]:no-underline print:[&_a]:text-inherit">
              <Overview />
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
