import {h} from 'preact';


export const DownloadIcon = ({className}) => (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none"
         xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L10 13L14 9" stroke="#858DA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 3L10 13" stroke="#858DA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="4" y="16" width="12" height="2" rx="1" fill="#858DA6"/>
    </svg>
);


export const SpinnerIcon = ({className}) => (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none"
         xmlns="http://www.w3.org/2000/svg">
        <path d="M10 1.66675V5.00008" stroke="#858DA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 15V18.3333" stroke="#858DA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.1084 4.1084L6.46673 6.46673" stroke="#858DA6" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round"/>
        <path d="M13.5334 13.5334L15.8918 15.8918" stroke="#858DA6" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round"/>
        <path d="M1.66675 10H5.00008" stroke="#858DA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 10H18.3333" stroke="#858DA6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.1084 15.8918L6.46673 13.5334" stroke="#858DA6" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round"/>
        <path d="M13.5334 6.46673L15.8918 4.1084" stroke="#858DA6" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round"/>
    </svg>
);


export const NotebookIcon = ({className}) => (
    <svg className={className} width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="90" height="90" fill="#EBEEF5"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M25.7992 26.6V52.2H64.1992V26.6H25.7992ZM24.9992 25C24.5574 25 24.1992 25.3582 24.1992 25.8V53C24.1992 53.4418 24.5574 53.8 24.9992 53.8H64.9992C65.441 53.8 65.7992 53.4418 65.7992 53V25.8C65.7992 25.3582 65.441 25 64.9992 25H24.9992Z" fill="#1E1EF7"/>
        <path d="M23.9789 52.6414C24.1144 52.3704 24.3914 52.1992 24.6944 52.1992H65.3056C65.6086 52.1992 65.8856 52.3704 66.0211 52.6414L68.9155 58.4303C68.9711 58.5414 69 58.6639 69 58.7881V64.1992C69 64.641 68.6418 64.9992 68.2 64.9992H21.8C21.3582 64.9992 21 64.641 21 64.1992V58.7881C21 58.6639 21.0289 58.5414 21.0845 58.4303L23.9789 52.6414Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M25.1889 53.7992L22.6 58.9769V63.3992H67.4V58.9769L64.8111 53.7992H25.1889ZM24.6944 52.1992C24.3914 52.1992 24.1144 52.3704 23.9789 52.6414L21.0845 58.4303C21.0289 58.5414 21 58.6639 21 58.7881V64.1992C21 64.641 21.3582 64.9992 21.8 64.9992H68.2C68.6418 64.9992 69 64.641 69 64.1992V58.7881C69 58.6639 68.9711 58.5414 68.9155 58.4303L66.0211 52.6414C65.8856 52.3704 65.6086 52.1992 65.3056 52.1992H24.6944Z" fill="#1E1EF7"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M38.6016 58.5996L39.0838 61.9148C39.141 62.308 39.4781 62.5996 39.8754 62.5996H50.1277C50.525 62.5996 50.8622 62.308 50.9194 61.9148L51.4016 58.5996H38.6016ZM40.4511 60.1996L40.5675 60.9996H49.4356L49.552 60.1996H40.4511Z" fill="#1E1EF7"/>
        <path d="M25.8008 59.3996C25.8008 58.9578 26.159 58.5996 26.6008 58.5996H63.4008C63.8426 58.5996 64.2008 58.9578 64.2008 59.3996C64.2008 59.8414 63.8426 60.1996 63.4008 60.1996H26.6008C26.159 60.1996 25.8008 59.8414 25.8008 59.3996Z" fill="#1E1EF7"/>
    </svg>
);


export const Spinner2Icon = ({className}) => (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none"
         xmlns="http://www.w3.org/2000/svg">
        <path d="M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1" stroke="#1A55F6"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
);


export const WarningIcon = ({className}) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="#F2994A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 8V12" stroke="#F2994A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 16H12.0092" stroke="#F2994A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
);


export const SuccessIcon = ({className}) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.0001 21.6001C17.3021 21.6001 21.6001 17.3021 21.6001 12.0001C21.6001 6.69821 17.3021 2.40015 12.0001 2.40015C6.69821 2.40015 2.40015 6.69821 2.40015 12.0001C2.40015 17.3021 6.69821 21.6001 12.0001 21.6001Z"
            stroke="#06B418" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.0366 9.74561L10.9455 14.8368L8.39987 12.2912" stroke="#06B418" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
);


export const CloseIcon = ({className}) => (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none"
         xmlns="http://www.w3.org/2000/svg">
        <path
            d="M11.1749 9.99999L14.7583 6.42499C14.9152 6.26807 15.0034 6.05524 15.0034 5.83333C15.0034 5.61141 14.9152 5.39858 14.7583 5.24166C14.6014 5.08474 14.3885 4.99658 14.1666 4.99658C13.9447 4.99658 13.7319 5.08474 13.575 5.24166L9.99995 8.82499L6.42495 5.24166C6.26803 5.08474 6.0552 4.99658 5.83328 4.99658C5.61136 4.99658 5.39854 5.08474 5.24162 5.24166C5.0847 5.39858 4.99654 5.61141 4.99654 5.83333C4.99654 6.05524 5.0847 6.26807 5.24162 6.42499L8.82495 9.99999L5.24162 13.575C5.16351 13.6525 5.10151 13.7446 5.05921 13.8462C5.0169 13.9477 4.99512 14.0566 4.99512 14.1667C4.99512 14.2767 5.0169 14.3856 5.05921 14.4871C5.10151 14.5887 5.16351 14.6809 5.24162 14.7583C5.31908 14.8364 5.41125 14.8984 5.5128 14.9407C5.61435 14.983 5.72327 15.0048 5.83328 15.0048C5.94329 15.0048 6.05221 14.983 6.15376 14.9407C6.25531 14.8984 6.34748 14.8364 6.42495 14.7583L9.99995 11.175L13.575 14.7583C13.6524 14.8364 13.7446 14.8984 13.8461 14.9407C13.9477 14.983 14.0566 15.0048 14.1666 15.0048C14.2766 15.0048 14.3855 14.983 14.4871 14.9407C14.5886 14.8984 14.6808 14.8364 14.7583 14.7583C14.8364 14.6809 14.8984 14.5887 14.9407 14.4871C14.983 14.3856 15.0048 14.2767 15.0048 14.1667C15.0048 14.0566 14.983 13.9477 14.9407 13.8462C14.8984 13.7446 14.8364 13.6525 14.7583 13.575L11.1749 9.99999Z"
            fill="#858DA6"/>
    </svg>
);
