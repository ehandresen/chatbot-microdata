## Bruk av `useRag`Hook

### Hook: `useRag`

```ts
import { useRag } from "@/hooks/useRag";
```

Hooken håndterer:

- Lokal `chatHistory`-state (array av meldinger mellom bruker og AI).
- En `ask()`-funksjon som:
  1. Omformulerer spørsmålet hvis det finnes tidligere meldinger (såkalt
     "standalone question")
  2. Sender spørsmålet og historikken til backend via en server action
     (`runRagChain`).
  3. Oppdaterer samtalehistorikken med både spørsmålet og svaret.

### Server Action: `runRagChain`

```ts
export async function runRagChain(question: string, chatHistory: Message[]);
```

Denne funksjonen:

- Konverterer meldinger i `chatHistory` til `BaseMessage`-objekter
  (`HumanMessage` eller `AIMessage`), dette er nødvendig for LangChain.
- Kjører `generationChain.invoke()` med spørsmålet og samtalehistorikken.
- Returnerer AI-svaret som en string.

### Rephrasing med `generateStandaloneQuestionFromHistory`

Dersom det finnes tidligere meldinger (trengs ikke gjøres hvis det er første
melding fra bruker), brukes en ekstra LangChain funksjon til å omformulere
spørsmålet slik at det gir mening på egen hånd. Dette er viktig for å håndtere
oppfølgingsspørsmål som:

> "Hvordan bruker jeg de?"  
> → chatboten vil da forstå hva "de" refererer til basert på tidligere
> meldinger.

### Meldingsformat (`Message`)

Frontend bruker en forenklet `Message`-type:

```ts
type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
};
```

Denne blir konvertert til LangChain sitt `BaseMessage[]` objekt i server
action'en.

## Test Komponent

Har laget en enkel komponent for å demonstrere bruk av `useRag` hooken på
frontend. Du finner den i `components/RagChainTest.tsx`.

Komponenten kjører på `http://localhost:3000/chat` og viser hvordan man:

- Bruker `ask()`-funksjonen for å sende spørsmål
- Viser chat-historikk mellom bruker og bot
