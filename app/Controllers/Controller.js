function Controller() {
    //
}

Controller.prototype.view = function (res, page, title, options = {}) {
    const data = {
        page,
        title,
        ...options
    }

    return res.render("layouts/template", data)
}

const controller = new Controller()
export default controller
