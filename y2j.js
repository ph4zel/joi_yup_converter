#!/usr/bin/env node
const fs = require('fs')
const yup2joi = require('./yup2joi')

const helpText = 'y2j [target] [new file] [variable name] [minify (true or false)]';

try {
    const args = process.argv
    args.splice(0, 2)
    if (args.length < 5) {
        console.error(helpText)
        process.exit(1)
    }
    result = yup2joi(fs.readFileSync(args[0]), args[2], args[4] === 'true')

    fs.writeFileSync(args[1], `// *** Powered by yup_joi_converter ***\n// *** github.com/phazel ***\n${result}`)
} catch (e) {
    console.error(e)
}