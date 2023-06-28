module.exports = (data, var_name, minify) => {
    let str = data.toString().match(/\{[a-zA-Z 0-9:,/'"`\t\r\n()_.{}]*}/g)[0]
        .replaceAll('Yup.', 'Joi.')
        .replaceAll('string().nullable()', 'string()')
        .replaceAll('number().convert_num().nullable()', 'number()')
        .replaceAll('date().convert_date().nullable()', 'date()')
        .replaceAll('boolean().nullable()', 'boolean()')
        .replaceAll('array().of', 'array().items')
    let result
    if (minify) {
        str = str
            .replaceAll('\t', '')
            .replaceAll('  ', '')
            .replaceAll('\r\n', '')
        result = `const Joi = require('joi');module.exports.${var_name} = ${str};`
    }else {
        result = `const Joi = require('joi');\nmodule.exports.${var_name} = ${str};`
    }
    return result
}