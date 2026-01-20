import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    if(!req.body) throw new Error("No request body");
    if(!genAI) throw new Error("No Api Key")

    const { messages, fullPrompt } = await req.json();

  //  console.log("recieved messages" ,messages);
   console.log("recieved inputs:" ,fullPrompt);
   

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", });

    const formattedHistory = messages.map((msg: { from: string; text: string }) => ({
      role: msg.from === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const chat = model.startChat({history: formattedHistory});

    const resultStream = await chat.sendMessageStream(fullPrompt)


    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async pull(controller){

        for await (const chunk of resultStream.stream) {
          const text = chunk.text()
          if(text){
            controller.enqueue(encoder.encode(text))
          }
        }
        controller.close()
      }
    })
  
    return new NextResponse(stream, {
      headers: {
        'content-type': "text/plain; charset=utf-8",
        'transfer-Encoding': 'chunked'
      }
    })
  } catch (error: unknown) {
    console.error('Error generating response:', error);
    return NextResponse.json({ error: 'Error generating response' }, { status: 500 });
  }
}
