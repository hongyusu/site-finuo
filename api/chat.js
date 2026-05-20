// Vercel Serverless Function: /api/chat
//
// Proxies chat messages from the ChatWidget to OpenAI's chat completions API.
// The API key is read from the OPENAI_API_KEY environment variable
// (set in Vercel project settings → Environment Variables).

const SYSTEM_PROMPT = `You are the friendly virtual concierge for Finuo (芬诺), a Helsinki-based travel agency.

Finuo offers:
- Nordic travel: Finland aurora trips, Norway fjords, Iceland, Denmark/Greenland/Faroe Islands
- China tours: 8 curated 3-day itineraries (Huangshan ¥1,727, Huizhou ¥1,535, Qiyun ¥1,629, Anhui & Jingchuan ¥1,491, Suzhou ¥1,756, Hangzhou ¥1,805, Suzhou-Hangzhou ¥1,846, Shanghai ¥1,842)
- Helsinki guide: 15 attractions (Cathedral, Suomenlinna, Temppeliaukio, Kauppatori, Oodi, Design District, Löyly, Allas Sea Pool, Esplanadi, Seurasaari, Uspenski, Sibelius, Kiasma, Ateneum, Old Market Hall)
- Day trips: Porvoo, Fiskars Village, Tallinn, Stockholm
- Restaurants: Aalto-area convenience (Konnikiwa, Minmax, Sway), Western fine dining (Palace, Olo, Nokka, Demo, Goodwin, Zetor, Kappeli, Ragu), Chinese (Jinguanting, Ravintola Liu, Happy Food Garden, Dongbei House, Leaf)
- Education: Study abroad in Finland (Helsinki, Aalto, Haaga-Helia, Jyväskylä, Turku), teacher/student training, study tours
- MICE: Conferences in Helsinki (Slush, Habitare, Nordic Business Forum, FinnBuild, EduExpo), team building, hospitality

Contact: booking@finuo.fi · Helsinki, Finland · Trilingual team (Chinese / English / Finnish)

Respond in the user's language (Chinese or English). Keep replies concise — 2-4 sentences. If a question requires booking, a custom quote, or details not in this prompt, suggest emailing booking@finuo.fi.`;

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server not configured: missing OPENAI_API_KEY' });
  }

  const { messages = [], lang = 'en' } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  // Trim to last 20 messages to keep cost predictable
  const trimmed = messages.slice(-20).map(m => ({
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
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 400,
        temperature: 0.7,
        messages: [systemMessage, ...trimmed],
      }),
    });

    if (!r.ok) {
      const errBody = await r.text();
      console.error('OpenAI error:', r.status, errBody.slice(0, 500));
      // Surface the OpenAI error code/message in dev to make debugging easier
      let detail;
      try { detail = JSON.parse(errBody).error?.message; } catch (_) { detail = errBody.slice(0, 200); }
      return res.status(502).json({ error: `Upstream LLM error (${r.status})`, detail });
    }

    const data = await r.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || '';

    return res.status(200).json({ reply, usage: data.usage });
  } catch (err) {
    console.error('Chat handler error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
