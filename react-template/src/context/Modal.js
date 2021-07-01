import React, { useContext, useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import './modal.css';

//code in this file is borrowed from Nate Blaz's contribution to our group project "showboat" https://github.com/nathanblaz/showboat-group-project
const ModalContext = React.createContext();

export function ModalProvider({ children }) {
    const modalRef = useRef(); //kind of a mutable version of useState--modelRef.current will refer to the thing the modal is coming off of
    const [value, setValue] = useState(null);

    useEffect(() => {
        setValue(modalRef.current);
    }, []);

    return (
        <>
            <ModalContext.Provider value={value}>
                {/* ModalContext will wrap entire app via Modal Provider, allowing a modal to be rendered anywhere in the app--
                "children" represents any other component rendered by that app */}
                {children}
            </ModalContext.Provider>
            <div id="modal-parent" ref={modalRef} /> {/* modal is literally attached here */}
        </>
    )
}

export function Modal({ onClose, children }) {  // onClose function will be the ShowModal state in the component file
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose} />
            <div id="modal-content">
                {children}
            </div>
        </div>, modalNode
    );
}
