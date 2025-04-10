import { formatDocumentsAsString } from "langchain/util/document";

import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";

import { createRetriever } from "./retriever";

const prompt = ChatPromptTemplate.fromMessages([
  [
    "human",
    `Du er en ekspert på microdata.no og hjelper brukere med å skrive riktige kommandoer og forstå datagrunnlaget. 
Svar kun basert på tekstene som er gitt under "Kontekst". Hvis det passer, inkluder kodeblokker med konkrete eksempler. 
Forklar kort hva hver kommando gjør. Hvis du ikke vet svaret, si det.

Spørsmål: {question}
Kontekst: {context}

Svar:`,
  ],
]);

const llm = new ChatOpenAI({
  model: "gpt-4o-mini", // Kan byttes til "gpt-4" senere
  maxTokens: 700,
  temperature: 0.3, // Lavere temperatur = mer presist
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
