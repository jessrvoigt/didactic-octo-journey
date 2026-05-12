export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { base64, apiKey, focusAreas } = req.body;

  if (!base64 || !apiKey) {
    return res.status(400).json({ error: 'Missing data' });
  }

  const focusPrompt = focusAreas && focusAreas.length > 0
    ? `\n\nIMPORTANT - USER'S FOCUS AREAS: The user has specifically asked you to incorporate these themes/keywords into the names: "${focusAreas}". Weave these into AT LEAST half of the names. These take priority alongside what's in the image.\n`
    : '';

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
        max_tokens: 1500,
        temperature: 1,
        messages: [{
          role: 'user',
          content: [{
            type: 'image',
            source: { type: 'base64', media_type: 'image/jpeg', data: base64 },
          }, {
            type: 'text',
            text: `You are the head namer at Lilly Pulitzer. You name prints with maximum sass, wit, and punniness.

STEP 1: Look at this design carefully. In your head, identify:
- The specific motifs (what flowers, animals, objects, shapes?)
- The dominant colors (be specific - "hot pink" not "pink")
- The mood (tropical, nautical, garden party, beach, cocktail hour?)
- Any unique details (palm trees, shells, lemons, bows, etc.)
${focusPrompt}
STEP 2: Now generate 18-20 names that are DIRECTLY tied to what you actually see in THIS design${focusAreas ? ' AND the user\'s focus areas above' : ''}. Every name must reference a specific element from the image${focusAreas ? ' or the focus areas' : ''}.

Names should be:
- PUN-FORWARD: Wordplay, double meanings, cheeky riffs on what's IN the design
- SASSY: A little flirty, a little ridiculous, very confident
- LILLY PULITZER ENERGY: Think "Boom Boom," "Sippin' n Trippin'," "Pop the Cork," "Cha Cha Cha"
- SPECIFIC: If there are palm trees, the name should reference palms. If there are pink flamingos, reference flamingos. NOT generic.
- DRINKABLE: Many should sound like cocktails, parties, or sunny mischief

Examples of how to tie to imagery:
- Lemons in design → "Squeeze the Day," "Sour Hour," "Zest in Show"
- Palm trees → "Frond of You," "Palm Reader," "Stay Palm"
- Pink/coral → "Pink Slip," "Coral Sass," "Blush Hour"

NO generic florals. NO names that could apply to any preppy print. Make every name SPECIFIC to THIS image${focusAreas ? ' or the focus areas the user specified' : ''}.

Output ONLY a numbered list of 18-20 names. No explanations, no preamble.`,
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
