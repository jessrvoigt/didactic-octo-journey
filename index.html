export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { base64, apiKey } = req.body;

  if (!base64 || !apiKey) {
    return res.status(400).json({ error: 'Missing data' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        temperature: 1,
        messages: [{
          role: 'user',
          content: [{
            type: 'image',
            source: { type: 'base64', media_type: 'image/jpeg', data: base64 },
          }, {
            type: 'text',
            text: `You are the head namer at Lilly Pulitzer. You name prints with maximum sass, wit, and punniness. Your names should make people SMIRK.

Look at this design and generate 18-20 names that are:
- PUN-FORWARD: Wordplay, double meanings, cheeky riffs
- SASSY: A little flirty, a little ridiculous, very confident
- LILLY PULITZER ENERGY: Think "Boom Boom," "Sippin' n Trippin'," "Pop the Cork," "Cha Cha Cha"
- EVOCATIVE: Tied to what's actually in the design (colors, motifs, vibes)
- DRINKABLE: Many should sound like cocktails, parties, or sunny mischief

Examples of the energy I want: "Spritz Happens," "Sandy Cheeks," "Tipsy Tropics," "Reef Wrecked," "Coastal Confessions," "Salty AF," "Knot Your Average"

NO boring florals. NO generic nature names. Make me LAUGH.

Output ONLY a numbered list. No explanations.`,
          }],
        }],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message || 'API error' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
