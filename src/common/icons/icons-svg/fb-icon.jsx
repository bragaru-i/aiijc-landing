import { h } from "preact";

const SVG = ({
  style = {},
  width = "100%",
  className = "",
  viewBox = "0 0 24 24",
  fill = "#B8BDCC",
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
<path d="M24 12C24 5.37188 18.6281 0 12 0C5.37188 0 0 5.37188 0 12C0 17.9906 4.3875 22.9547 10.125 23.8547V15.4688H7.07812V12H10.125V9.35625C10.125 6.34922 11.9156 4.6875 14.6578 4.6875C15.9703 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8297C14.3391 7.875 13.875 8.80078 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8547C19.6125 22.9547 24 17.9906 24 12Z" fill={fill}/>

  </svg>
);

export default SVG;
