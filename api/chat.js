// Vercel Serverless Function: /api/chat
//
// Proxies chat messages from the ChatWidget to Anthropic's Claude API.
// The API key is read from the ANTHROPIC_API_KEY environment variable
// (set in Vercel project settings → Environment Variables).
//
// To switch to OpenAI: replace the fetch URL, headers, and body shape.

const SYSTEM_PROMPT = `You are the friendly virtual concierge for Finuo (芬诺), a Helsinki-based travel agency.

Finuo offers:
- Nordic travel: Finland aurora trips, Norway fjords, Iceland, Denmark/Greenland/Faroe Islands
- China tours: 8 curated 3-day itineraries (Huangshan, Huizhou, Qiyun, Anhui, Suzhou, Hangzhou, Suzhou-Hangzhou, Shanghai), RMB 1,491–1,846 per person
- Helsinki guide: 15 attractions, 4 day-trip destinations (Porvoo, Fiskars, Tallinn, Stockholm), restaurants near Aalto University, Western fine dining, Chinese restaurants
- Education: Study abroad in Finland (Helsinki, Aalto, Haaga-Helia, Jyväskylä, Turku), teacher/student training, study tours
- MICE: Conferences in Helsinki (Slush, Habitare, Nordic Business Forum, etc.), team building, hospitality

Contact: booking@finuo.fi · Helsinki, Finland · Trilingual team (Chinese / English / Finnish)

Respond in the user's language (Chinese or English). Keep replies concise — 2-4 sentences. If a question requires booking or a custom quote, suggest emailing booking@finuo.fi.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server not configured: missing ANTHROPIC_API_KEY' });
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

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: SYSTEM_PROMPT + (lang === 'zh' ? '\n\nUser prefers Chinese (中文) responses.' : ''),
        messages: trimmed,
      }),
    });

    if (!r.ok) {
      const errBody = await r.text();
      console.error('Anthropic error:', r.status, errBody);
      return res.status(502).json({ error: `Upstream LLM error (${r.status})` });
    }

    const data = await r.json();
    const reply = (data.content || []).map(c => c.text || '').join('').trim();

    return res.status(200).json({ reply, usage: data.usage });
  } catch (err) {
    console.error('Chat handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
