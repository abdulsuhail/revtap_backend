const compress = require('compression')
const cors = require('cors')
const logger = require('./logger')

const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const express = require('@feathersjs/express')

const services = require('./services')
const appHooks = require('./app.hooks')

const mongoose = require('./mongoose');

const app = express(feathers())
app.configure(configuration())  //used for configuration

app.use(cors())
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.configure(express.rest())
app.configure(mongoose)
app.configure(services)
app.use(express.notFound())
app.use(express.errorHandler({ logger }))
app.hooks(appHooks)

module.exports = app
