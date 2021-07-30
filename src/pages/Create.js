import { useState } from 'react'
import { useHistory } from "react-router-dom"

import AddFieldModal from "../components/AddFieldModal"
import RenderPlainForm from "../components/RenderPlainForm"

import { updateObjState } from "../utils"

import { createForm as saveForm } from "../db"

function Create(){
    const [showAddModal, setShowAddModal] = useState(false)
    const [inputType, setInputType] = useState("text")
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    const openAddModal = inputType => {
        setShowAddModal(true)
        setInputType(inputType)
    }

    const [formModel, setFormModel] = useState({
        title: "",
        createdAt: +(new Date()),
        fields: [
            {
                title: "Enter your email",
                type: "short-text",
                required: true
            }
        ],
        endMessage: "",
        expiration: ""
    })

    const addFieldToFormModel = field => {
        let _model = Object.assign({}, formModel)
        _model.fields.push(field)
        setFormModel(_model)
    }

    const inputTypes = ["short-text", "long-text", "number", "multioption-singleanswer", "multioption-multianswer", "file"]

    const createForm = async () => {
        if(loading) return
        setErr("")

        if(!formModel.title.trim()) return setErr("Title is required")
        if(formModel.title.trim().length < 5 || formModel.title.trim().length > 50) return setErr("Title should be 5 - 50 characters long")

        if(formModel.expiration.trim() && formModel.expiration < 1) return setErr("Validity should be at least an hour")

        if(formModel.fields.length < 2) return setErr("You need to add at least one field")

        setLoading(true)
        try{
            await saveForm(formModel)
            setLoading(false)
            history.push("/forms")
        }catch(e){
            setErr(e.message)
            setLoading(false)
        }
    }

    return (
        <div>
            <h1 className="heading">Create new form</h1>
            
            <div className="form">
                <div className="input">
                    <label>Title of the from</label>
                    <input type="text" placeholder="Enter title" onChange={e => updateObjState(setFormModel, formModel ,"title", e.target.value)} />
                </div>

                {formModel.fields.length > 0 && <RenderPlainForm model={formModel} />}

                <div className="input">
                    <label>End message</label>
                    <input type="text" placeholder="What should user see after submitting the form" onChange={e => updateObjState(setFormModel, formModel ,"endMessage", e.target.value)} />
                </div>

                <div className="input">
                    <label>Validity(Optonal)</label>
                    <input type="number" placeholder="For how many hours the form should be fillable" onKeyDown={e => {if(e.key==='.' || e.key==='-'){e.preventDefault()}}} onChange={e => updateObjState(setFormModel, formModel ,"expiration", e.target.value)} />
                </div>
            </div>

            <p className="mb-2 text-right">
                { err && <p className="err text-right mb-1">{err}</p> }
                <button className="btn" onClick={createForm}>{ loading ? <span className="spinner white"></span> : <span>create form</span>}</button>
            </p>
            
            <div className="add-field-container grey-container">
                <p>Add new field</p>
                { inputTypes.map((inputType, index) => <button className="btn" key={index} onClick={() => openAddModal(inputType)}>{inputType.replace("-", " ")}</button>)}
            </div>
            
            { showAddModal && <AddFieldModal inputType={inputType}  close={() => setShowAddModal(false)} add={addFieldToFormModel} /> }
        </div>
    )
}

export default Create