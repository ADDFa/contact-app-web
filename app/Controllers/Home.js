import controller from "./Controller.js"

function Home() {
    //
}

Home.prototype.index = function (req, res) {
    return controller.view(res, "index", "Home")
}

const home = new Home()

export default home
