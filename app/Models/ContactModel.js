import { model, Schema } from "mongoose"

const ContactModel = model(
    "contact",
    new Schema({
        name: {
            type: String,
            required: true
        },
        noTelp: {
            type: String,
            required: true
        }
    })
)

export default ContactModel
