const fs = require('fs')
const joi2yup = require('./joi2yup')
const yup2joi = require('./yup2joi')

const helpText = 'Modes:\n-y, --yup: Convert from Joi to Yup\n-j, --joi: Convert from Yup to Joi\n\n(node) joi_yup_converter [mode] [target] [new file] [variable name] [type name (if --yup)] [minify (true or false)]';

try {
    const args = process.argv
    args.splice(0, 2)

    const yup = args.findIndex(v => v === '-y' || v === '--yup')
    const joi = args.findIndex(v => v === '-j' || v === '--joi')

    let result
    if (yup !== -1) {
        args.splice(yup, 1)
        result = joi2yup(fs.readFileSync(args[0]), args[2], args[3], args[4] === 'true')
    } else if (joi !== -1) {
        args.splice(joi, 1)
        result = yup2joi(fs.readFileSync(args[0]), args[2], args[3] === 'true')
    } else {
        console.error(helpText)
        process.exit(1)
    }
    fs.writeFileSync(args[1], `// *** Powered by yup_joi_converter ***\n// *** github.com/phazel ***\n${result}`)
} catch (e) {
    console.error(e)
}