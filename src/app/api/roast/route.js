import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { url, audience, tier } = await req.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    if (!process.env.XAI_API_KEY) {
      throw new Error("XAI_API_KEY is not configured.");
    }

    // Attempt to fetch the website content
    let websiteContent = "Could not fetch content. Just roast the idea of a website at this URL.";
    try {
      const pageRes = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (pageRes.ok) {
        const html = await pageRes.text();
        websiteContent = html
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .substring(0, 8000);
      }
    } catch (e) {
      console.warn("Failed to fetch URL directly, falling back to URL-only roast:", e);
    }

    const isPremium = tier === 'premium';
    const targetAudience = audience || 'General Audience';

    let jsonStructure = `
      {
        "brutalTruth": "A short, funny, but brutally honest paragraph about first impressions.",
        "conversionKillers": ["Point 1", "Point 2", "Point 3"],
        "actionableFixes": ["Fix 1", "Fix 2", "Fix 3"],
        "score": 4
    `;

    if (isPremium) {
      jsonStructure += `,
        "rewrittenCopy": {
          "heroHeadline": "A new, high-converting headline",
          "subheadline": "A persuasive subheadline explaining the value",
          "ctaText": "Click-worthy button text"
        }
      `;
    }
    
    jsonStructure += `}`;

    const prompt = `
      I am submitting a landing page for you to roast. 
      URL: ${url}
      Target Audience: ${targetAudience}
      Content (Extracted Text): ${websiteContent}

      Judge this page specifically on how well it converts the Target Audience (${targetAudience}).
      If it's terrible for that audience, tear it apart.

      Please provide your audit in JSON format with exactly the following structure:
      ${jsonStructure}
      
      Make it funny, insightful, and ensure the JSON is valid and raw (no markdown formatting blocks like \`\`\`json).
    `;

    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are a brutally honest, slightly hilarious, and highly expert Conversion Rate Optimization (CRO) auditor.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "grok-2-latest",
        stream: false,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`xAI API Error: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    let responseText = data.choices[0].message.content;
    
    // Clean up potential markdown formatting block if Grok returns it anyway
    responseText = responseText.replace(/^\\s*\`\`\`json/m, '').replace(/\`\`\`\\s*$/m, '').trim();

    const parsedData = JSON.parse(responseText);

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('Roast error:', error);
    return NextResponse.json({ error: 'Failed to generate roast', details: error.message }, { status: 500 });
  }
}
