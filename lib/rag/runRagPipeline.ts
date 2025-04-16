import { formatDocumentsAsString } from "langchain/util/document";

import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";

import { createRetriever } from "./retriever";

const prompt = ChatPromptTemplate.fromMessages([
  [
    "human",
    `Du er en ekspert på microdata.no og hjelper brukere med å skrive riktige kommandoer og forstå datagrunnlaget. 
Svar kun basert på tekstene som er gitt under "Kontekst". Hvis det passer, inkluder kodeblokker med konkrete eksempler. 
Forklar kort hva hver kommando gjør. Hvis du ikke vet svaret, si det.
Kontekst: {context}
`,
  ],
  new MessagesPlaceholder("chat_history"),
  ["human", "{question}"],
]);

const llm = new ChatOpenAI({
  model: "gpt-4o-mini", // Kan byttes til "gpt-4" senere
  maxTokens: 700,
  temperature: 0.3, // Lavere temperatur = mer presist
  streaming: true,
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
    chat_history: (input) => input.chat_history,
  },
  prompt,
  llm,
  outputParser,
]);

const standaloneQuestionPrompt =
  "Gitt en samtalehistorikk og det nyeste spørsmålet fra brukeren, som kan referere til tidligere kontekst, formuler en standalone question, altså et spørsmål som gir mening uten samtalehistorikken. IKKE svar på spørsmålet, bare omformuler det hvis nødvendig, ellers returner det som det er.";

const rephraseQuestionPrompt = ChatPromptTemplate.fromMessages([
  ["system", standaloneQuestionPrompt],
  new MessagesPlaceholder("chat_history"),
  ["human", "{question}"],
]);

const generateStandaloneQuestion = RunnableSequence.from([
  rephraseQuestionPrompt,
  llm,
  outputParser,
]);

export { generationChain, generateStandaloneQuestion };
