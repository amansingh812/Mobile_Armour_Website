// Guides written for AI answers (AEO), Sprint 5, Oct 2026.
// Template: question title; the excerpt is the direct answer shown in the
// "In short" box; key facts table; question headings that each open with a
// direct answer; "Q:" FAQ block (becomes FAQPage schema); sources linked.
// Facts only from Apple support pages, the owner, or our own stock.
import type { BlogPost } from './blog-posts';

const P = '/products/';

export const guidePosts2026: BlogPost[] = [
  {
    slug: 'is-it-worth-replacing-iphone-battery',
    metaDescription:
      "Replace your iPhone battery below 80% Battery Health: it's far cheaper than a new phone. About 1–2 hours in Heidelberg, 6-month warranty.",
    title: 'Is It Worth Replacing Your iPhone Battery?',
    excerpt:
      'Usually, yes. If your iPhone works well apart from the battery and Battery Health shows below 80% (or says "Service"), a new battery costs far less than a new phone and brings back full-day battery life. At Mobile Armour in Heidelberg it takes about 1–2 hours, with a 6-month warranty.',
    category: 'Repair Tips',
    date: 'October 24, 2026',
    publishedDate: '2026-10-24T09:00:00+11:00',
    author: 'Mobile Armour Team',
    readingTime: 5,
    image: '/img/blog/is-it-worth-replacing-iphone-battery.webp',
    imageAlt: 'Old and new phone batteries side by side on a repair mat',
    keywords: [
      'iphone battery replacement',
      'is it worth replacing iphone battery',
      'iphone battery health 80%',
      'iphone battery replacement heidelberg',
    ],
    tags: ['Battery', 'iPhone', 'Repair Tips'],
    shop: {
      title: 'Keep it charged: power banks and chargers',
      categories: ['Power Banks', 'Wireless Chargers'],
      href: '/shop/power-banks',
      limit: 6,
    },
    content: `
      <table>
        <thead><tr><th>Question</th><th>Short answer</th></tr></thead>
        <tbody>
          <tr><td>When should I replace it?</td><td>When Battery Health is below 80%, shows "Service", or the phone shuts down unexpectedly</td></tr>
          <tr><td>Where do I check?</td><td>Settings &gt; Battery &gt; Battery Health</td></tr>
          <tr><td>How long do batteries last?</td><td>Apple designs iPhone 14 and earlier to keep 80% after 500 full charge cycles, and iPhone 15 models after 1,000</td></tr>
          <tr><td>How long does a replacement take?</td><td>About 1–2 hours at our Warringal kiosk</td></tr>
          <tr><td>Warranty</td><td>6 months on parts and labour</td></tr>
        </tbody>
      </table>

      <h2>How do I know my iPhone battery needs replacing?</h2>
      <p>Check Battery Health first: open Settings, tap Battery, then Battery Health. Below 80% maximum capacity is the usual point to replace it.</p>
      <ul>
        <li><strong>A "Service" or "significantly degraded" message.</strong> Apple says this isn't a safety issue, but you'll notice shorter battery life and slowdowns.</li>
        <li><strong>Unexpected shutdowns,</strong> especially at 20–30% or in cold weather. iOS may then slow the phone to stop it happening again.</li>
        <li><strong>The phone won't last a day</strong> on your normal use.</li>
        <li><strong>A swollen battery:</strong> the screen lifts or the back bulges. Stop charging it and bring it in straight away.</li>
      </ul>

      <h2>Is a new battery better value than a new phone?</h2>
      <p>For most people, yes. A battery replacement costs a fraction of a new iPhone and fixes the most common reason people upgrade.</p>
      <p>It's worth it when the phone still gets iOS updates and nothing else is badly broken. It's less worth it if the phone also needs a screen and back glass, or no longer gets updates; then put that money towards a new phone. We'll tell you honestly which side of the line your phone is on.</p>

      <h2>How long does an iPhone battery replacement take?</h2>
      <p>About 1–2 hours at our kiosk in Warringal Shopping Centre, Heidelberg. Walk in without an appointment and shop while you wait.</p>
      <p>We test the phone before and after, and every battery comes with a <a href="/warranty">6-month warranty</a>. See <a href="/services/iphone-battery-replacement">iPhone battery replacement</a> for the models we cover.</p>

      <h2>Will my iPhone show a message after a battery replacement?</h2>
      <p>It may. On iPhone 11 and later, Settings &gt; General &gt; About has a Parts and Service History section that labels a battery as Genuine or Unknown.</p>
      <p>Apple says an Unknown label doesn't stop you using your iPhone, though it can affect trade-in value. Ask us which battery we're fitting and what it will show before we start.</p>

      <h2>How do I make a new battery last longer?</h2>
      <ol>
        <li>Keep it out of heat: don't leave it on the dashboard or charge it under a pillow.</li>
        <li>Leave Optimised Battery Charging switched on in Settings &gt; Battery.</li>
        <li>Use a good charger and cable; cheap ones run hot.</li>
        <li>Don't let it sit at 0% for long.</li>
      </ol>

      <h2>Frequently asked questions</h2>
      <h3>Q: What battery health percentage should I replace my iPhone battery at?</h3>
      <p>Most people replace it below 80% maximum capacity, which is when Apple considers the battery worn.</p>
      <h3>Q: Does replacing the battery make my iPhone faster?</h3>
      <p>It can. If iOS has been slowing the phone to prevent shutdowns, a new battery removes the need for that.</p>
      <h3>Q: Do I lose my data when the battery is replaced?</h3>
      <p>No, a battery replacement doesn't touch your data. We still recommend an iCloud backup before any repair.</p>
      <h3>Q: Can I wait while you replace it?</h3>
      <p>Yes. It takes about 1–2 hours, so most people shop at Warringal Shopping Centre and come back.</p>

      <p><strong>Sources:</strong> <a href="https://support.apple.com/en-au/101575" rel="noopener" target="_blank">Apple: iPhone battery and performance</a>, <a href="https://support.apple.com/en-us/102658" rel="noopener" target="_blank">Apple: iPhone Parts and Service History</a>.</p>
    `,
  },
  {
    slug: 'lcd-vs-oled-vs-genuine-iphone-screen',
    seoTitle: 'LCD vs OLED vs Genuine iPhone Screen: Which to Choose?',
    metaDescription:
      "Standard LCD, aftermarket OLED or genuine: how the three iPhone replacement screens differ in picture, price and trade-in, and which to choose.",
    title: 'LCD, OLED or Genuine: Which Replacement iPhone Screen Should You Choose?',
    excerpt:
      'Choose an aftermarket OLED for the best value on a phone you’re keeping, a genuine screen if you want the original picture and plan to trade in, and a standard LCD only for a phone you’ll replace soon. At Mobile Armour all three come with a 6-month warranty.',
    category: 'Repair Tips',
    date: 'October 24, 2026',
    publishedDate: '2026-10-24T10:00:00+11:00',
    author: 'Mobile Armour Team',
    readingTime: 6,
    image: '/img/blog/lcd-vs-oled-vs-genuine-iphone-screen.webp',
    imageAlt: 'Three replacement phone screens side by side on a repair bench',
    keywords: [
      'iphone screen replacement',
      'lcd vs oled iphone screen',
      'genuine iphone screen replacement',
      'aftermarket oled iphone screen',
    ],
    tags: ['Screen Repair', 'iPhone', 'Repair Tips'],
    shop: {
      title: 'Protect the new screen',
      categories: ['Screen Protectors'],
      exclude: 'lens|camera',
      href: '/shop/screen-protectors',
      limit: 6,
    },
    content: `
      <table>
        <thead><tr><th></th><th>Standard LCD</th><th>Aftermarket OLED</th><th>Genuine screen</th></tr></thead>
        <tbody>
          <tr><td>Picture</td><td>Good, but blacks look greyish and the panel is thicker</td><td>Close to the original</td><td>Original</td></tr>
          <tr><td>Price</td><td>Lowest</td><td>Middle</td><td>Highest</td></tr>
          <tr><td>Best for</td><td>A phone you'll replace soon</td><td>A phone you're keeping</td><td>Keeping the phone as new, or trading in</td></tr>
          <tr><td>Warranty at Mobile Armour</td><td>6 months</td><td>6 months</td><td>6 months</td></tr>
        </tbody>
      </table>

      <h2>What's the difference between LCD and OLED iPhone screens?</h2>
      <p>OLED screens light each pixel on its own, so blacks are truly black; LCD screens use a backlight behind the whole panel. Every iPhone 12, 13, 14, 15, 16 and 17 model came with an OLED screen.</p>
      <p>Putting an LCD into an OLED iPhone works, but the picture looks flatter, blacks look dark grey, and the thicker panel can use a little more battery. That's why we only suggest it for a phone you don't plan to keep for long.</p>

      <h2>Is an aftermarket OLED screen as good as the original?</h2>
      <p>Close, and it costs less. A good aftermarket OLED keeps the deep blacks and sharp colour that make OLED worth having.</p>
      <p>It's the option most people choose for a phone they want to keep for another year or two.</p>

      <h2>Why choose a genuine screen?</h2>
      <p>A genuine screen gives you exactly the picture, brightness and touch the phone shipped with. It costs the most.</p>
      <p>It also matters for trade-ins. On iPhone 11 and later, Settings &gt; General &gt; About shows a Parts and Service History section. Apple labels a display "Genuine" only when the repair used genuine Apple parts and processes; otherwise it shows "Unknown", and Apple says that can affect trade-in value.</p>

      <h2>What problems can a non-genuine screen cause?</h2>
      <p>Apple lists possible issues with non-genuine displays: touch not responding in places, True Tone not working, colour or brightness differences, and extra battery drain.</p>
      <p>A good replacement avoids most of these, and every screen we fit is tested before you leave. If anything isn't right, the <a href="/warranty">6-month warranty</a> covers it.</p>

      <h2>Which screen should I choose?</h2>
      <ol>
        <li><strong>Keeping the phone a while?</strong> Aftermarket OLED.</li>
        <li><strong>Want it exactly as new, or trading in later?</strong> Genuine.</li>
        <li><strong>Upgrading in a few months?</strong> Standard LCD.</li>
      </ol>
      <p>We explain all three options and their prices before we start, for your exact model. See <a href="/services/iphone-screen-repair">iPhone screen repair</a> or call us for a quote.</p>

      <h2>Frequently asked questions</h2>
      <h3>Q: Does a non-genuine screen stop my iPhone working?</h3>
      <p>No. Apple says the Parts and Service History messages don't affect your ability to use the iPhone.</p>
      <h3>Q: Will Face ID still work after a screen replacement?</h3>
      <p>Yes, when the screen is replaced carefully. Face ID sensors stay in the phone; we check Face ID before handing it back.</p>
      <h3>Q: Do all screen options have the same warranty?</h3>
      <p>Yes. LCD, aftermarket OLED and genuine screens all carry our 6-month warranty.</p>
      <h3>Q: How long does an iPhone screen replacement take?</h3>
      <p>Most take about 1–2 hours at our Warringal Shopping Centre kiosk.</p>

      <p><strong>Sources:</strong> <a href="https://support.apple.com/en-us/103256" rel="noopener" target="_blank">Apple: About genuine iPhone displays</a>, <a href="https://support.apple.com/en-us/102658" rel="noopener" target="_blank">Apple: iPhone Parts and Service History</a>.</p>
    `,
  },
  {
    slug: 'privacy-vs-clear-vs-matte-screen-protector',
    metaDescription:
      "Clear glass for the sharpest picture, privacy glass for public transport, matte for glare. How each screen protector type works and which to get.",
    title: 'Privacy, Clear or Matte: Which Screen Protector Should You Get?',
    excerpt:
      'Get clear glass for the sharpest picture, privacy glass if you read messages on public transport, and matte if glare and fingerprints bother you most. All three protect against scratches and cracks equally; what differs is how the screen looks.',
    category: 'Accessories',
    date: 'October 24, 2026',
    publishedDate: '2026-10-24T11:00:00+11:00',
    author: 'Mobile Armour Team',
    readingTime: 4,
    image: '/img/blog/privacy-vs-clear-vs-matte-screen-protector.webp',
    imageAlt: 'Phone with a privacy screen protector looking dark from the side on a cafe table',
    keywords: [
      'privacy screen protector',
      'privacy vs clear screen protector',
      'matte screen protector',
      'best screen protector iphone 17',
    ],
    tags: ['Screen Protectors', 'Accessories', 'iPhone'],
    shop: {
      title: 'Privacy, clear and full-coverage glass',
      categories: ['Screen Protectors'],
      exclude: 'lens|camera',
      href: '/shop/screen-protectors',
    },
    content: `
      <table>
        <thead><tr><th></th><th>Clear</th><th>Privacy</th><th>Matte</th></tr></thead>
        <tbody>
          <tr><td>Picture</td><td>Sharpest, as the phone intended</td><td>Slightly dimmer straight on</td><td>Slightly softer, less glossy</td></tr>
          <tr><td>From the side</td><td>Fully visible</td><td>Looks dark</td><td>Fully visible</td></tr>
          <tr><td>Glare and fingerprints</td><td>Shows both</td><td>Shows both</td><td>Reduces both</td></tr>
          <tr><td>Best for</td><td>Photos, video, most people</td><td>Trains, trams, open-plan offices</td><td>Bright light, gaming</td></tr>
        </tbody>
      </table>

      <h2>Which screen protector protects best?</h2>
      <p>Tempered glass of any finish protects about the same; the finish changes how the screen looks, not how well it survives a drop.</p>
      <p>What matters more is fit: glass cut for your exact model covers edge to edge and lines up with the front camera. A "9H" label refers to a pencil scratch test, not a promise it won't crack.</p>

      <h2>How does a privacy screen protector work?</h2>
      <p>A micro-louvre layer only lets light through straight ahead, so from the side the screen looks dark. Straight on, you see it normally but a little dimmer.</p>
      <p>Most people turn brightness up a notch. It's ideal if you often read messages or banking apps in public. See our <a href="/shop/screen-protectors/privacy">privacy screen protectors</a>.</p>

      <h2>Is a matte screen protector worth it?</h2>
      <p>If glare or fingerprints bug you, yes. The etched surface scatters reflections and hides smudges.</p>
      <p>The trade-off is a slightly grainy, softer picture. Photographers and people who watch a lot of video usually prefer clear.</p>

      <h2>Should I just get clear glass?</h2>
      <p>For most people, yes. Clear tempered glass keeps the screen looking exactly as designed and costs the least.</p>
      <p>Browse <a href="/shop/screen-protectors">screen protectors in stock</a>, including <a href="/shop/brand/lito">LITO</a> glass, or shop by phone: <a href="/shop/screen-protectors/iphone-17-pro-max">iPhone 17 Pro Max</a>, <a href="/shop/screen-protectors/iphone-17-pro">iPhone 17 Pro</a>.</p>

      <h2>Frequently asked questions</h2>
      <h3>Q: Does Face ID work with a privacy screen protector?</h3>
      <p>Yes. Glass made for your model is cut around the front camera and Face ID sensors.</p>
      <h3>Q: Can people next to me see my screen with privacy glass?</h3>
      <p>Not from the side. Someone directly behind you, looking straight at the screen, still can.</p>
      <h3>Q: Do I need a lens protector too?</h3>
      <p>It's worth it on phones with large camera bumps, which take the first hit when the phone lands face-up.</p>
      <h3>Q: Where can I buy screen protectors in Heidelberg?</h3>
      <p>At Mobile Armour, Kiosk 4, Warringal Shopping Centre. You can compare clear and privacy glass in person.</p>
    `,
  },
  {
    slug: 'which-iphone-17-pro-max-case',
    metaDescription:
      "MagSafe, heavy-duty, clear or wallet: how to choose an iPhone 17 Pro Max case, with examples in stock at Warringal Shopping Centre, Heidelberg.",
    title: 'Which iPhone 17 Pro Max Case Should You Buy?',
    excerpt:
      'Get a MagSafe (magnetic) case if you use MagSafe chargers or car mounts, a heavy-duty case if you drop your phone often, a clear case to show off the colour, or a wallet case to carry cards. Make sure it’s made for the 17 Pro Max: other models’ cases won’t fit.',
    category: 'Accessories',
    date: 'October 24, 2026',
    publishedDate: '2026-10-24T12:00:00+11:00',
    author: 'Mobile Armour Team',
    readingTime: 5,
    image: '/img/blog/which-iphone-17-pro-max-case.webp',
    imageAlt: 'Clear, heavy-duty, leather wallet and magnetic silicone phone cases laid out side by side',
    keywords: [
      'iphone 17 pro max case',
      'best iphone 17 pro max case',
      'iphone 17 pro max magsafe case',
      'iphone 17 pro max case heidelberg',
    ],
    tags: ['Cases', 'iPhone 17 Pro Max', 'Accessories'],
    shop: {
      title: 'iPhone 17 Pro Max cases',
      categories: ['Cases'],
      models: ['iPhone 17 Pro Max'],
      href: '/shop/cases/iphone-17-pro-max',
      limit: 9,
    },
    content: `
      <table>
        <thead><tr><th>Case type</th><th>Choose it if…</th><th>Watch out for</th></tr></thead>
        <tbody>
          <tr><td>MagSafe (magnetic)</td><td>You use MagSafe chargers, wallets or car mounts</td><td>Non-magnetic cases still charge wirelessly, but accessories won't stick</td></tr>
          <tr><td>Heavy-duty</td><td>You drop your phone or work on site</td><td>Bulkier in a pocket</td></tr>
          <tr><td>Clear</td><td>You want to show the phone's colour</td><td>Some clear plastics yellow with age</td></tr>
          <tr><td>Wallet</td><td>You want cards and phone in one</td><td>Thicker; the flap gets in the way of photos</td></tr>
        </tbody>
      </table>

      <h2>Will an iPhone 16 Pro Max case fit the iPhone 17 Pro Max?</h2>
      <p>No. The iPhone 17 Pro Max has a different shape and a camera bar that runs across the back, so cases for older models won't fit properly.</p>
      <p>Always buy a case listed for the iPhone 17 Pro Max. Every case on our <a href="/shop/cases/iphone-17-pro-max">iPhone 17 Pro Max cases</a> page is.</p>

      <h2>Should I get a MagSafe case?</h2>
      <p>If you use any magnetic accessory, yes. A MagSafe case has a ring of magnets built in, so chargers, wallets and car mounts snap on through the case.</p>
      <p>Examples we stock: the <a href="${P}redefyne-liquid-silicone-case-with-magnetic-ring-6add9c8cb512815c1881f710">REDEFYNE Liquid Silicone Case with Magnetic Ring</a> (slim, soft-touch) and the <a href="${P}iphone-17-pro-max-rebound-magsafe-kickstand-case-6908c79c9cb2acee49e100d8">Rebound MagSafe Kickstand Case</a> (stands up for video).</p>

      <h2>Which case is best for drops?</h2>
      <p>A heavy-duty case with raised edges around the screen and camera bar, and thick corners.</p>
      <p>Look at the <a href="${P}iphone-17-pro-max-redefine-shield-heavy-duty-magnetic-case-690a3f86e85b1a96832b6fd5">REDEFINE Shield Heavy Duty</a> or the <a href="${P}iphone-17-pro-max-armor-xtreme-kevlar-magnetic-case-690894dae3235c120d5c8c5b">Armor Xtreme Kevlar</a>; both are also magnetic. Pair it with <a href="/shop/screen-protectors/iphone-17-pro-max">glass for the 17 Pro Max</a>: a case can't protect the front from a face-down drop.</p>

      <h2>Which clear case should I get?</h2>
      <p>Pick a clear case with a hard back and soft edges for the best mix of protection and clarity.</p>
      <p>Options include the <a href="${P}iphone-17-pro-max-redefine-metal-lens-transparent-magnetic-case-6908d579e85b1a96832b6fc4">REDEFINE Metal Lens Transparent</a> (magnetic), the <a href="${P}iphone-17-pro-max-hybrid-clear-acrylic-tpu-case-6908cf6f9cb2acee49e100e9">Hybrid Clear Acrylic</a> and the softer <a href="${P}iphone-17-pro-max-mercury-soft-feeling-jelly-case-690a462ee85b1a96832b6ff4">Mercury Jelly</a>.</p>

      <h2>Is a wallet case worth it?</h2>
      <p>If you want to leave your wallet at home, yes. The trade-off is thickness.</p>
      <p>The <a href="${P}iphone-17-pro-max-hanman-2-in-1-magnetic-leather-wallet-case-detachable-flip-690a41c2e85b1a96832b6fdb">Hanman 2-in-1 Leather Wallet</a> detaches from its flip cover. For a card holder without a full wallet, see the <a href="${P}iphone-17-pro-max-mercury-goospery-rail-card-holder-case-690a4330e85b1a96832b6fe3">Mercury Rail Card Holder Case</a>.</p>

      <h2>Frequently asked questions</h2>
      <h3>Q: Do iPhone 17 Pro and 17 Pro Max cases fit each other?</h3>
      <p>No. The Pro Max is larger, so each needs its own case.</p>
      <h3>Q: Can I try a case on before I buy?</h3>
      <p>Yes. Bring your phone to Mobile Armour at Warringal Shopping Centre, Heidelberg, and try any case in stock.</p>
      <h3>Q: Will a MagSafe charger work through a non-magnetic case?</h3>
      <p>It will charge if the case is thin enough, but it won't hold in place. A magnetic case fixes that.</p>
      <h3>Q: What if I'm not sure which iPhone I have?</h3>
      <p>Check Settings &gt; General &gt; About, or bring the phone to our kiosk and we'll match the case for you.</p>

      <p><em>Products named were in stock when this guide was written; see the <a href="/shop/cases/iphone-17-pro-max">current range</a>.</em></p>
    `,
  },
];
