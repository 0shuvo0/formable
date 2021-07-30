import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { getSubmissions } from "../db"

import SubmissionCard from "../components/SubmissionCard"

function Submissions(){
    const [loading, setLoading] = useState(true)
    const [msg, setMsg] = useState('')
    const [submissions, setSubmissions] = useState([])

    const { id } = useParams()

    useEffect(() => {
        if(!localStorage.getItem('gfc-user')) return
        const fetchData = async () => {
            try{
                let sbmns = await getSubmissions({ formID: id })
                setSubmissions(sbmns)
                setLoading(false)
            }catch(e){
                setLoading(false)
                setMsg(e.message)
            }
        }
        fetchData()
    }, [id])

    return (
        <div>
            <h1 className="heading mb-1">Form Submissions</h1>
            { loading ? <p className="text-center mt-1"><span className="spinner"></span></p>
            : msg ? <h3 className="msg mt-1">{msg}</h3>
            : submissions.length > 0 ? (
                <div className="cards-container submissions">
                    { submissions.map((subm, index) => <SubmissionCard key={index} submission={subm.submission} /> )}
                </div>
            ) : <h3 className="msg mt-1">No submissions yet</h3>}
        </div>
    )
}

export default Submissions