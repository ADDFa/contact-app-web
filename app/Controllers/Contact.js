import ContactModel from "../Models/ContactModel.js"
import controller from "./Controller.js"

function Contact() {
    //
}

Contact.prototype.index = async function (req, res) {
    const contacts = await ContactModel.find()
    return controller.view(res, "contacts/contact", "Contact", { contacts })
}

Contact.prototype.show = async function (req, res) {
    const contact = await ContactModel.findById(req.params.id)
    return controller.view(res, "contacts/detail", "Detail Contact", {
        contact
    })
}

Contact.prototype.create = function (req, res) {
    return controller.view(res, "contacts/create", "Tambah Contact")
}

Contact.prototype.validationSave = function (req, res) {
    //
}

Contact.prototype.save = async function (req, res) {
    await ContactModel.create(req.body)

    return res.redirect("/contact")
}

Contact.prototype.edit = async function (req, res) {
    const contact = await ContactModel.findById(req.params.id)
    return controller.view(res, "contacts/edit", "Ubah Contact", { contact })
}

Contact.prototype.validationUpdate = function (req, res) {
    //
}

Contact.prototype.update = async function (req, res) {
    const result = await ContactModel.updateOne(
        { _id: req.params.id },
        req.body
    )

    return res.json(result)
}

Contact.prototype.delete = async function (req, res) {
    try {
        const response = await ContactModel.deleteOne({ _id: req.params.id })
        return res.status(200).json({
            ok: response.acknowledged,
            deleteCount: response.deletedCount
        })
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}

const contact = new Contact()
export default contact
