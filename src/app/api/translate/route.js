import { NextResponse } from 'next/server'

// Importa a biblioteca do Google Cloud Translate
const { Translate } = require('@google-cloud/translate').v2;

// Instancia o cliente de tradução com sua chave de API do arquivo .env.local
// Certifique-se de ter um arquivo .env.local com GOOGLE_API_KEY="SUA_CHAVE"
const translate = new Translate({ key: process.env.GOOGLE_API_KEY });

export async function POST(req) {
  try {
    const { q, source = 'en', target = 'pt' } = await req.json();

    if (!q) {
      return NextResponse.json({ error: 'O parâmetro "q" (texto) é obrigatório.' }, { status: 400 });
    }

    // Usa a API do Google para traduzir o texto
    const [translation] = await translate.translate(q, { from: source, to: target });

    // Retorna a tradução em um formato compatível com o frontend
    return NextResponse.json({ translatedText: translation });

  } catch (err) {
    console.error('Erro na API do Google Translate:', err);
    return NextResponse.json({ error: 'Falha ao traduzir o texto.' }, { status: 500 });
  }
}
