function Flash() {
    this.flash = undefined
}

Flash.prototype.getFlash = function () {
    return this.flash
}

Flash.prototype.setFlash = function (message) {
    this.flash = message
}

const flash = new Flash()

export const getFlash = () => {
    const value = flash.getFlash()
    flash.setFlash(undefined)
    return value
}
export const setFlash = (message) => flash.setFlash(message)
