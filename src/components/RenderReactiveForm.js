import { useState } from 'react'

import { createFillableModel, createSubmitableModel, updateArrOfObjState, hasError } from "../utils"

import { submitForm } from "../db"

import MultiOptionField from "./MultiOptionField"
import FileField from "./FileField"

function RenderReactiveForm({ model, onSubmitted }){
    const [fillableModel, setFillableModel] = useState(createFillableModel(model))
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")

    const handleSubmit = async () => {
        setErr("")
        if(loading) return

        let error = hasError(fillableModel, model.id)
        if(error) return setErr(error)

        setLoading(true)

        let submitableModel = createSubmitableModel(fillableModel)
        
        try{
            await submitForm(submitableModel, model.id)
            setLoading(false)
            onSubmitted()
        }catch(e){
            setErr(e.message)
            setLoading(false)
        }
    }

    return (
        <div className="main-form mt-1">
            { fillableModel.map((field, index) => ["short-text", "number"].indexOf(field.type) > -1
            ? (
                <div key={index} className="input">
                    <label>{field.title}{field.required && <span className="err">*</span>}</label>
                    <input type={field.type === "number" ? "number" : "text"} onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)} />
                </div>
            ) : field.type === "long-text" ? (
                <div key={index} className="input">
                    <label>{field.title}{field.required && <span className="err">*</span>}</label>
                    <textarea onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)}></textarea>
                </div>
            ) : field.type === "multioption-singleanswer" || field.type === "multioption-multianswer" ? (
                <MultiOptionField key={index} fieldModel={field} onSelected={res => updateArrOfObjState(setFillableModel, fillableModel, index, "value", res)} />
            ) : field.type === "file" ? (
                <FileField key={index} fieldModel={field} onCompleted={fileName => updateArrOfObjState(setFillableModel, fillableModel, index, "value", fileName)} />
            ) : <p key={index}>Unknown field type</p>)}
            {err && <p className="err mb-1">{err}</p>}
            <button className="btn" onClick={handleSubmit}>{ loading ? <span className="spinner white"></span> : <span>submit</span>}</button>
        </div>
    )
}

export default RenderReactiveForm