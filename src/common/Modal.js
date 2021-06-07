import {h, Component, Fragment} from 'preact';
import classNames from 'classnames';
import './Modal.scss';


class Modal extends Component {
    onClose(e) {
        this.props.onClose(e);
    }

    onCloseOverlay(e) {
        if (e.target.classList.contains('modal') || e.target.classList.contains('jqmOverlay')) {
            this.onClose(e);
        }
    }

    onSubmit(e) {
        e.preventDefault();
    }

    showScrollbar() {
        document.body.classList.remove("modal-open");
    }

    hideScrollbar() {
        document.body.classList.add("modal-open");
    }

    toggleScrollbar() {
        if (this.props.isShowing) {
            this.hideScrollbar();
        } else {
            this.showScrollbar();
        }
    }

    onKeyDown(e) {
        if (e.key === "Escape" || e.key === "Esc") {
            if (this.props.isShowing) {
                this.onClose(e);
            }
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        this.toggleScrollbar();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isShowing !== this.props.isShowing) {
            this.toggleScrollbar();
        }
    }

    componentWillUnmount() {
        this.showScrollbar();
        document.removeEventListener('keydown', (e) => this.onKeyDown(e));
    }

    render(props, state, context) {
        const {isShowing, header, children, className} = props;
        return (
            <>
            <div>
                {isShowing && <div className="jqmOverlay" onMouseDown={(e) => this.onCloseOverlay(e)} >
                    <div className={classNames('modal', className, {show: isShowing})} onMouseDown={(e) => this.onCloseOverlay(e)}>
                        <div className="modal-inner">
                            <div className="close" onClick={(e) => this.onClose(e)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.4099 11.9999L17.7099 7.70994C17.8982 7.52164 18.004 7.26624 18.004 6.99994C18.004 6.73364 17.8982 6.47825 17.7099 6.28994C17.5216 6.10164 17.2662 5.99585 16.9999 5.99585C16.7336 5.99585 16.4782 6.10164 16.2899 6.28994L11.9999 10.5899L7.70994 6.28994C7.52164 6.10164 7.26624 5.99585 6.99994 5.99585C6.73364 5.99585 6.47824 6.10164 6.28994 6.28994C6.10164 6.47825 5.99585 6.73364 5.99585 6.99994C5.99585 7.26624 6.10164 7.52164 6.28994 7.70994L10.5899 11.9999L6.28994 16.2899C6.19621 16.3829 6.12182 16.4935 6.07105 16.6154C6.02028 16.7372 5.99414 16.8679 5.99414 16.9999C5.99414 17.132 6.02028 17.2627 6.07105 17.3845C6.12182 17.5064 6.19621 17.617 6.28994 17.7099C6.3829 17.8037 6.4935 17.8781 6.61536 17.9288C6.73722 17.9796 6.86793 18.0057 6.99994 18.0057C7.13195 18.0057 7.26266 17.9796 7.38452 17.9288C7.50638 17.8781 7.61698 17.8037 7.70994 17.7099L11.9999 13.4099L16.2899 17.7099C16.3829 17.8037 16.4935 17.8781 16.6154 17.9288C16.7372 17.9796 16.8679 18.0057 16.9999 18.0057C17.132 18.0057 17.2627 17.9796 17.3845 17.9288C17.5064 17.8781 17.617 17.8037 17.7099 17.7099C17.8037 17.617 17.8781 17.5064 17.9288 17.3845C17.9796 17.2627 18.0057 17.132 18.0057 16.9999C18.0057 16.8679 17.9796 16.7372 17.9288 16.6154C17.8781 16.4935 17.8037 16.3829 17.7099 16.2899L13.4099 11.9999Z" fill="#989FB3" />
                                </svg>
                            </div>
                            <header className="modal-header">
                                <h3>{header}</h3>
                            </header>

                            <div className="modal-content">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>}
                </div>
            </>
        );
    }
}


export default Modal;
