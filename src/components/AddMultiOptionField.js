import { useState, createRef } from 'react'

function AddMultiOptionField({ inputType, add, close }){
    const [err, setErr ] = useState("")
    const [opterr, setOpterr ] = useState("")

    const [title, setTitle] = useState("")
    const [required, setRequired] = useState(false)
    const inputRef = createRef()
    const [options, setOptions] = useState([])
    const [option, setOption] = useState("")

    const addField = () => {
        if(!title.trim()) return setErr("Title is required")
        if(title.trim().length < 4) return setErr("Title should be atleast 4 characters long")
        if(options.length < 1) return setErr("Atleast one option is required")
        add({
            title,
            required,
            options,
            type: inputType
        })
        close()
    }

    const addOption = () => {
        if(!option.trim()) return setOpterr("Option is required")
        let _opts = [...options]
        _opts.push(option)
        setOption("")
        setOptions(_opts)
        inputRef.current.value = ""
        setOpterr("")
    }

    return (
        <div>
            <div className="input">
                <label>Enter field title</label>
                <input type="text" placeholder={`Eg. Select your ${inputType === "multioption-multianswer" ? "skills" : "gender"}`} onChange={e => setTitle(e.target.value)} />
            </div>
            { options.length > 0 && (
                <div className="mb-1">
                    <p className="b">Options</p>
                    { options.map((opt, index) => (
                        <div className="input inline mb-0" key={index}>
                            <input type={inputType === "multioption-singleanswer" ? "radio" : "checkbox"} className="mr-1" name="inputs" />
                            <label>{opt}</label>
                        </div>
                    )) }
                </div>
            )}
            <div className="input grey-container p-1">
                <input type="text" className="mb-1" placeholder="Enter a option" onChange={e => setOption(e.target.value)} ref={inputRef} />
                {opterr && <p className="err mb-1 text-small">{opterr}</p>}
                <button class="btn" onClick={addOption}>Add Option</button>
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

export default AddMultiOptionField