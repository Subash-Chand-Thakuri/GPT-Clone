import express from 'express';
import * as dotenv from 'dotenv';
import  OpenAI from 'openai';
import cors from 'cors';

dotenv.config({ path: '../.env' });


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req,res)=>{
    res.status(200).send({
        message: 'Hello from CodeX',
    })
})

app.post('/', async (req,res) => {
    console.log(req.body.prompt)
    try{
        const prompt = req.body.prompt;
        console.log(prompt)

        const response = await openai.chat.completions.create({
            messages: [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": `${prompt}`},
        ],
    model: "gpt-3.5-turbo",
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0, 
        });

        res.status(200).send({
            bot: response.choices[0].message['content']
        })

        // console.log(response.choices[0].message['content']);

    }catch(error){
        console.log(error);
        res.status(500).send({error})
    }
})

app.listen(5000, () => {
    console.log('Server is running on the port http://localhost:5000');
})
