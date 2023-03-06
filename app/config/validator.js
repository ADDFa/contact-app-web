import { validationResult } from "express-validator"

function Validator() {
    //
}

Validator.prototype.formatLocation = function () {
    validationResult.withDefaults({
        formatter: () => {
            return
        }
    })
}
