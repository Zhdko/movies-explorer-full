import './PopupInfo.css';

function PopupInfo(props) {
  const message = props.message;

  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className='popup__container'>
        <div
          className={`popup__image ${
            message?.isSuccessfully ? 'popup__image_type_success' : 'popup__image_type_error'
          }`}
        />
        <h2 className='popup__title'>{message?.text}</h2>
        <button type='button' className='popup__close-btn' aria-label='Закрыть' onClick={props.onClose} />
      </div>
    </div>
  );
}

export default PopupInfo;
