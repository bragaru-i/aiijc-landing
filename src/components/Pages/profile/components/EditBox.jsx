import {h} from 'preact'
import {connect} from 'redux-zero/preact'
import ReactCrop from 'react-image-crop';
import cn from 'classnames'
import {useTranslation} from 'react-i18next'

import {Spinner} from '../../../../common/Components/Spinner';
import Button from '../../../../common/Components/Button'

import useEditBox from './useEditBox';
import 'react-image-crop/dist/ReactCrop.css';
import './EditBox.scss';


const EditBox = ({className, onSave, src, dimension, screen}) => {
    const {t} = useTranslation()
    const {
        loading, rotatedImage, previewCanvasRef, completedCrop, crop, imgRef, onLoad,
        setCompletedCrop, setCrop,
        maxHeight, maxWidth, rotate, localDimension, cropedImage, degreeRotate,
    } = useEditBox(src, dimension, screen);

    return (
        <div className={cn('editBox', className)}>
            <div className="editBox__head">
                <div className="editBox__title">
                    {t('Profile.Avatar.edit')}
                </div>
            </div>
            <div
                className="editBox__body"
                style={{maxHeight: maxHeight, maxWidth: maxWidth, overflow: 'hidden'}}
            >
                {loading && <Spinner/>}
                {!loading && rotatedImage && (
                    <ReactCrop
                        src={rotatedImage}
                        onImageLoaded={onLoad}
                        crop={crop}
                        maxWidth={localDimension === 'horizontal' ? maxWidth : undefined}
                        maxHeight={localDimension === 'vertical' ? undefined : maxHeight}
                        imageStyle={{
                            maxHeight: maxHeight,
                            maxWidth: maxWidth,
                            pointerEvents: 'none',
                        }}
                        onChange={c => {
                            if (c.width && c.height) setCrop(c);
                        }}
                        onComplete={c => setCompletedCrop(c)}
                        minWidth={Math.min(
                            Number(imgRef?.current?.width),
                            Number(imgRef?.current?.height),
                            100
                        )}
                        minHeight={Math.min(
                            Number(imgRef?.current?.width),
                            Number(imgRef?.current?.height),
                            100
                        )}
                        keepSelection={true}
                        style={{cursor: 'default'}}
                    />
                )}

                {!loading && !rotatedImage && src && (
                    <ReactCrop
                        src={src}
                        onImageLoaded={onLoad}
                        imageStyle={{
                            maxHeight: maxHeight,
                            maxWidth: maxWidth,
                            pointerEvents: 'none',
                        }}
                        crop={crop}
                        onChange={c => {
                            if (c.width && c.height) setCrop(c);
                        }}
                        onComplete={c => setCompletedCrop(c)}
                        minWidth={Math.min(
                            Number(imgRef?.current?.width),
                            Number(imgRef?.current?.height),
                            100
                        )}
                        minHeight={Math.min(
                            Number(imgRef?.current?.width),
                            Number(imgRef?.current?.height),
                            100
                        )}
                        keepSelection={true}
                        style={{cursor: 'default'}}
                    />
                )}
                <div className="editBox__rotate-wrapper">
                    <div className="editBox__rotate">
                        <button
                            className="editBox__rotate-left"
                            data-side="left"
                            onClick={rotate}
                        >
                            <svg width="21" height="24" viewBox="0 0 21 24" fill="none">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M18.419 8.92969H7.81411C6.58107 8.92969 5.5815 9.92926 5.5815 11.1623V21.7672C5.5815 23.0002 6.58108 23.9998 7.81411 23.9998H18.419C19.652 23.9998 20.6516 23.0002 20.6516 21.7672V11.1623C20.6516 9.92926 19.652 8.92969 18.419 8.92969ZM18.419 10.046C19.0355 10.046 19.5353 10.5458 19.5353 11.1623V21.7672C19.5353 22.3837 19.0355 22.8835 18.419 22.8835H7.81411C7.19759 22.8835 6.69781 22.3837 6.69781 21.7672V11.1623C6.69781 10.5458 7.19759 10.046 7.81411 10.046H18.419Z"
                                    fill="white"
                                />
                                <path
                                    d="M8.01983 2.37135V0.444499C8.01983 0.108046 8.37841 -0.106087 8.67324 0.054309L13.1641 2.49748C13.4728 2.66544 13.4728 3.10991 13.1641 3.27787L8.67324 5.72104C8.37841 5.88144 8.01983 5.6673 8.01983 5.33085V3.48656C4.13359 3.9017 1.10616 7.20146 1.10616 11.2103V12.2827C1.10616 12.5891 0.858535 12.8375 0.55307 12.8375C0.247605 12.8375 -2.28882e-05 12.5891 -2.28882e-05 12.2827V11.2103C-2.28882e-05 6.58808 3.52125 2.79107 8.01983 2.37135Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                        <button
                            className="editBox__rotate-right"
                            data-side="right"
                            onClick={rotate}
                        >
                            <svg width="21" height="24" viewBox="0 0 21 24" fill="none">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M2.23261 8.92969H12.8375C14.0705 8.92969 15.0701 9.92926 15.0701 11.1623V21.7672C15.0701 23.0002 14.0705 23.9998 12.8375 23.9998H2.23261C0.999572 23.9998 0 23.0002 0 21.7672V11.1623C0 9.92926 0.999573 8.92969 2.23261 8.92969ZM2.23261 10.046C1.61609 10.046 1.1163 10.5458 1.1163 11.1623V21.7672C1.1163 22.3837 1.61609 22.8835 2.23261 22.8835H12.8375C13.454 22.8835 13.9538 22.3837 13.9538 21.7672V11.1623C13.9538 10.5458 13.454 10.046 12.8375 10.046H2.23261Z"
                                    fill="white"
                                />
                                <path
                                    d="M12.6318 2.37135V0.444499C12.6318 0.108046 12.2732 -0.106087 11.9784 0.054309L7.48752 2.49748C7.1788 2.66544 7.1788 3.10991 7.48752 3.27787L11.9784 5.72104C12.2732 5.88144 12.6318 5.6673 12.6318 5.33085V3.48656C16.518 3.9017 19.5454 7.20146 19.5454 11.2103V12.2827C19.5454 12.5891 19.7931 12.8375 20.0985 12.8375C20.404 12.8375 20.6516 12.5891 20.6516 12.2827V11.2103C20.6516 6.58808 17.1304 2.79107 12.6318 2.37135Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <canvas
                ref={previewCanvasRef}
                style={{
                    width: Math.round(completedCrop?.width ?? 0),
                    height: Math.round(completedCrop?.height ?? 0),
                    display: 'none',
                }}
            />

            <div className="editBox-cta">
                <Button className="editBox-btn" onClick={() => onSave(cropedImage, degreeRotate)}>Сохранить</Button>
            </div>
        </div>
    );
};

const mapToProps = ({screen}) => ({screen})
export default connect(mapToProps, null)(EditBox)
