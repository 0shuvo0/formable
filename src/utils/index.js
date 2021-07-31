export const updateObjState = (setter, model, prop, val) => {
    let _model = Object.assign({}, model)
    _model[prop] = val
    setter(_model)
}
export const updateArrOfObjState = (setter, model, index, prop, val) => {
    let _model = [...model]
    _model[index] = Object.assign({}, _model[index], { [prop]: val })
    setter(_model)
}

//toggles an item in array
export const arrayToggle = (arr, item) => {
    let idx = arr.indexOf(item)
    if(idx > -1){
        arr.splice(idx, 1)
    }else{
        arr.push(item)
    }
}

export const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const getDateFromMillis = milliseconds => {
    let date = new Date(milliseconds)
    return date.toLocaleString()
}

export const expired = (createDateMillis, hours) => {
    if(!hours) return false
    let currentDateMillis = +(new Date())
    let hoursMillis = parseInt(hours) * 60 * 60 * 1000
    return (currentDateMillis - createDateMillis) < hoursMillis
}

export const createFillableModel = model => {
    let fillableModel = []
    let fields = model.fields
    for(let field in fields){
        let fld = fields[field]
        // let fieldModel = {
        //     title: fld.title,
        //     required: fld.required,
        //     type: fld.type,
        //     value: fld.type === "multioption-singleanswer" || fld.type === "multioption-multianswer" ? [] : ""
        // }
        // fillableModel.push(fieldModel)
        fillableModel.push({...fld, value: fld.type === "multioption-singleanswer" || fld.type === "multioption-multianswer" ? [] : ""})
    }
    return fillableModel
}

export const createSubmitableModel = fields => {
    let submitableModel = []
    for(let field in fields){
        let fld = fields[field]

        if(!fld.value || fld.value.length < 1) continue
        
        let fieldModel = {
            title: fld.title,
            value: fld.value,
            type: fld.type
        }
        submitableModel.push(fieldModel)
    }
    return submitableModel
}

export const hasError = fields => {
    for(let field of fields){
        if(!field.required && !field.value.trim()) continue

        if(["short-text", "long-text", "number", "file"].indexOf(field.type) > -1){
            if(field.required && !field.value.trim()) return `'${field.title}' is a required field`
        }else{
            if(field.required && field.value.length < 1) return `'${field.title}' is a required field`
        }
    }
    return false
}