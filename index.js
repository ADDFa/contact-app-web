import app from "./app/app.js"

// TODO: set views
app.set("views", `${process.cwd()}/app/views`)
app.set("view engine", "ejs")

// TODO: Running App
import "./app/bootstrap.js"
