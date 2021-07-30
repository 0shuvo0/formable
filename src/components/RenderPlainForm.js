function RenderPlainForm({ model }){
    return (
        <div className="grey-container mb-1">
            <h1 className="mb-1">Preview</h1>
            {model.fields.map((field, index) => field.type === "short-text" || field.type === "number" ? 
                (
                    <div key={index} className="input">
                        <label>{field.title}{field.required && <span className="err">*</span>}</label>
                        <input type={field.type} />
                    </div>
                )
                : field.type === "long-text" ? 
                (
                    <div key={index} className="input">
                        <label>{field.title}{field.required && <span className="err">*</span>}</label>
                        <textarea></textarea>
                    </div>
                )
                : field.type === "file" ? 
                (
                    <div key={index} className="input">
                        <label>{field.title}{field.required && <span className="err">*</span>}</label>
                        <input type="file" />
                    </div>
                )
                : field.type === "multioption-singleanswer" || field.type === "multioption-multianswer" ? 
                (
                    <div key={index} className="input">
                        <label>{field.title}{field.required && <span className="err">*</span>}</label>
                        { field.options.map((option, idx) => (
                            <div className="input inline" key={idx}>
                                <input type={field.type === "multioption-singleanswer" ? "radio" : "checkbox"} className="mr-1" name={field.title.replace(" ", "")} />
                                <label>{option}</label>
                            </div>
                        )) }
                    </div>
                )
                : <p key={index}>Unknown fiel type.</p>
            )}
            <button className="btn mt-1">submit</button>
        </div>
    )
}

export default RenderPlainForm