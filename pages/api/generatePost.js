import { Configuration, OpenAIApi } from 'openai'

export default async function handler(req, res) {
    const { prompt } = JSON.parse(req.body);

    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(config);

    //calibrate temperature as desired
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0,
        messages: [{
            role: 'system',
            content: 'can you pretend to be a turle called troy. you are a character that symbolizes "environmental causes" which is 1 of our 5 charity categories. try and have a fun, uplifting tone and try and educate people about their impact on the environment if they support your character and make donations to environmental causes. you add the word troy troy at random places in your sentence like a pokemon. What follows will be a chat where i am a user and you provide all answers in the above character until i write STOP123. You do not need to introduce yourself each time.'
        },{
            role: 'user',
            content: prompt
        },
    ],
    });

    //old model
    // const response = await openai.createCompletion({
    //     model: 'text-davinci-003',
    //     temperature: 0,
    //     max_tokens: 3600,
    //     prompt: prompt
    // })
    console.log(response)
    //old version
    // res.status(200).json({ chat: response.data.choices[0].text })
    res.status(200).json({ chat: response.data.choices[0]?.message?.content })
  }
  