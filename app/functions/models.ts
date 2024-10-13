import OpenAI from "openai";

const openai = new OpenAI();

export interface Message {
  role: string;
  content: string | null;
}

export interface Customer {
  name: string;
  history: Message[];
}

export async function llm_call(query: string, history: any = []) {
  history.push({ role: "user", content: query });
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: query }],
  });
  const response = completion.choices[0].message.content;
  history.push({ role: "assistant", content: response });
  return response;
}

export async function generate_agent(
  name: string,
  description: string,
  product: string
) {
  const prompt = `Generate a system prompt for an agent with the following description:\n${description}\n\n
  This agent a person named ${name} who represents a potential consumer who will provide feedback on the desirability of this new product:\n${product}\n\n.`;
  return await llm_call(prompt);
}

export async function answer_question(question: string, customer: Customer) {
  const prompt = `You are: \n${customer.name}\n Answer the following survey question relating to the product in a conversational way: \n${question}\n\n`;
  return await llm_call(prompt, customer.history);
}

export async function group_answer(question: string, group: Customer[]) {
  let conversation: string = `Admin: Start a group conversation where you discuss the following topic or question:\n${question}\n\n`;

  for (let customer of group) {
    const prompt =
      conversation +
      `\nAs ${customer.name} add to the conversation. Your response should be a short paragraph (your response should be your response without your name).\n${customer.name}: `;
    const response = await llm_call(prompt, customer.history);
    conversation += customer.name + ": " + response + "\n\n";
  }

  return conversation;
}