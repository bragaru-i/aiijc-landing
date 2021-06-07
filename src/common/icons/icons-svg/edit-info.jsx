import {h} from "preact";

const SVG = ({
  style = {},
  width = "100%",
  className = "",
  viewBox = "0 0 20 20",
  fill = "none"
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
    <path d="M9.99996 18.3334C14.6023 18.3334 18.3333 14.6025 18.3333 10.0001C18.3333 5.39771 14.6023 1.66675 9.99996 1.66675C5.39759 1.66675 1.66663 5.39771 1.66663 10.0001C1.66663 14.6025 5.39759 18.3334 9.99996 18.3334Z" stroke="#858DA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M10 13.3333V10" stroke="#858DA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M10 6.66675H10.0088" stroke="#858DA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

export default SVG;

