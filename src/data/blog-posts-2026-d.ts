// Content Batch D (6 Nov 2026): back glass repair, written for AI answers
// (AEO) and supporting /services/back-glass-replacement. Same template as
// Batch B: question title; excerpt = direct answer; key facts table; question
// headings that open with the answer; "Q:" FAQ block (FAQPage schema).
// Shop facts: back glass for iPhone 8 to iPhone 17 Pro Max, Galaxy and Pixel
// (supplier range); most repairs 24–48 hours; 6-month warranty; aftermarket
// glass has no logo.
import type { BlogPost } from './blog-posts';

const S = '/services/back-glass-replacement';

export const guidePostsBatchD: BlogPost[] = [
  {
    slug: 'cracked-iphone-back-glass-worth-fixing',
    seoTitle: 'Cracked iPhone Back Glass: Is It Worth Fixing? Yes, Usually',
    metaDescription:
      'Usually yes: replacing just the back glass costs far less than a new phone, stops splinters and spreading cracks, and keeps wireless charging working.',
    title: 'Cracked iPhone Back Glass: Is It Worth Fixing?',
    excerpt:
      'Usually, yes. Replacing just the rear glass costs far less than a new phone, stops glass splinters and spreading cracks, and keeps dust and moisture away from the inside. Wireless charging and MagSafe work as before. At Mobile Armour in Heidelberg most back glass repairs take 24–48 hours; the replacement glass is aftermarket, so it has no Apple logo.',
    category: 'Repair Tips',
    date: 'November 6, 2026',
    publishedDate: '2026-11-06T12:00:00+11:00',
    author: 'Mobile Armour Team',
    readingTime: 5,
    image: '/img/blog/cracked-iphone-back-glass-worth-fixing.webp',
    imageAlt: 'Technician lifting shattered back glass off a phone, with a new replacement panel beside it',
    keywords: [
      'cracked iphone back glass',
      'is it worth fixing cracked back glass',
      'iphone back glass repair',
      'iphone back glass replacement',
      'can you use a phone with cracked back glass',
    ],
    tags: ['Back Glass', 'iPhone', 'Repair Tips'],
    shop: {
      title: 'Cases that protect the back',
      categories: ['Cases'],
      match: 'shockproof|rugged|armou?r|bumper|kevlar|drop',
      href: '/shop/cases',
      limit: 8,
    },
    content: `
      <table>
        <thead><tr><th>Question</th><th>Short answer</th></tr></thead>
        <tbody>
          <tr><td>Can just the back glass be replaced?</td><td>Yes, without replacing the phone</td></tr>
          <tr><td>How long does it take?</td><td>Usually 24–48 hours</td></tr>
          <tr><td>Will wireless charging work?</td><td>Yes, it's tested before you collect it</td></tr>
          <tr><td>Will it have the Apple logo?</td><td>No, aftermarket glass has no logo</td></tr>
          <tr><td>Is it safe to leave cracked?</td><td>Not ideal: splinters, spreading cracks, dust</td></tr>
        </tbody>
      </table>

      <h2>Can you replace just the back glass on an iPhone?</h2>
      <p>Yes. A repair shop can replace only the rear glass, so you keep your phone, your screen and everything on it. At Mobile Armour we do it for <a href="${S}">every iPhone from the iPhone 8 to the iPhone 17 Pro Max</a>, and for Samsung Galaxy and Google Pixel phones too.</p>

      <h2>Is it safe to keep using a phone with cracked back glass?</h2>
      <p>The phone will usually keep working, but it isn't ideal:</p>
      <ul>
        <li><strong>Splinters:</strong> loose shards can cut your fingers or your pocket.</li>
        <li><strong>Spreading cracks:</strong> every knock makes them bigger, and pieces start to fall out.</li>
        <li><strong>Dust and moisture:</strong> gaps in the glass let them reach the inside of the phone.</li>
        <li><strong>Camera covers:</strong> cracks around the camera bump can reach the lens covers and blur photos.</li>
      </ul>
      <p>A case hides the damage but doesn't seal the cracks.</p>

      <h2>Why does back glass take longer than a screen?</h2>
      <p>On most iPhones the back glass is bonded to the frame. Every piece of broken glass and all the old adhesive have to come off cleanly before the new glass and fresh adhesive go on, without disturbing the parts inside. That's why most back glass repairs take <strong>24–48 hours</strong>, while many screen repairs are done the same day.</p>

      <h2>Will wireless charging and MagSafe still work?</h2>
      <p>Yes. The wireless charging coil sits inside the phone, not in the glass. We test wireless charging, and MagSafe on iPhone 12 and newer, before you collect your phone.</p>

      <h2>Will the new back glass have the Apple logo?</h2>
      <p>No. Replacement back glass from independent repairers is aftermarket and doesn't carry the Apple logo. It matches your model's shape, camera cut-outs and finish. If the logo matters to you, Apple and its authorised service providers also repair back glass; if you have AppleCare+, check your cover first.</p>

      <h2>Is the phone still water resistant afterwards?</h2>
      <p>We fit new adhesive, but no repair outside the factory can guarantee the original water-resistance rating. Treat the phone as not water resistant after any back glass repair.</p>

      <h2>When is it not worth fixing?</h2>
      <p>If the phone is very old, has other faults (a weak battery, a damaged screen) and you were planning to upgrade anyway, the money may be better spent on a <a href="/refurbished-phones">refurbished phone</a>. If the frame is bent, tell us: a bent frame can stop new glass sitting flat.</p>

      <h2>Frequently asked questions</h2>
      <h3>Q: How much does iPhone back glass replacement cost?</h3>
      <p>It depends on the model; newer and larger iPhones cost more. We confirm the price for your phone before we start. See <a href="${S}">back glass replacement</a> or call 0405 326 205.</p>
      <h3>Q: Can you fix both the screen and the back glass?</h3>
      <p>Yes. Ask for a quote for both when you bring it in.</p>
      <h3>Q: Do you replace back glass on Samsung and Pixel phones?</h3>
      <p>Yes, Samsung Galaxy S, Note and A series phones and Google Pixel phones as well as iPhones.</p>
      <h3>Q: Where can I get iPhone back glass replaced near Heidelberg?</h3>
      <p>At Mobile Armour, Kiosk 4, Warringal Shopping Centre, Heidelberg. Every repair has a 6-month warranty. <a href="${S}">Get a back glass quote</a>.</p>
      <h3>Q: How do I stop it cracking again?</h3>
      <p>A case with raised edges and a protective back takes the hit instead of the glass. See the cases below or our <a href="/shop/cases">full range</a>.</p>
    `,
  },
];
