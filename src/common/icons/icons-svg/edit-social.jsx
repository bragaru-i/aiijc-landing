import { h } from "preact";

const SVG = ({
  style = {},
  width = "100%",
  className = "",
  viewBox = "0 0 20 21",
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
  ><g clip-path="url(#clip0)">
  <path d="M8.33337 10.886C8.69125 11.3644 9.14784 11.7603 9.67217 12.0467C10.1965 12.3332 10.7763 12.5036 11.3722 12.5462C11.9682 12.5889 12.5664 12.5029 13.1262 12.2941C13.686 12.0853 14.1943 11.7585 14.6167 11.336L17.1167 8.83596C17.8757 8.05011 18.2957 6.99761 18.2862 5.90512C18.2767 4.81263 17.8385 3.76758 17.066 2.99505C16.2934 2.22251 15.2484 1.78431 14.1559 1.77482C13.0634 1.76532 12.0109 2.1853 11.225 2.94429L9.79171 4.36929" stroke="#858DA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.6666 9.21951C11.3087 8.74107 10.8521 8.34519 10.3278 8.05872C9.80347 7.77226 9.22367 7.60191 8.62771 7.55923C8.03176 7.51655 7.4336 7.60253 6.8738 7.81136C6.314 8.02018 5.80566 8.34695 5.38326 8.76951L2.88326 11.2695C2.12426 12.0554 1.70429 13.1079 1.71378 14.2003C1.72327 15.2928 2.16148 16.3379 2.93401 17.1104C3.70655 17.883 4.7516 18.3212 5.84408 18.3307C6.93657 18.3401 7.98908 17.9202 8.77492 17.1612L10.1999 15.7362" stroke="#858DA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
  <clipPath id="clip0">
  <rect width="20" height="20" fill="white" transform="translate(0 0.0527344)"/>
  </clipPath>
  </defs>
  </svg>
);

export default SVG;
