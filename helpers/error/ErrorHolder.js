const errorHolderMongooseValidation = (err) =>
{
    let _return = {}
    let errors = []
    let _fields = {}

    const fields = Object.keys(err.errors)

    for (const field in fields){
        const tmp_fields = Object.assign({}, _fields)

        tmp_fields.name = err.errors[fields[field]].name
        tmp_fields.message = err.errors[fields[field]].properties.message;
        tmp_fields.path = err.errors[fields[field]].properties.path

        errors.push(tmp_fields)
    }

    _return._message = err._message
    _return.errors = errors

    return _return;
}

module.exports = {errorHolderMongooseValidation}