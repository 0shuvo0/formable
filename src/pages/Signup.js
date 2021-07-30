import { useState } from 'react'
import { Link } from 'react-router-dom'

import { validateEmail } from "../utils"
import { signup } from "../db"

function Signup(){
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [cpwd, setCpwd] = useState("")

    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(loading) return
        setErr("")

        if(!email.trim()) return setErr("Email is required")
        if(!validateEmail(email)) return setErr("Email is not valid")

        if(!pwd.trim()) return setErr("Password is required")
        if(pwd.trim().length < 6 || pwd.trim().length > 20) return setErr("Password should be 6 - 20 characters long")
        
        if(!cpwd.trim()) return setErr("Confirm your password")
        if(pwd !== cpwd) return setErr("Passwords do not match")
        
        setLoading(true) 

        try{
            await signup(email, pwd)
        }catch(e){
            setLoading(false)
            setErr(e.message)
        }
        
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="heading mb-1">Create a new account</h1>
            <div className="input">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" onChange={(e) => setPwd(e.target.value)} />
            </div>
            <div className="input">
                <label>Confir,</label>
                <input type="password" placeholder="Confirm your password" onChange={(e) => setCpwd(e.target.value)} />
            </div>
            {err && <p className="err mb-1">{err}</p>}
            <Link to="/login" className="alt">already have an account?</Link>
            <button className="btn" type="submit">{ loading ? <span className="spinner white"></span> : <span>create account</span>}</button>
        </form>
    )
}

export default Signup