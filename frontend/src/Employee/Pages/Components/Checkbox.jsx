import React, { useState } from "react";

const Checkbox = () => {

    const [checked, setChecked] = useState(false);
    const [text, setText] = useState("Pending");

    const handleChange = () => {
        setChecked(!checked);

        if (checked === true) 
        {setText("Absent")}
        else  
        {setText("Present")}
    };

    return (
        <>
            <input type="checkbox"
                checked={checked}
                onChange={handleChange} />
            <p>{text}</p>
        </>
    )
}

export default Checkbox