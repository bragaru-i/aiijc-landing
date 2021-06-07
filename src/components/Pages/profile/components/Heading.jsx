import {h, Fragment} from "preact";
import {useState} from 'preact/hooks'
import cn from "classnames";
import {useTranslation} from "react-i18next";

import {Icon} from "../../../../common/icons";
import s from "./Heading.module.scss";
import Modal from '../../../../common/Modal'

const Heading = ({text, isParentalAccept = false, className}) => {
  const {t} = useTranslation();
  const [isParentAdvisory, setParentAdvisory] = useState(false);
  const closeParentalAdvisory = () => setParentAdvisory(false)

  return (
    <>
    <div className={cn(className, s.container)}>
      <div className={s.text}>{text}</div>
      {isParentalAccept && (
        <div className={s.parental} onClick={()=> setParentAdvisory(true)}>
          <Icon name='accepted' width='20px' className={s.ico} />
          <span>{t("Profile.parentalAccept")}</span>
        </div>
      )}
    </div>
      <Modal 
        isShowing={isParentAdvisory}
         onClose={closeParentalAdvisory} 
         header= "Подтверждение согласия родителей"
         className="modal--parental-adv"
         >
        
      data go here
       
      </Modal>
      </>
  );
};

export default Heading;
