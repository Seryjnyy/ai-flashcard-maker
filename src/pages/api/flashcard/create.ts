import openai from '@/utils/openai';
import type { NextApiRequest, NextApiResponse } from 'next'

// receive user data, ask chatgpt, return data to user

type Data = {
    name: string
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    console.log("api called ")
    console.log(req.body)

    if(JSON.parse(req.body).length == 0){
      console.log("no uh")
    }else{
      console.log("you got it chief")
    }

    // const chatCompletion = await openai.createChatCompletion({
    //     model: "gpt-3.5-turbo",
    //     messages: [{ role: "user", content: "Hello AI" }],
    // });
    // console.log(JSON.parse(chatCompletion.data.choices[0].message?.content));


    // TODO : this is a bit odd
    // res.status(200).json(JSON.parse(chatCompletion.data.choices[0].message?.content))

    let fs = [
        {
          question: 'What is the difference between hashing and encryption?',
          answer: 'Hashing is one way and produces a fixed length hashed text, while encryption can be reversed and produces a different output each time.'
        },
        {
          question: "Why can't you get the original text from a hashed value?",
          answer: 'Hashing is one way, meaning it cannot be reversed to obtain the original text.'
        },
        {
          question: 'What is salting in regards to hashing passwords?',
          answer: 'Salting involves adding a random string to the password before hashing to randomize the output and increase security.'
        },
        {
          question: 'Why is salting important for password security?',
          answer: 'Salting makes it harder for hackers to use a cracked password to access other accounts.'
        },
        {
          question: 'What are brute force hacking and dictionary attacks?',
          answer: 'Brute force hacking involves trying every possible combination of characters to crack a password, while dictionary attacks involve using a pre-existing list of commonly used passwords.'
        },
        {
          question: 'What is the recommendation from experts for keeping passwords secure?',
          answer: 'The recommendations from experts include updating software, using a password manager, and creating strong passwords.'
        },
        {
          question: 'What is the benefit of using a password manager?',
          answer: 'A password manager will generate strong passwords and remember them for you, increasing security and preventing the need for you to remember multiple passwords.'
        }
      ]

    timeout(4000)

    console.log("returning new data, meaning GPT call")
    res.status(200).json({cards: [...fs], prompt:"something ahhh"})

}