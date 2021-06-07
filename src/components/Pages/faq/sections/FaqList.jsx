import {h, Fragment} from 'preact';
import {Link} from 'react-router-dom';
import './FaqList.scss';

export const FaqList = ({items = []}) => {
    return (
        <>
            <ul className="faq-list">
                {items.map(item => {
                    return (
                        <li>
                            <div className="title">
                                {item.answer_title}
                            </div>
                            <div class="card__bottom">
                                <div class="card__icon" dangerouslySetInnerHTML={{__html: item.icon}}></div>
                                <div class="card__arrow">
                                    <div class="icon-arrow_right">
                                        <img src="/static/dist/aiijc/images/chevron-right.svg" />
                                    </div>
                                </div>
                            </div>
                            <Link to={`/faq/${item.slug}`} className="faq-list-link"> </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    )
}
