import {h, Fragment} from 'preact';
import {useState} from "preact/hooks";
import {connect} from 'redux-zero/preact';
import cn from 'classnames'
import {Icon} from '../../../../common/icons';
import Modal from '../../../../common/Modal';
import useAvatar from './useAvatar';
import EditBox from './EditBox';
import {useTranslation} from "react-i18next";

import s from './Avatar.module.scss';
import './Avatar.scss';
import actions from "../../../../store/actions";
import {Spinner} from "../../../../common/Components/Spinner";

const Avatar = ({
    screen,
    user,
    setAvatar,
    avatarUrl,
}) => {
    const {
        ref,
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
        setNavDesktop
    } = useAvatar(avatarUrl, user.cropping);

    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const isMobile = !!screen && screen.width < 668;

    const updateAvatar = async (cropedImage, degreeRotate) => {
        setIsLoading(true);
        const newUser = await saveImageHandler(cropedImage, degreeRotate);
        setAvatar(newUser.image, newUser.cropping);
        setIsLoading(false);
    }

    const deleteAvatar = async () => {
        setIsLoading(true);
        const newUser = await deleteHandle();
        setAvatar(newUser.image, newUser.cropping);
        setIsLoading(false);
    }


    const BtnNav = () => (
        <ul className={s['avatar-btnNav']} ref={ref}>
            <li>
                <label className={s['upload-label']}>
                    <input accept="image/png, image/jpeg" type="file" onChange={inputChange}/>
                    <span>{t('Profile.Avatar.upload')}</span>
                </label>
            </li>

            {!!avatarUrl && (
                <>
                    <li>
                        <span onClick={openModifyModal}>{t('Profile.Avatar.edit')}</span>
                    </li>
                    <li>
                        <span onClick={deleteAvatar}>{t('Profile.Avatar.delete')}</span>
                    </li>
                </>
            )}
        </ul>
    );

    const icoType = !isMobile && {"fill": "none", "stroke": "#000"};
    const cameraHandler = () => {
        if (isMobile) return setNavModal(true);
        return setNavDesktop(true)
    }

    return (
        <div className={s.container}>
            <div className={s.avatar}>
                <img src={avatarUrl || '/static/dist/aiijc/images/avatar-example.svg'}/>
                {isLoading && <div className={s.spinnerWrapper}><Spinner /></div>}
            </div>

            {isNavDesktop && !isMobile && (
                <div className={s.menuDesktop}>
                    <BtnNav/>
                </div>
            )}

            {isNavDesktop && (
                <span className={s.close} onClick={() => setNavDesktop(false)}>
                    <Icon name="close" width="10px"/>
                </span>
            )}

            <div className={cn(s['avatar-change'], {[s.disabled]: isNavDesktop})}>
                <button className={s.camera} onClick={() => cameraHandler(true)}>
                    <Icon name="camera" width="20px" {...icoType} />
                </button>
            </div>
            <>
                <Modal
                    isShowing={isCropModal}
                    onClose={closeBoxes}
                    className="modal--bottom modal--bottom--white"
                >
                    <EditBox
                        dimension={dimension}
                        src={imageUrl}
                        onSave={updateAvatar}
                        className=""
                    />
                </Modal>
                <Modal
                    isShowing={isModifyModal}
                    onClose={closeBoxes}
                    className="modal--bottom modal--bottom--white"
                >
                    <EditBox
                        dimension={dimension}
                        src={user.image}
                        onSave={updateAvatar}
                        className=""
                    />
                </Modal>
            </>
            <Modal
                key="modal-loadPhoto-mobile"
                isShowing={isNavModal}
                onClose={() => setNavModal(false)}
                className="modal--bottom avatar-modal-bottom">
                <BtnNav/>
            </Modal>
        </div>
    );
};
const mapToProps = ({screen, user, setAvatar}) => ({screen, user, setAvatar});
export default connect(mapToProps, actions)(Avatar);
