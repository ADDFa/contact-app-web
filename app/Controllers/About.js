import controller from "./Controller.js"

function About() {
    //
}

About.prototype.index = function (req, res) {
    return controller.view(res, "about", "About")
}

const about = new About()
export default about
