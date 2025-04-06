import path from 'path';
import { fileURLToPath } from 'url';

import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { Document } from '@langchain/core/documents';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Her konstruerer vi absolutt sti uansett hvor scriptet kjøres fra:
const pdfPath = path.resolve(__dirname, "../../data/brukermanual-no.pdf");

export async function loadPdf(): Promise<Document[]> {
  const loader = new PDFLoader(pdfPath, {
    splitPages: true, // eller false om du vil ha ett langt dokument
  });

  const pdf = await loader.load();

  console.log(`${pdf.length} pages loaded`);
  return pdf;
}

async function main() {
  const rawPdf = await loadPdf();
  console.log(rawPdf);
}

main();
