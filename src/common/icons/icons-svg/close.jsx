import {h} from "preact";

const SVG = ({
  style = {},
  width = "100%",
  className = "",
  viewBox = "0 0 12 12",
  fill="white",
  opacity="0.6"
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    fill={fill}
    opacity={opacity}
    className={`svg-icon ${className || ""}`}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d="M7.17495 6.00024L10.7583 2.42524C10.9152 2.26832 11.0034 2.05549 11.0034 1.83357C11.0034 1.61165 10.9152 1.39882 10.7583 1.2419C10.6014 1.08498 10.3885 0.996826 10.1666 0.996826C9.9447 0.996826 9.73187 1.08498 9.57495 1.2419L5.99995 4.82524L2.42495 1.2419C2.26803 1.08498 2.0552 0.996826 1.83328 0.996826C1.61136 0.996826 1.39854 1.08498 1.24162 1.2419C1.0847 1.39882 0.996539 1.61165 0.996539 1.83357C0.996539 2.05549 1.0847 2.26832 1.24162 2.42524L4.82495 6.00024L1.24162 9.57524C1.16351 9.65271 1.10151 9.74487 1.05921 9.84642C1.0169 9.94797 0.995117 10.0569 0.995117 10.1669C0.995117 10.2769 1.0169 10.3858 1.05921 10.4874C1.10151 10.5889 1.16351 10.6811 1.24162 10.7586C1.31908 10.8367 1.41125 10.8987 1.5128 10.941C1.61435 10.9833 1.72327 11.0051 1.83328 11.0051C1.94329 11.0051 2.05221 10.9833 2.15376 10.941C2.25531 10.8987 2.34748 10.8367 2.42495 10.7586L5.99995 7.17524L9.57495 10.7586C9.65242 10.8367 9.74459 10.8987 9.84614 10.941C9.94768 10.9833 10.0566 11.0051 10.1666 11.0051C10.2766 11.0051 10.3855 10.9833 10.4871 10.941C10.5886 10.8987 10.6808 10.8367 10.7583 10.7586C10.8364 10.6811 10.8984 10.5889 10.9407 10.4874C10.983 10.3858 11.0048 10.2769 11.0048 10.1669C11.0048 10.0569 10.983 9.94797 10.9407 9.84642C10.8984 9.74487 10.8364 9.65271 10.7583 9.57524L7.17495 6.00024Z" fill={fill} fill-opacity={opacity} />

  </svg>
);

export default SVG;


