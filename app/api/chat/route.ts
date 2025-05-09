import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: NextRequest) {
  try {

    const { prompt } = await req.json();
    console.log('Received prompt:', prompt);

    const model = genAI.getGenerativeModel({  model: "gemini-2.0-flash", });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Generated text:', text);

    return NextResponse.json({ response: text });
  } catch (error: unknown) {
    console.error('Error generating response:', error);
    return NextResponse.json({ error: 'Error generating response' }, { status: 500 });
  }
}
