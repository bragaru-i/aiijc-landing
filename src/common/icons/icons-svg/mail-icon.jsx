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
    <path d="M3.33323 3.33374H16.6666C17.5832 3.33374 18.3332 4.08374 18.3332 5.00041V15.0004C18.3332 15.9171 17.5832 16.6671 16.6666 16.6671H3.33323C2.41656 16.6671 1.66656 15.9171 1.66656 15.0004V5.00041C1.66656 4.08374 2.41656 3.33374 3.33323 3.33374Z" stroke="#858DA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M18.3332 5L9.9999 10.8333L1.66656 5" stroke="#858DA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M18.3334 5L10 10.8333L1.66669 5" stroke="#858DA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

  </svg>
);

export default SVG;