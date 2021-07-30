import { Link } from 'react-router-dom'

import banner from "../assets/banner.svg"
import features from "../assets/features.svg"

function Home(){
    return <div>
        <div className="section">
            <img src={banner} alt="banner" />
            <div className="content">
                <h1>Create, Share forms easily</h1>
                <p>Formale lets you create forms super simply. All you need to do is create a free account and you'll be all set. You can share the link of your form with others and see thier submissions. It's suitable for online MCQ exam and for job recruitments</p>
                <Link to="/create" className="btn">get started</Link>
            </div>
        </div>
        <div className="section">
            <div className="content">
                <h1>Why choose us</h1>
                <p>
                    <p className="li">Easy to use</p>
                    <p className="li">100% free</p>
                    <p className="li">Share with friends</p>
                    <p className="li">No login required for submitting form</p>
                    <p className="li">Supports media file</p>
                </p>
            </div>
            <img src={features} alt="features" />
        </div>
    </div>
}

export default Home