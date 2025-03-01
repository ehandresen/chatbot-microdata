// Denne filen har som ansvar å laste data inn i databasen (Supabase).
// Vi skal 'scrape' data fra dokumentasjonen til microdata.no og lagre dette i databasen.

import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createClient } from "@supabase/supabase-js";
import { OpenAI } from "openai";

import "dotenv/config";

// Sjekk enviorment variablene så typescript slutter å klage
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_API_KEY) {
  throw new Error(
    "Missing environment variables: SUPABASE_URL or SUPABASE_API_KEY"
  );
}

// Hent environment variabler
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseApiKey = process.env.SUPABASE_API_KEY;
const openaiApiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: openaiApiKey });

// Sider vi ønsker å scrape
const microdataDocs = [
  // Brukermanual

  // 1. Om brukergrensesnittet
  "https://microdata.no/manual/brukermanual/Om%20brukergrensesnittet/",
  "https://microdata.no/manual/brukermanual/Om%20brukergrensesnittet/1.1%20Kommandovinduet",
  "https://microdata.no/manual/brukermanual/Om%20brukergrensesnittet/1.2%20Variabler%20og%20variabelbeskrivelser",
  "https://microdata.no/manual/brukermanual/Om%20brukergrensesnittet/1.3%20Kommandolinjen",
  "https://microdata.no/manual/brukermanual/Om%20brukergrensesnittet/1.4%20Nyttige%20kommandoer",
  "https://microdata.no/manual/brukermanual/Om%20brukergrensesnittet/1.5%20Skriptvinduet",
  "https://microdata.no/manual/brukermanual/Om%20brukergrensesnittet/1.5.1%20Lage%20skript",
  "https://microdata.no/manual/brukermanual/Om%20brukergrensesnittet/1.5.2%20Lagre%20arbeids%C3%B8kter%20i%20kommandovinduet%20som%20skript",
  "https://microdata.no/manual/brukermanual/Om%20brukergrensesnittet/1.5.3%20Kj%C3%B8ring%20av%20skript",
  "https://microdata.no/manual/brukermanual/Om%20brukergrensesnittet/1.5.4%20Kj%C3%B8re%20deler%20av%20et%20skript",
  "https://microdata.no/manual/brukermanual/Om%20brukergrensesnittet/1.5.5%20Fordeler%20ved%20bruk%20av%20skripteditor",
  "https://microdata.no/manual/brukermanual/Om%20brukergrensesnittet/1.5.6%20Organisering%20av%20kommandoskript",
  "https://microdata.no/manual/brukermanual/Om%20brukergrensesnittet/1.5.7%20Probleml%C3%B8sninger%20ved%20bruk%20av%20skript",
  "https://microdata.no/manual/brukermanual/Om%20brukergrensesnittet/1.6%20Eksport%20av%20resultater",

  // 2. Oppretting og endring av datasett
  "https://microdata.no/manual/brukermanual/2.1%20Opprette%20datasett",
  "https://microdata.no/manual/brukermanual/2.2%20Endre%20datasett",
  "https://microdata.no/manual/brukermanual/2.3%20Slette%20datasett",
  "https://microdata.no/manual/brukermanual/2.4%20Kopiere%20datasett",
  "https://microdata.no/manual/brukermanual/2.5%20Importere%20datasett",
  "https://microdata.no/manual/brukermanual/2.6%20Eksportere%20datasett",
  "https://microdata.no/manual/brukermanual/2.7%20Flette%20datasett",
  "https://microdata.no/manual/brukermanual/2.8%20Dele%20datasett",
  "https://microdata.no/manual/brukermanual/2.9%20Datasett%20historikk",
  "https://microdata.no/manual/brukermanual/2.10%20Gjenopprette%20datasett",
  "https://microdata.no/manual/brukermanual/2.11%20Datasett%20innstillinger",
  "https://microdata.no/manual/brukermanual/2.12%20Datasett%20metadata",
  "https://microdata.no/manual/brukermanual/2.13%20Datasett%20tilgang",
  "https://microdata.no/manual/brukermanual/2.14%20Datasett%20sikkerhet",

  // 3. Tilrettelegging av variabler
  "https://microdata.no/manual/brukermanual/3.1%20Opprette%20variabler",
  "https://microdata.no/manual/brukermanual/3.2%20Endre%20variabler",
  "https://microdata.no/manual/brukermanual/3.3%20Slette%20variabler",
  "https://microdata.no/manual/brukermanual/3.4%20Kopiere%20variabler",
  "https://microdata.no/manual/brukermanual/3.5%20Importere%20variabler",
  "https://microdata.no/manual/brukermanual/3.6%20Eksportere%20variabler",
  "https://microdata.no/manual/brukermanual/3.7%20Flette%20variabler",
  "https://microdata.no/manual/brukermanual/3.8%20Dele%20variabler",
  "https://microdata.no/manual/brukermanual/3.9%20Variabel%20historikk",
  "https://microdata.no/manual/brukermanual/3.10%20Gjenopprette%20variabler",

  // 4. Hvordan gjøre seg kjent med variabler
  "https://microdata.no/manual/brukermanual/4.1%20Tabulate%20-%20frekvenstabeller",
  "https://microdata.no/manual/brukermanual/4.1.1%20Enveis%20frekvenstabeller",
  "https://microdata.no/manual/brukermanual/4.1.2%20Flerdimensjonale%20frekvenstabeller",
  "https://microdata.no/manual/brukermanual/4.2%20Summarize%20og%20boxplot%20-%20statistikk%20for%20metriske%20variabler",
  "https://microdata.no/manual/brukermanual/4.3%20Hexbin%20-%20anonymiserte%20plotdiagrammer",
  "https://microdata.no/manual/brukermanual/4.4%20Histogram%20-%20visualisering%20av%20fordelinger",
  "https://microdata.no/manual/brukermanual/4.5%20Barchart%20-%20s%C3%B8ylediagrammer",
  "https://microdata.no/manual/brukermanual/4.6%20Piechart%20-%20kakediagrammer",
  "https://microdata.no/manual/brukermanual/4.7%20Sankey%20-%20flytdiagrammer",

  // 5. Avansert analyse
  "https://microdata.no/manual/brukermanual/5.1%20Regresjonsanalyse",
  "https://microdata.no/manual/brukermanual/5.2%20Logistisk%20regresjon",
  "https://microdata.no/manual/brukermanual/5.3%20Overlevelsesanalyse",
  "https://microdata.no/manual/brukermanual/5.4%20Tid%20serie%20analyse",
  "https://microdata.no/manual/brukermanual/5.5%20Multippel%20korrespondanseanalyse",
  "https://microdata.no/manual/brukermanual/5.6%20Klyngeanalyse",
  "https://microdata.no/manual/brukermanual/5.7%20Faktoranalyse",
  "https://microdata.no/manual/brukermanual/5.8%20Diskriminantanalyse",
  "https://microdata.no/manual/brukermanual/5.9%20Kan%20analyse",
  "https://microdata.no/manual/brukermanual/5.10%20Beslutningstreanalyse",
  "https://microdata.no/manual/brukermanual/5.11%20Nevrale%20nettverk",
  "https://microdata.no/manual/brukermanual/5.12%20Stokastisk%20frontier%20analyse",
  "https://microdata.no/manual/brukermanual/5.13%20Data%20envelopment%20analyse",
  "https://microdata.no/manual/brukermanual/5.14%20Paneldata%20analyse",
  "https://microdata.no/manual/brukermanual/5.15%20Bayesiansk%20analyse",
  "https://microdata.no/manual/brukermanual/5.16%20Spatial%20analyse",
  "https://microdata.no/manual/brukermanual/5.17%20Tekstanalyse",
  "https://microdata.no/manual/brukermanual/5.18%20Sentiment%20analyse",
  "https://microdata.no/manual/brukermanual/5.19%20Anomalideteksjon",
  "https://microdata.no/manual/brukermanual/5.20%20Assosiasjonsregel%20læring",
  "https://microdata.no/manual/brukermanual/5.21%20Sekvens%20læring",
  "https://microdata.no/manual/brukermanual/5.22%20Forsterkende%20læring",
  "https://microdata.no/manual/brukermanual/5.23%20Dimensjonsreduksjon",
  "https://microdata.no/manual/brukermanual/5.24%20Feature%20engineering",
  "https://microdata.no/manual/brukermanual/5.25%20Modell%20evaluering",
  "https://microdata.no/manual/brukermanual/5.26%20Modell%20utvalg",
  "https://microdata.no/manual/brukermanual/5.27%20Modell%20tuning",
  "https://microdata.no/manual/brukermanual/5.28%20Modell%20implementering",
  "https://microdata.no/manual/brukermanual/5.29%20Modell%20vedlikehold",
  "https://microdata.no/manual/brukermanual/5.30%20Modell%20stabilitet",
  "https://microdata.no/manual/brukermanual/5.31%20Modell%20robusthet",
  "https://microdata.no/manual/brukermanual/5.32%20Modell%20forklarbarhet",
  "https://microdata.no/manual/brukermanual/5.33%20Modell%20etikk",
  "https://microdata.no/manual/brukermanual/5.34%20Modell%20bias",

  // 6. Bindinger og løkker
  "https://microdata.no/manual/brukermanual/6.1%20Bindinger",
  "https://microdata.no/manual/brukermanual/6.2%20Løkker",
];

