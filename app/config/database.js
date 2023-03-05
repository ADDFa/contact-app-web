import { connect } from "mongoose"

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@first-cluster.9vdd3jq.mongodb.net/?retryWrites=true&w=majority`
connect(uri, {
    dbName: process.env.DB_NAME
})
