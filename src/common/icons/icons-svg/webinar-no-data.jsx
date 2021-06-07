import { h } from "preact";

const SVG = ({
  style = {},
  width = "90",
  className = "",
  viewBox = "0 0 90 90",
}) => (
    <svg className={`svg-icon ${className || ""}`} width={width} style={style} height={width} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="90" height="90" fill="#EBEEF5"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M25.7992 26.6V52.2H64.1992V26.6H25.7992ZM24.9992 25C24.5574 25 24.1992 25.3582 24.1992 25.8V53C24.1992 53.4418 24.5574 53.8 24.9992 53.8H64.9992C65.441 53.8 65.7992 53.4418 65.7992 53V25.8C65.7992 25.3582 65.441 25 64.9992 25H24.9992Z" fill="#1E1EF7"/>
      <path d="M23.9789 52.6424C24.1144 52.3714 24.3914 52.2002 24.6944 52.2002H65.3056C65.6086 52.2002 65.8856 52.3714 66.0211 52.6424L68.9155 58.4313C68.9711 58.5424 69 58.6649 69 58.789V64.2002C69 64.642 68.6418 65.0002 68.2 65.0002H21.8C21.3582 65.0002 21 64.642 21 64.2002V58.789C21 58.6649 21.0289 58.5424 21.0845 58.4313L23.9789 52.6424Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M25.1889 53.8002L22.6 58.9779V63.4002H67.4V58.9779L64.8111 53.8002H25.1889ZM24.6944 52.2002C24.3914 52.2002 24.1144 52.3714 23.9789 52.6424L21.0845 58.4313C21.0289 58.5424 21 58.6649 21 58.789V64.2002C21 64.642 21.3582 65.0002 21.8 65.0002H68.2C68.6418 65.0002 69 64.642 69 64.2002V58.789C69 58.6649 68.9711 58.5424 68.9155 58.4313L66.0211 52.6424C65.8856 52.3714 65.6086 52.2002 65.3056 52.2002H24.6944Z" fill="#1E1EF7"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M38.6016 58.5996L39.0838 61.9148C39.141 62.308 39.4781 62.5996 39.8754 62.5996H50.1277C50.525 62.5996 50.8622 62.308 50.9194 61.9148L51.4016 58.5996H38.6016ZM40.4511 60.1996L40.5675 60.9996H49.4356L49.552 60.1996H40.4511Z" fill="#1E1EF7"/>
      <path d="M25.8008 59.3996C25.8008 58.9578 26.159 58.5996 26.6008 58.5996H63.4008C63.8426 58.5996 64.2008 58.9578 64.2008 59.3996C64.2008 59.8414 63.8426 60.1996 63.4008 60.1996H26.6008C26.159 60.1996 25.8008 59.8414 25.8008 59.3996Z" fill="#1E1EF7"/>
      <path d="M40.7684 35.2399L38.6084 32.1999H37.6484V37.7999H38.9284V34.7599L41.0884 37.7999H42.0484V32.1999H40.7684V35.2399Z" fill="#1E1EF7"/>
      <path d="M47.7438 37.0719C48.3118 36.5119 48.5918 35.8239 48.5918 34.9999C48.5918 34.1759 48.3118 33.4879 47.7438 32.9279C47.1758 32.3679 46.4878 32.0879 45.6798 32.0879C44.8718 32.0879 44.1838 32.3679 43.6158 32.9279C43.0478 33.4879 42.7678 34.1759 42.7678 34.9999C42.7678 35.8239 43.0478 36.5119 43.6158 37.0719C44.1838 37.6319 44.8718 37.9119 45.6798 37.9119C46.4878 37.9119 47.1758 37.6319 47.7438 37.0719ZM44.5118 36.1999C44.1998 35.8879 44.0478 35.4879 44.0478 34.9999C44.0478 34.5119 44.1998 34.1119 44.5118 33.7999C44.8238 33.4879 45.2158 33.3359 45.6798 33.3359C46.1438 33.3359 46.5278 33.4879 46.8398 33.7999C47.1518 34.1119 47.3118 34.5119 47.3118 34.9999C47.3118 35.4879 47.1518 35.8879 46.8398 36.1999C46.5278 36.5119 46.1438 36.6639 45.6798 36.6639C45.2158 36.6639 44.8238 36.5119 44.5118 36.1999Z" fill="#1E1EF7"/>
      <path d="M48.5922 32.1999V33.4319H50.0322V37.7999H51.3122V33.4319H52.7522V32.1999H48.5922Z" fill="#1E1EF7"/>
      <path d="M35.5484 40.1999H32.1484V45.7999H33.4284V43.7439H35.5084V42.5119H33.4284V41.4319H35.5484V40.1999Z" fill="#1E1EF7"/>
      <path d="M41.0407 45.0719C41.6087 44.5119 41.8887 43.8239 41.8887 42.9999C41.8887 42.1759 41.6087 41.4879 41.0407 40.9279C40.4727 40.3679 39.7847 40.0879 38.9767 40.0879C38.1687 40.0879 37.4807 40.3679 36.9127 40.9279C36.3447 41.4879 36.0647 42.1759 36.0647 42.9999C36.0647 43.8239 36.3447 44.5119 36.9127 45.0719C37.4807 45.6319 38.1687 45.9119 38.9767 45.9119C39.7847 45.9119 40.4727 45.6319 41.0407 45.0719ZM37.8087 44.1999C37.4967 43.8879 37.3447 43.4879 37.3447 42.9999C37.3447 42.5119 37.4967 42.1119 37.8087 41.7999C38.1207 41.4879 38.5127 41.3359 38.9767 41.3359C39.4407 41.3359 39.8247 41.4879 40.1367 41.7999C40.4487 42.1119 40.6087 42.5119 40.6087 42.9999C40.6087 43.4879 40.4487 43.8879 40.1367 44.1999C39.8247 44.5119 39.4407 44.6639 38.9767 44.6639C38.5127 44.6639 38.1207 44.5119 37.8087 44.1999Z" fill="#1E1EF7"/>
      <path d="M42.5303 43.9919C42.5303 44.5759 42.7303 45.0479 43.1383 45.3919C43.5463 45.7359 44.0583 45.9119 44.6903 45.9119C45.3223 45.9119 45.8343 45.7359 46.2423 45.3919C46.6503 45.0479 46.8503 44.5759 46.8503 43.9919V40.1999H45.5703V43.8799C45.5703 44.3999 45.2743 44.6639 44.6903 44.6639C44.1063 44.6639 43.8103 44.3999 43.8103 43.8799V40.1999H42.5303V43.9919Z" fill="#1E1EF7"/>
      <path d="M50.8934 43.2399L48.7334 40.1999H47.7734V45.7999H49.0534V42.7599L51.2134 45.7999H52.1734V40.1999H50.8934V43.2399Z" fill="#1E1EF7"/>
      <path d="M53.1328 40.1999V45.7999H55.3728C56.1488 45.7999 56.7888 45.5359 57.3088 44.9999C57.8288 44.4639 58.0928 43.7919 58.0928 42.9999C58.0928 42.2079 57.8288 41.5439 57.3088 41.0079C56.7888 40.4719 56.1488 40.1999 55.3728 40.1999H53.1328ZM54.4128 44.5679V41.4319H55.3728C55.8128 41.4319 56.1728 41.5759 56.4448 41.8639C56.7248 42.1439 56.8608 42.5279 56.8608 42.9999C56.8608 43.4719 56.7248 43.8559 56.4448 44.1439C56.1728 44.4239 55.8128 44.5679 55.3728 44.5679H54.4128Z" fill="#1E1EF7"/>
    </svg>
);

export default SVG;