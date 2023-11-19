import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'

import { listener, mongo } from './services/app.service.js'
import { AuthRoutes, UserRoutes, PostRoutes, ProjectRoutes, TagRoutes } from './routes/app.routes.js'


/**
 * Create dotenv
 */

dotenv.config()


/**
 * Connect MongoDB
 */

mongo.strict()
mongo.connect()


/**
 * Create Express app
 */

const app = express()

app.listen(process.env.PORT, (error) => listener(error))

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))


/**
 * Routes
 */

app.use('/', AuthRoutes)
app.use('/user', UserRoutes)
app.use('/post', PostRoutes)
app.use('/project', ProjectRoutes)
app.use('/tag', TagRoutes)
