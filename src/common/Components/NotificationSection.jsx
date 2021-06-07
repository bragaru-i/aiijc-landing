import {h} from 'preact'

import s from './NotificationSection.module.scss'
import {Icon} from '../index.js'

const NotificationSection = ({children}) => {
    return (
        <div className={s.container} >
        <div className={s.ico}>
            <Icon name="notification-icon" />  
            </div>  
           <div dangerouslySetInnerHTML={{__html: children}}/>
        </div>
    )
}

export default NotificationSection
