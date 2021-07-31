import { useState } from 'react'

import { uploadFile } from "../db"

function FileField({ fieldModel, onCompleted }){
    const [selectedFileName, setSelectedFileName] = useState("")
    const [progress, setProgress] = useState(0)
    const [showPregress, setShowProgress] = useState(false)
    const [err, setErr] = useState("")

    const handleFile = async e => {
        setErr("")
        setProgress(0)

        let file = e.target.files[0]
        let ext = file.name.split('.').pop().toLowerCase()

        if(!file) return
        if(fieldModel.accepted.indexOf(ext) === -1) return setErr("Choose file with thoe following extensions: " + fieldModel.accepted.join(", "))
        //chechk if file size is biggern than  2MB
        if(file.size > 2*1024*1024) return setErr("File size should be less than than 2MB")

        setShowProgress(true)

        setSelectedFileName(file.name)
        let fileName = +(new Date()) + "-" + file.name
        let task = uploadFile(file, fileName)
        task.on("state_changed", snapshot => {
            let  percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(percentage)
        }, err => setErr(err.message))
        let snapshot = await task
        let downloadUrl = await snapshot.ref.getDownloadURL()
        onCompleted(downloadUrl)
    }

    return (
        <div className="input">
            <label>{fieldModel.title}{fieldModel.required && <span className="err">*</span>}</label>
            <div className="file-field">
                <input type="file" className="file" id={fieldModel.title.replace(" ", "")} onChange={handleFile} />
                <label className="btn" htmlFor={fieldModel.title.replace(" ", "")}>choose file</label>
                <span>{selectedFileName}</span>
            </div>
            { showPregress && (
            <div className="progress-bar">
                <div className="progress" style={{width: progress + "%"}}></div>
            </div> )}
            { err && <p className="err">{err}</p> }
        </div>
    )
}

export default FileField