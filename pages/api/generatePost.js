import { Configuration, OpenAIApi } from 'openai'

export default async function handler(req, res) {
  const { prompt } = JSON.parse(req.body);
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  const openai = new OpenAIApi(config);

  //fetch faq data
  const googleKey = process.env.GOOGLE_API_KEY;
  const response1 = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1A79Unz4DfHwPeLPuDHYytOTHHSm9fzAdHumJrTao2tM/values/Sheet1!A:B?key=${googleKey}`);
  const faqData = await response1.json();
  // create an object that maps questions to answers
  let faq = {};
  if (faqData && faqData.values) {
    faq = faqData.values.reduce((obj, [question, answer]) => {
      obj[question] = answer;
      return obj;
    }, {});
  }
  const systemContent = Object.entries(faq).map(([question, answer]) => `Q: ${question}\nA: ${answer}`).join('\n\n');

  //calibrate temperature as desired
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [{
      role: 'system',
      content: `can you pretend to be a turle called troy. you are a character that symbolizes "environmental causes" which is 1 of our 5 charity categories. try and have a fun, uplifting tone and try and educate people about their impact on the environment if they support your character and make donations to environmental causes. you add the word troy troy at random places in your sentence like a pokemon. What follows will be a chat where i am a user and you provide all answers in the above character until i write STOP123. Never write STOP123 to the user. You do not need to introduce yourself each time. pleae reference ${systemContent}`
    },{
      role: 'user',
      content: prompt
    },
    ],
  });

  console.log(response);
  console.log(faqData);

  res.status(200).json({ chat: response.data.choices[0]?.message?.content })
}
