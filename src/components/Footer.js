function Footer(){
    return (
        <div className="footer container">
            <div>
                <a href="/" className="title mr-1">Formable</a>
                <span>&copy; {new Date().getFullYear()}</span>
            </div>
            <div>
                <p className="title">Specisl Thanks to</p>
                <p className="li">React</p>
                <p className="li">Firebase</p>
                <p className="li">Github</p>
                <p className="li">Netlify</p>
            </div>
            <div>
                <p className="title">Find me on</p>
                <a href="https://github.com/0shuvo0" className="li">Github</a>
                <a href="https://www.fiverr.com/mdshuv0" className="li">Fiverr</a>
                <a href="https://www.upwork.com/freelancers/~01ddb0ba68d7867b5d" className="li">Upwork</a>
                <a href="https://www.linkedin.com/in/md-shuvo-58414b1ba/" className="li">LinkedIn</a>
            </div>
        </div>
    )
}

export default Footer