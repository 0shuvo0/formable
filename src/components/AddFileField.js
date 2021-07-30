import { useState } from 'react'
import { arrayToggle } from '../utils'
function AddFileField({inputType, add, close}){
    const [err, setErr ] = useState("")

    const availableTypes = ["jpg", "png", "jpeg", "pdf", "txt"]

    const [title, setTitle] = useState("")
    const [required, setRequired] = useState(false)
    const [fileTypes, setFileTypes] = useState([])

    const addFileType = type => {
        let _fileTypes = [...fileTypes]
        arrayToggle(_fileTypes, type)
        setFileTypes(_fileTypes)
    }

    const addField = () => {
        if(!title.trim()) return setErr("Title is required")
        if(title.trim().length < 4) return setErr("Title should be atleast 4 characters long")
        if(!fileTypes.length) return setErr("Select atleast one file type")
        add({
            title,
            required,
            type: inputType,
            accepted: fileTypes
        })
        close()
    }

    return (
        <div>
            <div className="input">
                <label>Enter field title</label>
                <input type="text" placeholder="Eg. Upload your resume" onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="input">
                <label>Select acceptable file types</label>
                <div className="inline-inputs">
                    { availableTypes.map((type, index) => (
                        <div className="input inline" key={index}>
                            <input type="checkbox" className="mr-1" onChange={() => addFileType(type)} />
                            <label>.{type}</label>
                        </div>
                    )) }
                </div>
            </div>
            <div className="input inline">
                <label>Required: </label>
                <input type="checkbox" onChange={() => setRequired(!required)} />
            </div>
            {err && <p className="err mb-1">{err}</p>}
            <button className="btn" onClick={addField}>add field</button>
        </div>
    )
}

export default AddFileField