'use client'

// pages/index.tsx
import { GetServerSideProps } from "next";
import {
  generate_agent,
  answer_question,
  group_answer,
  Customer,
} from "./functions/models";

interface Props {
  individualResponses: { customerName: string; response: string }[];
  groupConversation: string;
}

export default function HomePage({
  individualResponses,
  groupConversation,
}: Props) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Marketing Simulation</h1>

      <h2>Individual Responses</h2>
      {individualResponses.map((item, index) => (
        <div key={index}>
          <h3>{item.customerName}</h3>
          <p>{item.response}</p>
        </div>
      ))}

      <h2>Group Conversation</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{groupConversation}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  // Define customer profiles
  const customerProfiles = [
    {
      name: "Alice",
      description: "A tech-savvy millennial interested in the latest gadgets.",
    },
    {
      name: "Bob",
      description: "A middle-aged professional focused on family and career.",
    },
    {
      name: "Carol",
      description: "An environmentally conscious college student.",
    },
  ];

  // Define the product
  const product =
    "An eco-friendly, smart water bottle that tracks hydration and reminds you to drink water.";

  // Generate agents (customers)
  const customers: Customer[] = await Promise.all(
    customerProfiles.map((profile) =>
      generate_agent(profile.name, profile.description, product)
    )
  );

  // Define the survey question
  const question = "What do you think about this new product?";

  // Collect individual responses
  const individualResponses = await Promise.all(
    customers.map(async (customer) => {
      const response = await answer_question(question, customer);
      return { customerName: customer.name, response };
    })
  );

  // Generate group conversation
  const groupConversation = await group_answer(question, customers);

  // Pass data to the page via props
  return {
    props: {
      individualResponses,
      groupConversation,
    },
  };
};
