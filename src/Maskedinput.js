import React from "react";
import InputMask from "react-input-mask";

const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');

const Maskedinput = ({ value, onChange }) => {

    function handleChange(event) {
        onChange({
            ...event,
            target:{
                ...event.target,
                value: onlyNumbers(event.target.value),
            }
        })
    }

    return <InputMask className="input" mask="99.999.999/9999-99" value={value} onChange={handleChange}/>
}

export default Maskedinput;