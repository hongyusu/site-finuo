// App Router route handler: POST /api/chat
// Proxies the ChatWidget to OpenAI; mirrors the original Vercel function.
import enContent from '../../../src/i18n/en.json';

function buildChinaToursLine() {
  try {
    const tours = enContent?.tourism?.china?.anhuiTours || [];
    if (tours.length) return tours.map((t) => `${t.title} (${t.price})`).join('; ');
  } catch (_) { /* fall through */ }
  return 'Huangshan ¥1,727, Huizhou ¥1,535, Qiyun ¥1,629, Anhui & Jingchuan ¥1,491, '
    + 'Suzhou ¥1,756, Hangzhou ¥1,805, Suzhou-Hangzhou ¥1,846, Shanghai ¥1,842';
}

const SYSTEM_PROMPT = `You are the friendly virtual concierge for Finuo (芬诺), a Helsinki-based travel agency.

Finuo offers:
- Nordic travel: Finland aurora trips, Norway fjords, Iceland, Denmark/Greenland/Faroe Islands
- China tours: 8 curated 3-day itineraries — ${buildChinaToursLine()}
- Helsinki guide: 15 attractions (Cathedral, Suomenlinna, Temppeliaukio, Kauppatori, Oodi, Design District, Löyly, Allas Sea Pool, Esplanadi, Seurasaari, Uspenski, Sibelius, Kiasma, Ateneum, Old Market Hall)
- Day trips: Porvoo, Fiskars Village, Tallinn, Stockholm
- Education: Study abroad in Finland (Helsinki, Aalto, Haaga-Helia, Jyväskylä, Turku), teacher/student training, study tours
- MICE: Conferences in Helsinki (Slush, Habitare, Nordic Business Forum, FinnBuild, EduExpo), team building, hospitality

Contact: booking@finuo.fi · Helsinki, Finland · Trilingual team (Chinese / English / Finnish)

Respond in the user's language (Chinese or English). Keep replies concise — 2-4 sentences. If a question requires booking, a custom quote, or details not in this prompt, suggest emailing booking@finuo.fi.`;

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

export async function POST(request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'Server not configured: missing OPENAI_API_KEY' }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch (_) {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { messages = [], lang = 'en' } = body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: 'messages array is required' }, { status: 400 });
  }

  const trimmed = messages.slice(-20).map((m) => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: String(m.content || '').slice(0, 2000),
  }));

  const systemMessage = {
    role: 'system',
    content: SYSTEM_PROMPT + (lang === 'zh' ? '\n\nThe user prefers Chinese (中文) responses.' : ''),
  };

  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 400,
        temperature: 0.7,
        messages: [systemMessage, ...trimmed],
      }),
    });

    if (!r.ok) {
      const errBody = await r.text();
      let detail;
      try { detail = JSON.parse(errBody).error?.message; } catch (_) { detail = errBody.slice(0, 200); }
      return Response.json({ error: `Upstream LLM error (${r.status})`, detail }, { status: 502 });
    }

    const data = await r.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || '';
    return Response.json({ reply, usage: data.usage });
  } catch (err) {
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
