import {h} from "preact";

const SVG = ({
  style = {},
  width = "100%",
  className = "",
  viewBox = "0 0 20 20",
  fill = "none",
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    fill={fill}
    className={`svg-icon ${className || ""}`}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d="M15.8333 9.16675H4.16667C3.24619 9.16675 2.5 9.91294 2.5 10.8334V16.6667C2.5 17.5872 3.24619 18.3334 4.16667 18.3334H15.8333C16.7538 18.3334 17.5 17.5872 17.5 16.6667V10.8334C17.5 9.91294 16.7538 9.16675 15.8333 9.16675Z" stroke="#858DA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M5.83331 9.16675V5.83341C5.83331 4.72835 6.2723 3.66854 7.0537 2.88714C7.8351 2.10573 8.89491 1.66675 9.99998 1.66675C11.105 1.66675 12.1649 2.10573 12.9463 2.88714C13.7277 3.66854 14.1666 4.72835 14.1666 5.83341V9.16675" stroke="#858DA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <rect x="5.83331" y="12.5" width="1.66667" height="2.5" rx="0.833333" fill="#858DA6" />
    <rect x="9.16669" y="12.5" width="1.66667" height="2.5" rx="0.833333" fill="#858DA6" />
    <rect x="12.5" y="12.5" width="1.66667" height="2.5" rx="0.833333" fill="#858DA6" />

  </svg>
);

export default SVG;
