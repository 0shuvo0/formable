import { useEffect } from "react"
import { Link, useLocation, useHistory } from "react-router-dom"

import { useAuthenticated, logout } from "../db"

function Navbar(){
    const user = useAuthenticated()
    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        if(user){
            localStorage.setItem("gfc-user", JSON.stringify(user))
            if(location.pathname === "/signup" || location.pathname === "/login"){
                history.push("/")
            }
        }else{
            if(location.pathname === "/create" || location.pathname === "/forms" || location.pathname.slice(0, 12) === "/submissions"){
                history.push("/login")
            }
        }
    }, [user, location, history])


    return (
        <div className="navbar container">
            <a href="/" className="brand">Formable</a>
            <nav className="nav">
                { user ? (
                    <span>
                        <Link to="/forms">my forms</Link>
                        <Link to="/create">create</Link>
                        <span onClick={logout}>logout</span>
                    </span>
                ) : (
                    <span>
                        <Link to="/signup">signup</Link>
                        <Link to="/login">login</Link>
                    </span>
                )}
            </nav>
        </div>
    )
}

export default Navbar