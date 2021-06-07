import {h} from 'preact';
import './FaqWrapperHeadline.scss';

export const FaqDialogHeadline = ({title, svgSpriteID = 'union'}) => {

    return (
        <div className="FaqWrapperHeadline">
            <div className={`icon ${svgSpriteID}`}>
                <img src={`/static/dist/aiijc/images/${svgSpriteID}.svg`} />
            </div>
            <div className="title">{title}</div>
        </div>
    );
};




