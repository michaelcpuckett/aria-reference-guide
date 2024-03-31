import React from "react";

export function IconDefinitions() {
  return (
    <div hidden>
      <svg>
        <symbol id="external-link-icon" viewBox="0 0 24 24">
          <path
            d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>

        <symbol id="close-icon" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
          />
        </symbol>

        <symbol id="menu-icon" viewBox="0 0 100 80" fill="none">
          <rect fill="currentColor" width="100" height="16"></rect>
          <rect fill="currentColor" y="32" width="100" height="16"></rect>
          <rect fill="currentColor" y="64" width="100" height="16"></rect>
        </symbol>

        <symbol id="info-icon" viewBox="0 0 48 48" fill="none">
          <path
            fill="currentColor"
            d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 24 14 A 2 2 0 0 0 24 18 A 2 2 0 0 0 24 14 z M 23.976562 20.978516 A 1.50015 1.50015 0 0 0 22.5 22.5 L 22.5 33.5 A 1.50015 1.50015 0 1 0 25.5 33.5 L 25.5 22.5 A 1.50015 1.50015 0 0 0 23.976562 20.978516 z"
          />
        </symbol>
      </svg>
    </div>
  );
}

export function ExternalLinkIcon() {
  return (
    <>
      <span className="visually-hidden">(opens in new window)</span>
      <svg fill="none" aria-hidden="true" width="1rem" height="1rem">
        <use href="#external-link-icon"></use>
      </svg>
    </>
  );
}

export function InfoIcon() {
  return (
    <svg fill="none" aria-hidden="true" width="1rem" height="1rem">
      <use href="#info-icon"></use>
    </svg>
  );
}
