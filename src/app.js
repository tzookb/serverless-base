import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

const app = express()
const router = express.Router()

router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(awsServerlessExpressMiddleware.eventContext())

router.get('/', (req, res) => {
  res.send('hello world');
})

app.use('/', router)

export default app;