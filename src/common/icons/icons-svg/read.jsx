import { h } from "preact";

const SVG = ({
  style = {},
  width = "100%",
  className = "",
  viewBox = "0 0 48 46",
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    className={`svg-icon ${className || ""}`}
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect x="9" y="1" width="30" height="42" rx="2" fill="#3DE0D6"/>
    <path d="M44.625 19.25H39V41.75H9V19.25H3.375C2.33981 19.2497 1.50028 20.0887 1.5 21.1239V21.125V26.75L4.5 27.5V36.5L1.5 37.25V42.875C1.49972 43.9102 2.33869 44.7497 3.37387 44.75H3.375H44.625C45.6602 44.7503 46.4997 43.9113 46.5 42.8761C46.5 42.8757 46.5 42.8754 46.5 42.875V21.125C46.5003 20.0898 45.6613 19.2503 44.6261 19.25C44.6257 19.25 44.6254 19.25 44.625 19.25Z" fill="#8FEDE7"/>
    <path d="M36.75 19.25V10.25H34.5V24.5C31.0715 23.4997 27.4285 23.4997 24 24.5C20.5715 23.4997 16.9285 23.4997 13.5 24.5V10.25H11.25V26.75H36.75V19.25Z" fill="#8FEDE7"/>
    <path d="M15.75 29.75H31.5V32.75H15.75V29.75Z" fill="#8FEDE7"/>
    <path d="M44.625 18.5H39.75V1.25C39.75 0.835812 39.4142 0.5 39 0.5H9C8.58581 0.5 8.25 0.835812 8.25 1.25V18.5H3.375C1.92591 18.5016 0.751594 19.6759 0.75 21.125V42.875C0.751594 44.3241 1.92591 45.4984 3.375 45.5H44.625C46.0741 45.4984 47.2484 44.3241 47.25 42.875V21.125C47.2484 19.6759 46.0741 18.5016 44.625 18.5ZM9.75 2H38.25V41H9.75V2ZM2.25 27.7109L3.75 28.0859V35.9141L2.25 36.2891V27.7109ZM45.75 42.875C45.7494 43.4961 45.2461 43.9994 44.625 44H3.375C2.75391 43.9994 2.25056 43.4961 2.25 42.875V37.8359L4.68187 37.2275C5.01572 37.1441 5.24991 36.8442 5.25 36.5V27.5C5.24991 27.1558 5.01572 26.8559 4.68187 26.7725L2.25 26.1641V21.125C2.25056 20.5039 2.75391 20.0006 3.375 20H8.25V41H6.75C6.33581 41 6 41.3358 6 41.75C6 42.1642 6.33581 42.5 6.75 42.5H41.25C41.6642 42.5 42 42.1642 42 41.75C42 41.3358 41.6642 41 41.25 41H39.75V20H44.625C45.2461 20.0006 45.7494 20.5039 45.75 21.125V42.875Z" fill="black"/>
    <path d="M44.25 27.5C43.8358 27.5 43.5 27.8358 43.5 28.25V35.75C43.5 36.1642 43.8358 36.5 44.25 36.5C44.6642 36.5 45 36.1642 45 35.75V28.25C45 27.8358 44.6642 27.5 44.25 27.5Z" fill="black"/>
    <path d="M36.75 9.50088H35.25C35.2499 9.16619 35.0281 8.872 34.7063 8.77994C31.2124 7.76538 27.5047 7.74522 24 8.72182C20.4952 7.74522 16.7876 7.76538 13.2938 8.77994C12.9719 8.872 12.7501 9.16619 12.75 9.50088H11.25C10.8358 9.50088 10.5 9.83669 10.5 10.2509V26.7509C10.5 27.1651 10.8358 27.5009 11.25 27.5009H36.75C37.1642 27.5009 37.5 27.1651 37.5 26.7509V10.2509C37.5 9.83669 37.1642 9.50088 36.75 9.50088ZM24.75 10.0756C27.7017 9.31497 30.7981 9.3146 33.75 10.0746V23.5306C30.791 22.829 27.7087 22.8296 24.75 23.5324V10.0756ZM14.25 10.0746C17.2019 9.3146 20.2983 9.31497 23.25 10.0756V23.5315C20.2913 22.8281 17.2088 22.8277 14.25 23.5306V10.0746ZM36 26.0009H12V11.0009H12.75V24.5009C12.7495 24.9147 13.0846 25.2505 13.4984 25.251C13.5687 25.2511 13.6387 25.2412 13.7062 25.2218C17.0007 24.2656 20.4993 24.2656 23.7938 25.2218C23.9286 25.2602 24.0714 25.2602 24.2063 25.2218C27.5007 24.2656 30.9993 24.2656 34.2937 25.2218C34.3608 25.2412 34.4303 25.2511 34.5 25.2509C34.9137 25.2514 35.2494 24.9165 35.25 24.5027C35.25 24.5021 35.25 24.5015 35.25 24.5009V11.0009H36V26.0009Z" fill="black"/>
    <path d="M15.5132 29.0384L11.0132 30.5384C10.6202 30.6693 10.4078 31.094 10.5386 31.487C10.6133 31.7111 10.7891 31.8869 11.0132 31.9616L15.5132 33.4616C15.5457 33.4707 15.582 33.4793 15.6218 33.4861C15.6685 33.4941 15.7118 33.4982 15.7504 33.5H35.2504C36.493 33.5 37.5004 32.4927 37.5004 31.25C37.5004 30.0073 36.493 29 35.2504 29H15.7504C15.7125 29.0018 15.6702 29.0057 15.6244 29.0135C15.5836 29.0203 15.5464 29.0291 15.5132 29.0384ZM15.0004 31.7094L13.6223 31.25L15.0004 30.7906V31.7094ZM30.7504 32H16.5004V30.5H30.7504V32ZM33.0004 32H32.2504V30.5H33.0004V32ZM35.2504 32H34.5004V30.5H35.2504C35.6646 30.5 36.0004 30.8358 36.0004 31.25C36.0004 31.6642 35.6646 32 35.2504 32Z" fill="black"/>
  </svg>
);

export default SVG;
