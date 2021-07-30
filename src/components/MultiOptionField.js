import { useState } from 'react'

import { arrayToggle } from "../utils"

function MultiOptionField({fieldModel, onSelected }){
    const [selected, setSelected] = useState([])

    const addOption = opt => {
        let _selected = [...selected]
        if(fieldModel.type === "multioption-multianswer"){
            arrayToggle(_selected, opt)
        }else{
            _selected = [opt]
        }
        setSelected(_selected)
        onSelected(_selected)
    }

    return (
        <div className="input">
            <label>{fieldModel.title}{fieldModel.required && <span className="err">*</span>}</label>
            {fieldModel.options.map((option, index) => (
                <div className="input inline" key={index}>
                    <input type={fieldModel.type === "multioption-multianswer" ? "checkbox" : "radio"}  className="mr-1" name={fieldModel.title.replace(" ", "")} onChange={() => addOption(option)} />
                    <label>{option}</label>
                </div>
            ))}
        </div>
    )
}

export default MultiOptionField