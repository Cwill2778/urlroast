import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req) {
  try {
    const { url, email, audience, tier } = await req.json();
    
    if (!url || !email) {
      return NextResponse.json({ error: 'URL and Email are required' }, { status: 400 });
    }

    const host = req.headers.get('host');
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const domain = `${protocol}://${host}`;
    
    const successUrl = `${domain}/roast?url=${encodeURIComponent(url)}&audience=${encodeURIComponent(audience)}&tier=${encodeURIComponent(tier)}`;

    // Bypass Stripe if no key is provided
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.startsWith('pk_')) {
      console.warn("No valid STRIPE_SECRET_KEY found. Bypassing payment for testing.");
      return NextResponse.json({ url: successUrl });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });

    const isPremium = tier === 'premium';
    const price = isPremium ? 1000 : 200; // $10.00 or $2.00
    const productName = isPremium ? 'Landing Page Roast + Rewrite' : 'Landing Page Roast';
    const description = isPremium 
      ? `Brutally honest AI audit + new optimized copy for ${url}`
      : `Brutally honest AI audit for ${url}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email, // Pre-fill the email!
      metadata: { url, audience, tier },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
              description: description,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: `${domain}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
