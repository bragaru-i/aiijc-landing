import {useState, useRef, useEffect} from 'preact/hooks'
import {api, showError, dataURItoBlob} from "../../../../common";
import {useTranslation} from "react-i18next";


const MAX_SIZE_MB = 5;

const checkSize = (file) => {
    return file.size / 1024 / 1024 <= MAX_SIZE_MB;
};

const useAvatar = (avatarUrl) => {
    const {t} = useTranslation();
    const [image, setImage] = useState(null);
    const [imgToUploader, setImgToUploader] = useState(null);
    // Modal watchers
    const [isCropModal, setCropModal] = useState(false);
    const [isModifyModal, setModifyModal] = useState(false);
    const [isNavModal, setNavModal] = useState(false);
    const [isNavDesktop, setNavDesktop] = useState(false);

    const [dimension, setDimension] = useState(null);
    const ref = useRef();


    const imageUrl = image ? URL.createObjectURL(image) : '';

    const closeBoxes = () => {
        setCropModal(false);
        setModifyModal(false);
        setDimension(null);
        setNavModal(false);
    };

    const checkDimension = (url) => {
        const img = new Image();
        img.onload = function () {
            setDimension(img.width > img.height ? 'horizontal' : 'vertical');
        };
        img.src = url;
    };

    const inputChange = async (event) => {
        const uploadedImage = event.target.files && event.target.files[0];
        if (!uploadedImage) return;
        if (!checkSize(uploadedImage)) {
            console.log('TOO BIG FILE')
            return;
        }
        checkDimension(URL.createObjectURL(uploadedImage));
        closeBoxes();
        setCropModal(true);
        setImage(uploadedImage);
    };

    const openModifyModal = () => {
        if (!avatarUrl) return;
        closeBoxes()
        setNavModal(() => false)
        setModifyModal(true);

    };

    // actions triggered on delete image
    const deleteImage = async () => {
        closeBoxes();
        let res = null;
        try {
            const response = await fetch('/api_v2/profile/', {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json;charset=UTF-8'},
                body: JSON.stringify({image: null, cropping: null})
            });
            res = await response.json();
        } catch (error) {
            const status = error.response?.status;
            const data = error.response?.data;
            let errorMsg = t('Profile.ProfileAvatarUploadConnectionError');
            if (status === 429) {
                errorMsg = t('Profile.ProfileAvatarUploadLimitError');
            } else if (data && data['image']) {
                errorMsg = data['image'];
            }
            showError(errorMsg);
        }

        return res;
    };

    const deleteHandle = () => {
        console.log("DELETE message")
        return deleteImage();
    };

    const saveImageHandler = async (cropedImage, rotateImage) => {
        closeBoxes();
        const data = {
                rotateImage: rotateImage,
                cropping: dataURItoBlob(cropedImage),
            };
        if (image) data.image = image;
        let res = null;

        try {
            res = await api.patchFormData(`/api_v2/profile/`, data);

        } catch (error) {
            const status = error.response?.status;
            const data = error.response?.data;
            let errorMsg = t('Profile.ProfileAvatarUploadConnectionError');
            if (status === 429) {
                errorMsg = t('Profile.ProfileAvatarUploadLimitError');
            } else if (data && data['image']) {
                errorMsg = data['image'];
            }
            showError(errorMsg);
        }

        if (rotateImage % 180 !== 0) {
            setDimension(dimension === 'horizontal' ? 'vertical' : 'horizontal');
        }

        return res;
    }

    // Hook for closing menu on click outside
    useEffect(
        () => {
            const listener = event => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                setNavDesktop(false);
            };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },
        [ref]
    );

    return (
        {
            isCropModal,
            isNavModal,
            isModifyModal,
            imageUrl,
            dimension,
            isNavDesktop,
            closeBoxes,
            setNavModal,
            openModifyModal,
            inputChange,
            deleteHandle,
            saveImageHandler,
            setNavDesktop,
            ref

        }
    )
}

export default useAvatar