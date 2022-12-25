import React, { useContext, useEffect, useRef, useState } from 'react';
import * as ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext();

const ModalProvider = ({ children }) => {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);
  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
};

const Modal = ({ onClose, children }) => {
  const modalNode = useContext(ModalContext);
  return ReactDOM.createPortal(
    <div id='modal'>
      <div id='modal-background' onClick={modalNode ? onClose : null}></div>
      <div id='modal-content'>{children}</div>
    </div>,
    modalNode
  );
};

export default ModalProvider;