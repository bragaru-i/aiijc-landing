import {h} from 'preact'
import {useCallback, useEffect, useState, useMemo, useRef} from 'preact/hooks'

import {imageRotate} from '../../../../common/utils';

const useEditBox = (src, dimension, screen) => {

    const pixelRatio = window.devicePixelRatio || 1;
    const [crop, setCrop] = useState({unit: '%', width: 100, aspect: 1 / 1,});
    const [completedCrop, setCompletedCrop] = useState(null);
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [cropedImage, setCropedImage] = useState('');
    const [rotatedImage, setRotatedImage] = useState('');
    const [degreeRotate, setDegreeImage] = useState(0);
    const [oldSize, setOldSize] = useState({width: 0, height: 0});

    const maxWidth = screen.screenType === "mobile" ? screen.width : 300;
    const maxHeight = screen.screenType === "mobile" ? screen.height : 375;

    const onLoad = useCallback(img => {
        imgRef.current = img;
        setCrop({unit: '%', width: 100, aspect: 1 / 1});
        return false;
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        if (
            crop &&
            crop.width !== undefined &&
            crop.height !== undefined &&
            crop.x !== undefined &&
            crop.y !== undefined &&
            ctx
        ) {
            canvas.width = crop.width * pixelRatio;
            canvas.height = crop.height * pixelRatio;
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            ctx.imageSmoothingQuality = 'high';

            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );
        }
        setCropedImage(canvas.toDataURL());
    }, [completedCrop]);


    const [localDimension, setLocalDimension] = useState(dimension);

    const [loading, setLoading] = useState(false);

    const rotate = async (event) => {
        event.preventDefault();
        const {side} = event.currentTarget.dataset;
        const degree = side === 'left' ? degreeRotate + 90 : degreeRotate - 90;

        setDegreeImage(degree);
        setRotatedImage('');
        setLoading(true);
        setLocalDimension(
            localDimension === 'horizontal' ? 'vertical' : 'horizontal'
        );

        imageRotate(src, degree, imageCallback);
    };

    const imageCallback = (newImg, widthOld, heightOld) => {
        setRotatedImage(newImg);
        setOldSize({
            width: widthOld,
            height: heightOld,
        });
        setTimeout(() => {
            setLoading(false);
        }, 100);
    };

    return {
        cropedImage,
        degreeRotate,
        loading,
        previewCanvasRef,
        completedCrop,
        onLoad,
        crop,
        setCrop,
        setCompletedCrop,
        imgRef, rotatedImage,
        maxHeight, maxWidth,
        localDimension,
        rotate
    }
}

export default useEditBox