const supabaseClient = createClient(supabaseUrl, supabaseApiKey);

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500, // Høyere verdi gir mer context, lavere verdi gir mer nøyaktighet
  chunkOverlap: 50, // 10-20% av chunkSize er en bra tommelfingerregel
});

const loadSampleData = async () => {
  // Looper gjennom alle sidene
  for (const url of microdataDocs) {
    const content = await scrapePage(url);
    const chunks = await splitter.splitText(content);

    // https://platform.openai.com/docs/guides/embeddings
    for await (const chunk of chunks) {
      const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: chunk,
        encoding_format: "float", // Returner embeddings som floats
      });

      const vector = embedding.data[0].embedding;

      const res = await supabaseClient.from("documents").insert({
        embedding: vector,
        content: chunk,
      });
      console.log(res);
    }
  }
};

// Bruker PuppeteerWebBaseLoader til å scrape data fra nettsidene
const scrapePage = async (url: string) => {
  const loader = new PuppeteerWebBaseLoader(url, {
    launchOptions: {
      headless: true,
    },
    gotoOptions: {
      waitUntil: "domcontentloaded",
    },
    evaluate: async (page, browser) => {
      const result = await page.evaluate(() => document.body.innerHTML);
      await browser.close();
      return result;
    },
  });

  return (await loader.scrape())?.replace(/<[^>]*>?/gm, ""); // Fjerner HTML tags fra teksten
};

loadSampleData();
