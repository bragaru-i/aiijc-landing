import {h} from 'preact';

const Logo = ({className}) => {
    return (
        <svg className={className} width="163" height="48" viewBox="0 0 163 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0)">
                <path d="M21.4805 48L42.9577 40.96V23.04H21.4805V48Z" fill="#365FF6" />
                <path d="M42.9577 0L32.2191 4.24727L21.4805 0V23.04H42.9577V0Z" fill="#2848BA" />
                <path d="M21.4772 48L0 40.96V23.04H21.4772V48Z" fill="#2848BA" />
                <path d="M21.4772 0L10.7386 4.24727L0 0V23.04H21.4772V0Z" fill="#365FF6" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.7576 34.9675L21.4793 29.9639L16.2617 34.9675H21.4793H26.7576Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4375 12.335V20.5386C12.4375 25.2513 16.5024 29.1495 21.538 29.1495C26.5736 29.1495 30.6385 25.3095 30.6385 20.5386V12.335H12.4375Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M31.4922 23.0402H34.0403L36.6491 15.4766H34.101L31.4922 23.0402Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4674 23.0402H8.9799L6.37109 15.4766H8.85856L11.4674 23.0402Z" fill="white" />
                <path d="M66.9175 31.5337V29.8464C65.7647 31.1264 63.7626 31.8828 61.8819 31.8828C57.3923 31.8828 53.6914 28.3337 53.6914 24.0864C53.6914 19.8391 57.3923 16.29 61.8819 16.29C63.7626 16.29 65.7647 17.1046 66.9175 18.3264V16.6391H70.0723V31.5337H66.9175ZM57.0889 24.0864C57.0889 26.7628 59.1517 28.7991 61.9425 28.7991C64.794 28.7991 66.9781 26.8791 66.9781 24.0864C66.9781 21.2937 64.794 19.3737 61.9425 19.3737C59.1517 19.3737 57.0889 21.41 57.0889 24.0864Z" fill="black" />
                <path d="M77.229 10.5303V31.5339H74.0742V10.5303H77.229Z" fill="black" />
                <path d="M84.3306 10.5303V31.5339H81.1758V10.5303H84.3306Z" fill="black" />
                <path d="M103.198 31.8828C98.7694 31.8828 95.0078 28.2755 95.0078 24.0864C95.0078 19.7809 98.7087 16.29 103.198 16.29C106.232 16.29 108.659 17.7446 110.054 19.8391L107.627 21.5846C106.535 20.2464 105.018 19.4319 103.198 19.4319C100.589 19.4319 98.3447 21.5846 98.3447 24.1446C98.3447 26.6464 100.529 28.8573 103.259 28.8573C105.14 28.8573 106.717 27.9846 107.809 26.4719L110.357 27.9846C108.901 30.37 106.232 31.8828 103.198 31.8828Z" fill="black" />
                <path d="M127.101 16.6396V31.5342H123.947V29.9633C122.794 31.1851 120.974 31.9415 119.518 31.9415C114.967 31.9415 112.723 29.3233 112.723 25.4833V16.6396H115.938V25.1924C115.938 27.3451 117.516 28.8578 119.7 28.8578C122.187 28.8578 123.947 26.8797 123.947 24.9015V16.6396H127.101Z" fill="black" />
                <path d="M131.047 16.6397H134.202V18.2688C135.354 17.047 137.357 16.2324 139.237 16.2324C143.788 16.2324 147.488 19.8397 147.488 24.0288C147.488 28.3342 143.788 31.8252 139.237 31.8252C137.357 31.8252 135.354 31.0106 134.202 29.7888V36.7124H131.047V16.6397ZM134.202 24.087C134.202 26.8797 136.386 28.7997 139.237 28.7997C142.089 28.7997 144.091 26.7052 144.091 24.087C144.091 21.4688 142.089 19.3742 139.237 19.3742C136.386 19.3742 134.202 21.2942 134.202 24.087Z" fill="black" />
                <path d="M160.408 23.97C161.985 25.0755 162.349 26.4137 162.288 27.6937C162.167 28.9737 161.439 30.1955 160.226 30.8937C159.073 31.5919 157.374 31.9409 155.675 31.9409C153.006 31.9409 150.336 30.5446 149.184 29.3809L151.246 26.9955C152.884 28.45 154.765 28.8573 156.221 28.8573C157.556 28.8573 158.83 28.3919 159.012 27.5773C159.194 26.7628 158.587 26.1809 156.525 25.7155C154.705 25.25 152.338 24.4937 151.489 23.9119C150.336 23.0973 149.73 22.1082 149.73 20.77C149.669 19.6064 150.336 18.4428 151.246 17.6282C152.338 16.6973 154.159 16.29 155.797 16.29C158.163 16.3482 160.165 17.1628 161.5 18.1519L159.558 20.4791C158.102 19.4319 156.767 19.2573 155.615 19.2573C153.795 19.1991 153.006 19.8391 152.945 20.4791C152.884 21.1773 153.673 21.6428 156.343 22.3991C158.041 22.8064 159.68 23.3882 160.408 23.97Z" fill="black" />
            </g>
            <defs>
                <clipPath id="clip0">
                    <rect width="162.353" height="48" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default Logo;
