import dotenv from 'dotenv'
import puppeteerScript from './services/GPTPrompter'
import express from 'express'
import cors from 'cors'
dotenv.config()

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: '*'
  })
)

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/gpt', async (req, res) => {
  const email = process.env.EMAIL_SECRET
  const password = process.env.PASSWORD_SECRET
  const prompt = req.body.prompt
  ;('')
  try {
    if (!email || !password) {
      throw new Error('No Provider credentials found')
    }

    const ppt = await puppeteerScript(email, password, prompt)
  } catch (error) {
    console.error('Error:', error)
  }
})

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})
