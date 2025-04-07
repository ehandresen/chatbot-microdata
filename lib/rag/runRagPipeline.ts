import { formatDocumentsAsString } from "langchain/util/document";

import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";

import { createRetriever } from "./retriever";

const prompt = ChatPromptTemplate.fromMessages([
  [
    "human",
    `Du er en assistent som skal svare på spørsmål basert på hentet kontekst. Bruk følgende tekstbiter fra dokumentene til å svare på spørsmålet. Hvis du ikke vet svaret, si at du ikke vet. Svar med maks tre setninger og hold svaret kort og presist.
    Spørsmål: {question}
    Kontekst: {context}
    Svar:`,
  ],
]);

const llm = new ChatOpenAI({
  model: "gpt-4o-mini", // GPT-4o-mini er det billigste valget per token og gir samtidig god ytelse for korte, fokuserte svar. https://platform.openai.com/docs/models/gpt-4o-mini
  maxTokens: 500, // maxTokens har en 'hard max limit'. 500 bør være nok for 3 setninger.
  // temperature: 1, // Verdi fra 0-2
  // topP: 1, // Verdi fra 0-1
});

const outputParser = new StringOutputParser();

const retriever = await createRetriever();

const retrievalChain = RunnableSequence.from([
  (input) => input.question,
  retriever,
  formatDocumentsAsString,
]);

const generationChain = RunnableSequence.from([
  {
    question: (input) => input.question,
    context: retrievalChain,
  },
  prompt,
  llm,
  outputParser,
]);

export { generationChain };
