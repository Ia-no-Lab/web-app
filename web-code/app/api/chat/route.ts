import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { NextRequest } from 'next/server';

export const maxDuration = 30; 
export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const result = await streamText({
    model: groq('llama-3.3-70b-versatile'),
    messages,
  });

  return result.toDataStreamResponse();
}
