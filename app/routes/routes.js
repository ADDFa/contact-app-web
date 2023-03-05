import app from "../app.js"
import about from "../Controllers/About.js"
import contact from "../Controllers/Contact.js"
import home from "../Controllers/Home.js"

// TODO: Home
app.get("/", home.index)

// TODO: Contact
app.get("/contact", contact.index)
app.get("/contact/create", contact.create)
app.get("/contact/:id", contact.show)
app.get("/contact/:id/edit", contact.edit)
app.post("/contact", contact.save)
app.put("/contact/:id", contact.update)
app.delete("/contact/:id", contact.delete)

// TODO: About
app.get("/about", about.index)
