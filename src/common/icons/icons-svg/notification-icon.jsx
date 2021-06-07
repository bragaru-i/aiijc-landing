import { h } from "preact";

const SVG = ({
  style = {},
  width = "20",
  className = "",
  viewBox = "0 0 20 20",
}) => (
    <svg className={`svg-icon ${className || ""}`} width={width} style={style} height={width} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM11.4632 4.73145L11.1 11.5841H8.93685L8.5579 4.73145H11.4632ZM11.4947 13.9683C11.4947 14.7578 10.8158 15.4367 10.0105 15.4367C9.20527 15.4367 8.54211 14.7578 8.54211 13.9683C8.54211 13.163 9.20527 12.4841 10.0105 12.4841C10.8158 12.4841 11.4947 13.163 11.4947 13.9683Z" fill="#F5790B"/>
    </svg>
);

export default SVG;

