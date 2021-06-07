import {h, Fragment} from 'preact';
import {useState} from "preact/hooks";
import {connect} from 'redux-zero/preact';
import cn from 'classnames'
import {useTranslation} from "react-i18next";

import {Icon} from '../../../../common/icons';
import Modal from '../../../../common/Modal';
import useTeamAvatar from './useTeamAvatar';
import EditBox from '../../profile/components/EditBox';

import actions from "../../../../store/actions";
import {Spinner} from "../../../../common/Components/Spinner";

import '../../profile/components/Avatar.scss';
import s from '../../profile/components/Avatar.module.scss';
import './TeamAvatar.scss'

const DEFAULT_AVATAR = '/static/dist/aiijc/images/team-default-image.svg'

const TeamAvatar = ({
    screen,
    team,
    setTeamAvatar,
    avatarUrl,
    patchUrl,
    isAllowedToChange
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
    } = useTeamAvatar(avatarUrl, patchUrl);

    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const isMobile = !!screen && screen.width < 668;

    const updateAvatar = async (cropedImage, degreeRotate) => {
        setIsLoading(true);
        const newTeam = await saveImageHandler(cropedImage, degreeRotate);
        setTeamAvatar(newTeam.avatar, newTeam.cropping);
        setIsLoading(false);
    }

    const deleteAvatar = async () => {
        setIsLoading(true);
        const newTeam = await deleteHandle();
        setTeamAvatar(newTeam.avatar, newTeam.cropping);
        setIsLoading(false);
    }


    const BtnNav = () => (
        <ul className={s['avatar-btnNav']} ref={ref}>
            <li>
                <label className={s['upload-label']}>
                    <input accept="image/png, image/jpeg" type="file" onChange={inputChange} />
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
                <img src={avatarUrl || DEFAULT_AVATAR} />
                {isLoading && <div className={s.spinnerWrapper}><Spinner /></div>}
            </div>

            {isNavDesktop && !isMobile && isAllowedToChange && (
                <div className={s.menuDesktop}>
                    <BtnNav />
                </div>
            )}

            {isNavDesktop && isAllowedToChange && (
                <span className={s.close} onClick={() => setNavDesktop(false)}>
                    <Icon name="close" width="10px" />
                </span>
            )}

            { isAllowedToChange && (
                <>
                    <div className={cn(s['avatar-change'], {[s.disabled]: isNavDesktop})}>
                        <button className={s.camera} onClick={() => cameraHandler(true)}>
                            <Icon name="camera" width="20px" {...icoType} />
                        </button>
                    </div>

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
                            src={team.avatar}
                            onSave={updateAvatar}
                            className=""
                        />
                    </Modal>

                    <Modal
                        key="modal-loadPhoto-team-mobile"
                        isShowing={isNavModal}
                        onClose={() => setNavModal(false)}
                        className="modal--bottom avatar-modal-bottom">
                        <BtnNav />
                    </Modal>
                </>)}
        </div>
    );
};
const mapToProps = ({screen, team, setTeamAvatar}) => ({screen, team, setTeamAvatar});
export default connect(mapToProps, actions)(TeamAvatar);
