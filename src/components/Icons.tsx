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
