import express from "express"
import app from "../app.js"

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))
