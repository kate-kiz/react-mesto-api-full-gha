
import successIcon from '../images/successIcon.svg'
import failureIcon from '../images/failureIcon.svg'

function InfoTooltip({ name, onClose, isOpen, successTitle, failureTitle, registrated }) {

    return (
        <div className={`popup popup_${name} ${isOpen ? `popup_opened` : ``}`}>
            <div className="popup__container">
                <button
                    className="popup__button-close"
                    type="button"
                    onClick={onClose}
                ></button>
                {registrated ? (
                    <>
                        <img className='popup__icon' src={successIcon} />
                        <p className='popup__title'>{successTitle}</p>
                    </>
                ) : (
                    <>
                        <img className='popup__icon' src={failureIcon} />
                        <p className='popup__title'>{failureTitle}</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default InfoTooltip;
