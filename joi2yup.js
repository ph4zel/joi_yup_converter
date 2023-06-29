module.exports = (data, var_name, type_name, minify) => {
    let str = data.toString().match(/\{[a-zA-Z 0-9:,/'"`\t\r\n()_.{}]*}/g)[0]
        .replaceAll('Joi.', 'Yup.')
        .replaceAll(/.options[a-zA-Z() {}:]*/g, '')
        .replaceAll('string()', 'string().nullable()')
        .replaceAll('number()', 'number().convert_num().nullable()')
        .replaceAll('date()', 'date().convert_date().nullable()')
        .replaceAll('boolean()', 'boolean().nullable()')
        .replaceAll('array().items', 'array().of')
        .replaceAll(' :', ':')
    let result
    if (minify) {
        str = str
            .replaceAll('\t', '')
            .replaceAll('  ', '')
            .replaceAll('\r\n', '')
        result = `import * as Yup from 'yup';export const ${var_name} = Yup.object(${str});export type ${type_name} = Yup.InferType<typeof ${var_name}>;`
    } else {
        result = `import * as Yup from 'yup';\nexport const ${var_name} = Yup.object(${str});\nexport type ${type_name} = Yup.InferType<typeof ${var_name}>;`
    }
    return result
}