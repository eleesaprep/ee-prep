import { useState } from 'react';
import images from './images';

export default function Alert({ title, message }) {
  const [clicked, setClicked] = useState(false);
  const handleCloseClicked = () => {
    setClicked(true);
  };
  return (
    <>
      <div className={clicked ? 'no-alert' : 'alert-container'}>
        <div className="alert-title-wrap">
          <div className="alert-title-wrap">
            <img className="status-img" src={title === 'failed' ? images.failed : images.success} alt="status" />
            <p className="alert-title">{title}</p>
          </div>
          <img onClick={() => handleCloseClicked()} className="close-alert" src={images.close_alert} alt="close alert" />
        </div>
        <p className="alert-message black-txt">{message}</p>
      </div>
    </>
  );
}
