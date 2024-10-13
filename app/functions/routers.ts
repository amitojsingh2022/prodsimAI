import { NextRequest, NextResponse } from "next/server";
import { llm_call, generate_agent, answer_question, group_answer } from "@/app/functions/models";
import { Message, Customer } from "@/app/functions/models";

export async function GET(request: NextRequest) {
  // Define the agent's description
  const n1 = 'Alice';
  const d1 = `
  Age: 30
  Gender: Female
  Occupation: Doctor
  Interests: Health, Technology, Yoga
  Location: San Francisco
  `;  

  const n2 = 'Bob';
  const d2 = `
  Age: 40
  Gender: Male
  Occupation: Doctor
  Interests: Technology, Medicine
  Location: Saint Louis
  `;

  const product = `
  A new smartwatch that monitors health vitals in real-time and integrates seamlessly with yoga and meditation apps.
  `;

  // Generate the agent's system prompt
  const asp1 = await generate_agent(n1, d1, product);

  // Create the conversation history, starting with the agent's system prompt
  let h1: Message[] = [{ role: 'system', content: asp1 }];
  let c1 = {name: n1, history: h1};

  const asp2 = await generate_agent(n2, d2, product);

  let h2: Message[] = [{ role: 'system', content: asp1 }];
  let c2: Customer = {name: n2, history: h2};

  let customers: Customer[] = [c1, c2];

  const response = await group_answer("How do you feel about the adaptability of this product?", customers)

  console.log(response);

  return NextResponse.json({ message: "Response Generated", response });
}

/*
export async function GET(request: NextRequest) {
  // Define the agent's description
  const description = `
  Age: 30
  Gender: Female
  Occupation: Doctor
  Interests: Health, Technology, Yoga
  Location: San Francisco
  `;

  // Define the product for which the agent will provide feedback
  const product = `
  A new smartwatch that monitors health vitals in real-time and integrates seamlessly with yoga and meditation apps.
  `;

  // Generate the agent's system prompt
  const agent_system_prompt = await generate_agent('John', description, product);

  // Create the conversation history, starting with the agent's system prompt
  let history: Message[] = [{ role: 'system', content: agent_system_prompt }];
  let customer = {name: 'John', history: history}

  // // Define the survey question
  const question = "Answer these 2 questions first. Rank the product from 1 to 10, where 10 means it is the best product and 1 meaning it's the worst product. Second question is, would you be interested in using this product? Why or why not? Give 6 sentence explanation";

  // // Get the agent's answer to the question
  const answer = await answer_question(question, customer);

  // Log the agent's answer (optional)
  console.log("Agent's Answer:", answer);

  // Return the agent's answer in the response
  return new NextResponse(answer, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}
  */