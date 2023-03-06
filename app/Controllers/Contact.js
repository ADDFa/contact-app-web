import { checkSchema, validationResult } from "express-validator"
import { getFlash, setFlash } from "../config/flash.js"
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
    if (flash) console.log(flash)

    controller.view(res, "contacts/create", "Tambah Contact", {
        flash: getFlash()
    })
}

Contact.prototype.getSchema = function () {
    return {
        name: {
            in: "body",
            isLength: {
                options: {
                    min: 4
                },
                errorMessage: "Nama minimal 4 karakter"
            }
        },
        noTelp: {
            in: "body",
            isMobilePhone: {
                options: "id-ID",
                errorMessage: "Masukkan nomor telepon yang valid"
            }
        }
    }
}

Contact.prototype.validationSave = function () {
    return checkSchema(this.getSchema())
}

Contact.prototype.save = async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        setFlash(errors.mapped())
        return res.redirect(301, "/contact/create")
    }

    await ContactModel.create(req.body)
    return res.redirect("/contact")
}

Contact.prototype.edit = async function (req, res) {
    const contact = await ContactModel.findById(req.params.id)
    return controller.view(res, "contacts/edit", "Ubah Contact", {
        contact,
        flash: getFlash()
    })
}

Contact.prototype.validationUpdate = function () {
    return checkSchema(this.getSchema())
}

Contact.prototype.update = async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        })
    }

    const result = await ContactModel.updateOne(
        { _id: req.params.id },
        req.body
    )

    return res.json({
        ok: true,
        result
    })
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
