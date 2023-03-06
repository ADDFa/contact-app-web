import Swal from "sweetalert2"

const gi = (element) => document.getElementById(`${element}`)
const el = (element) => document.querySelector(`${element}`)
const elAll = (element) => Array.from(document.querySelectorAll(`${element}`))

const errorElement = (text) => {
    const span = document.createElement("span")
    span.classList.add("invalid-feedback")
    span.innerText = text

    return span
}

const timer = 1000

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer)
        toast.addEventListener("mouseleave", Swal.resumeTimer)
    }
})

// TODO: Delete Contact
const tableContact = gi("table-contact")

if (tableContact) {
    tableContact.addEventListener("click", ({ target }) => {
        const id = target.getAttribute("id")
        if (!id || id !== "delete-contact") return

        Swal.fire({
            title: "Anda yakin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!"
        }).then((result) => {
            if (!result.isConfirmed) return

            const dataId = target.dataset.id

            fetch(`/contact/${dataId}`, {
                method: "DELETE"
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.ok) {
                        Toast.fire({
                            title: "Success Delete",
                            timer,
                            icon: "success"
                        })

                        setTimeout(() => location.reload(), timer)
                    }
                })
        })
    })
}

// TODO: Update Contact
const updateContactButton = gi("update-contact")

if (updateContactButton) {
    const errorUpdate = (errors) => {
        errors.map((error) => {
            const errorTarget = el(`[name="${error.param}"]`)

            // set invalid
            errorTarget.classList.add("is-invalid")

            // set message error
            errorTarget.parentElement.appendChild(errorElement(error.msg))

            // set value
            errorTarget.value = error.value
        })
    }

    updateContactButton.addEventListener("click", (evt) => {
        evt.preventDefault()

        // remove old invalid
        elAll(".is-invalid").map((element) => {
            element.classList.remove("is-invalid")
        })

        // remove old message
        elAll(".invalid-feedback").map((element) => element.remove())

        const id = location.pathname.split("/").at(-2)
        const body = {}

        new FormData(evt.target.form).forEach(
            (value, key) => (body[key] = value)
        )

        fetch(`/contact/${id}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if (!res.ok) return errorUpdate(res.errors)
                if (res.result.modifiedCount === 0) return

                Toast.fire({
                    title: "Berhasil mengubah contact",
                    icon: "success",
                    timer
                })

                setTimeout(() => (location.href = "/contact"), timer)
            })
    })
}
