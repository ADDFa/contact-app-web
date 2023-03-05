import Swal from "sweetalert2"

const gi = (element) => document.getElementById(`${element}`)

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
            const timer = 1000

            fetch(`/contact/${dataId}`, {
                method: "DELETE"
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.ok) {
                        Toast.fire({
                            title: "Success Delete",
                            timer: timer,
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
    updateContactButton.addEventListener("click", (evt) => {
        evt.preventDefault()

        const id = location.pathname.split("/").at(-2)
        const body = {}

        new FormData(evt.target.form).forEach(
            (value, key) => (body[key] = value)
        )
        console.log(body)

        fetch(`/contact/${id}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if (!res.modifiedCount) return
                Toast.fire({
                    title: "Berhasil mengubah contact",
                    icon: "success"
                })
            })
    })
}
