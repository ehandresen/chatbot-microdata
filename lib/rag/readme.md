# RAG (Retrieval-Augmented Generation)

Denne mappen inneholder logikken for å kjøre RAG på microdata.no sin
brukermanual i PDF-format.

## Hva er en pipeline?

En pipeline beskriver en sekvens av operasjoner, hvor output fra én del går
videre som input til neste. I RAG-sammenheng betyr det at vi setter opp en kjede
(eller "chain") som først henter relevant kontekst via et søk (retrieval), og
deretter sender dette sammen med spørsmålet inn i en språkmodell som genererer
svaret.

## Filstruktur

- `loadPdf.ts` – Laster inn PDF-dokumentet som `Document[]` ved hjelp av
  `PDFLoader` fra `@langchain/community`.
- `splitDocuments.ts` – Deler opp dokumentene i mindre tekstbiter med
  overlapping, klare for vektorisering.
- `vectorization.ts` – Gjør chunkene om til vektorer og lagrer dem i Pinecone.
- `retriever.ts` – Brukes til å søke etter relevante chunks basert på et
  spørsmål.
- `runRagPipeline.ts` – Denne filen setter opp en RAG-pipeline som bruker
  LangChain Expression Language (LCEL) og OpenAI GPT-4o-mini for å svare på
  spørsmål basert på dokumentinnhold hentet fra Pinecone.

## Installasjon

Installer nødvendige pakker:

```bash
npm install @langchain/community @langchain/core pdf-parse
npm install cli-progress @langchain/pinecone @pinecone-database/pinecone
```

## Miljøvariabler

Opprett en `.env`-fil i rotmappen og legg til:

```
PINECONE_API_KEY="pcsk_59JH2s_9QGG7VZFtG45WgXfJtxcD6xB7M11Y9eMiGx8KDzTm13y2pJ7rJUWHUUiLHjYUWm"
PINECONE_INDEX="microdata-docs"
```

## PDF

PDF-filen `brukermanual-no.pdf` ligger i `data/`-mappen.
