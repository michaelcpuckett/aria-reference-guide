import { Overview } from "./Overview";
import { IconDefinitions } from "./Icons";
import { MenuButton } from "./MenuButton";
import { Navigation } from "./Navigation";

export function IndexPage() {
  const pageTitle = "ARIA Reference Guide";

  return (
    <>
      <IconDefinitions />

      <div className="container">
        <header className="page-header">
          <a href="#" className="page-heading">
            {pageTitle}
          </a>
        </header>
        <MenuButton />
        <Navigation />
      </div>

      <main>
        {/*
            The header is repeated here for layout purposes.
          */}
        <div hidden aria-hidden="true" className="page-header">
          <span className="page-heading">{pageTitle}</span>
        </div>
        <Overview />
      </main>
    </>
  );
}
