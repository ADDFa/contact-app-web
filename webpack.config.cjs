const path = require("path")

const dir = "public/javascript"

module.exports = {
    entry: `./${dir}/src/app.js`,
    mode: "production",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, dir)
    },
    watch: true
}
