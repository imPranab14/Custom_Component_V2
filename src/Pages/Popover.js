import { useState } from "react";

import Alerts from "../CustomComponents/Popovers/Popover"
import PopoverStyle from "../CustomComponents/Popovers/Popover.module.css"

const Popover = () => {

    const [red, setRed] = useState(false);
    const [yellow, setYellow] = useState(false);
    const [green, setGreen] = useState(false);
    const [blue, setBlue] = useState(false);
    const [gray, setGray] = useState(false);
    const [info, setInfo] = useState(false);


    return (<div className={PopoverStyle.Mainbody}>
        <button className={PopoverStyle.DengerBtnStyle} onClick={() => setRed(true)}>Denger</button>
        <button className={PopoverStyle.WarningBtnStyle} onClick={() => setYellow(true)}>Warning</button>
        <button className={PopoverStyle.SuccessBtnStyle} onClick={() => setGreen(true)}>Success</button>
        <button onClick={() => setBlue(true)}>blue</button>
        <button onClick={() => setGray(true)}>gray</button>
        <button onClick={() => setInfo(true)}>info</button>

        {red && (
            <Alerts 
                variant="danger"
                time={4}
                children="red has been updated"
                setAlert={setRed}
            />
        )}

        {blue && (
            <Alerts
                variant="info"
                time={4}
                children="blue has been updated"
                setAlert={setBlue}
            />
        )}

        {green && (
            <Alerts
                variant="success"
                time={4}
                children="green has been updated"
                setAlert={setGreen}
            />
        )}

        {yellow && (
            <Alerts
                variant="warning"
                time={4}
                children="yellow has been updated"
                setAlert={setYellow}
            />
        )}

        {gray && (
            <Alerts
                variant="secondary"
                time={4}
                children="gray has been updated"
                setAlert={setGray}
            />
        )}
    </div>);
}

export default Popover;