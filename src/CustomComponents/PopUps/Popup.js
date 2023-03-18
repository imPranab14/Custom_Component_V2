import { useState } from "react";
import PopupStyleNew from "../PopUps/PopupStyle.module.css";

const Popup = ({ children, visible, onClose }) => {

    
    const closePopup = () => {
        onClose();
    }
    

    return ( 
        visible ? 
        <div className={PopupStyleNew.modal}>
        <div className={PopupStyleNew.PopupContent}>
        <button className={PopupStyleNew.CloseBtn} onClick={() => closePopup()}>&#10006;</button> {children}
        
        </div>
    </div> : "");
   
    
}

export default Popup;