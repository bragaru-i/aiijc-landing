import {h} from 'preact'
import s from './Heading.module.scss'
import cn from 'classnames'

const Heading = ({text, color = ""}) => {
    return (
        <div className={cn(s["sections-heading"], s[`${color}`])} dangerouslySetInnerHTML={{__html: text}} />
    )
}

export default Heading
