import express from "express"

const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
    console.log(`load http://localhost:${port} in a browser`)
})

export default app
