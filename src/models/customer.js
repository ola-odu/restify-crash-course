const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

const Customer = new mongoose.model('Customer', customerSchema)

module.exports = Customer;