import { useState } from 'react'

function AddTextField({inputType, add, close}){
    const [err, setErr ] = useState("")

    const [title, setTitle] = useState("")
    const [required, setRequired] = useState(false)

    const addField = () => {
        if(!title.trim()) return setErr("Title is required")
        if(title.trim().length < 3) return setErr("Title should be atleast 3 characters long")

        add({
            title,
            required,
            type: inputType
        })
        close()
    }

    return (
        <div>
            <div className="input">
                <label>Enter field title</label>
                <input type="text" placeholder={`Eg. Enter your ${inputType === "short-text" ? "Username" : inputType === "long-text" ? "information" : "age"}`} onChange={e => setTitle(e.target.value)} />
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

export default AddTextField