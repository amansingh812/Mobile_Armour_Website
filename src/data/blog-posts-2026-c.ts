// Content Batch C (1 Nov 2026): refurbished phone guides written for AI
// answers (AEO), supporting /refurbished-phones. Same template as Batch B:
// question title; excerpt = direct answer; key facts table; question headings
// that open with the answer; "Q:" FAQ block (FAQPage schema).
// Shop facts from the owner (1 Nov 2026): graded, fully checked, 6-month
// warranty (we fix any problem), most models available to suit the budget,
// no prices online. Phone facts from Apple and Samsung specs and support pages.
import type { BlogPost } from './blog-posts';

const R = '/refurbished-phones';
const TAGS = ['Refurbished Phones'];

export const guidePostsBatchC: BlogPost[] = [
  {
    slug: 'is-a-refurbished-iphone-worth-it',
    seoTitle: 'Is a Refurbished iPhone Worth It? Yes, If You Buy It Right',
    metaDescription:
      'Usually yes: a refurbished iPhone costs much less than new and works the same. Buy from a shop that tests it, shows battery health and gives a warranty.',
    title: 'Is a Refurbished iPhone Worth It?',
    excerpt:
      'Usually, yes. A refurbished iPhone costs much less than a new one and, if it has been properly tested, works the same. The key is where you buy it: choose a shop that checks every function, tells you the battery health and condition grade, and gives you a warranty. A recent model (iPhone 13 or newer) gives you years of use.',
    category: 'Refurbished Phones',
    date: 'November 1, 2026',
    publishedDate: '2026-11-01T10:00:00+11:00',
    author: 'Mobile Armour Team',
    readingTime: 5,
    image: '/img/blog/is-a-refurbished-iphone-worth-it.webp',
    imageAlt: 'Refurbished smartphone with a green tested tick and a full battery icon',
    keywords: ['is a refurbished iphone worth it', 'refurbished iphone', 'buy refurbished iphone', 'refurbished iphone melbourne'],
    tags: TAGS,
    content: `
      <table>
        <thead><tr><th>Question</th><th>Short answer</th></tr></thead>
        <tbody>
          <tr><td>Does it work like new?</td><td>Yes, if every function has been tested</td></tr>
          <tr><td>Biggest thing to check</td><td>Battery health and a warranty</td></tr>
          <tr><td>Best-value models</td><td>iPhone 13 to iPhone 15</td></tr>
          <tr><td>Where to buy</td><td>A shop that tests, grades and guarantees it</td></tr>
        </tbody>
      </table>

      <h2>Why buy a refurbished iPhone instead of new?</h2>
      <p>Mainly price. A refurbished iPhone costs much less than the same model new, and a one- or two-year-old iPhone is still fast and gets the same iOS updates. It also keeps a working phone in use instead of in a drawer or landfill.</p>

      <h2>What's the catch?</h2>
      <p>The risk is buying one that hasn't been checked properly: a worn battery, a replaced part that doesn't work well, or a phone still linked to someone else's Apple ID. That's why <strong>where</strong> you buy matters more than <strong>which</strong> refurbished iPhone you buy.</p>

      <h2>What should a good refurbished iPhone come with?</h2>
      <ul>
        <li><strong>A full function test:</strong> screen, touch, Face ID, cameras, speakers, microphones, buttons, charging, signal, Wi-Fi and Bluetooth.</li>
        <li><strong>Battery health you can see:</strong> in Settings &gt; Battery &gt; Battery Health. Ask before you pay.</li>
        <li><strong>A condition grade:</strong> so you know how it looks before you see it.</li>
        <li><strong>Signed out and reset:</strong> Find My must be off and the phone signed out of the previous owner's Apple ID.</li>
        <li><strong>A warranty:</strong> so a fault after you buy is fixed, not your problem.</li>
      </ul>

      <h2>Which refurbished iPhone is the best value?</h2>
      <p>For most people, an <a href="${R}/iphone-13">iPhone 13</a>, <a href="${R}/iphone-14">iPhone 14</a> or <a href="${R}/iphone-15">iPhone 15</a>: fast, great cameras and well within Apple's update support. Choose an <a href="${R}/iphone-15">iPhone 15</a> or newer if you want USB-C. See <a href="/blog/which-refurbished-iphone-should-you-buy">which refurbished iPhone to buy</a> for a model-by-model guide.</p>

      <h2>Is battery health a deal-breaker?</h2>
      <p>It's the most important number. Apple's iPhone batteries are designed to keep most of their capacity for hundreds of charge cycles; a battery that has dropped a lot will need charging more often. A worn battery can be replaced, but you should know before you buy, not after.</p>

      <h2>Frequently asked questions</h2>
      <h3>Q: Is a refurbished iPhone the same as a second-hand one?</h3>
      <p>No. A refurbished iPhone has been tested, graded and reset by a business and comes with a warranty; a second-hand phone is usually sold as-is. See <a href="/blog/refurbished-vs-second-hand-vs-new-phone">refurbished vs second-hand vs new</a>.</p>
      <h3>Q: Will a refurbished iPhone get iOS updates?</h3>
      <p>Yes. A refurbished iPhone gets the same updates as a new one of the same model.</p>
      <h3>Q: Where can I buy a refurbished iPhone in Melbourne?</h3>
      <p>At Mobile Armour in Warringal Shopping Centre, Heidelberg. Every phone is graded and fully checked, with a 6-month warranty: if anything goes wrong, we fix it. <a href="${R}">Ask what's in stock</a>.</p>
    `,
  },
  {
    slug: 'refurbished-vs-second-hand-vs-new-phone',
    seoTitle: 'Refurbished vs Second-Hand vs New Phone: What’s the Difference?',
    metaDescription:
      'Refurbished: tested, graded and reset by a business, with a warranty. Second-hand: sold as-is, usually privately. New: full price, full manufacturer warranty.',
    title: 'Refurbished vs Second-Hand vs New: What’s the Difference?',
    excerpt:
      'A refurbished phone has been tested, graded and reset by a business and comes with a warranty. A second-hand (used) phone is sold as-is, usually privately, with no checks or warranty. A new phone costs the most but comes sealed with the manufacturer’s warranty. Refurbished sits in the middle: a lower price with protection.',
    category: 'Refurbished Phones',
    date: 'November 1, 2026',
    publishedDate: '2026-11-01T11:00:00+11:00',
    author: 'Mobile Armour Team',
    readingTime: 4,
    image: '/img/blog/refurbished-vs-second-hand-vs-new-phone.webp',
    imageAlt: 'Three smartphones side by side, one marked with a tested tick',
    keywords: ['refurbished vs second hand phone', 'refurbished vs new iphone', 'second hand iphone', 'used iphone'],
    tags: TAGS,
    content: `
      <table>
        <thead><tr><th></th><th>New</th><th>Refurbished</th><th>Second-hand</th></tr></thead>
        <tbody>
          <tr><td>Price</td><td>Highest</td><td>Lower</td><td>Often lowest</td></tr>
          <tr><td>Tested</td><td>Factory sealed</td><td>Yes, every function</td><td>Usually not</td></tr>
          <tr><td>Condition known</td><td>New</td><td>Graded</td><td>Seller's word</td></tr>
          <tr><td>Warranty</td><td>Manufacturer</td><td>From the seller</td><td>Usually none</td></tr>
          <tr><td>Account lock risk</td><td>None</td><td>Checked</td><td>Possible</td></tr>
        </tbody>
      </table>

      <h2>What does "refurbished" mean?</h2>
      <p>A refurbished phone is a used phone that a business has inspected, tested, cleaned, signed out of the previous owner's account and reset, and graded on its condition. Faulty parts are fixed before it's sold, and it comes with a warranty from the seller.</p>

      <h2>What's the risk with a second-hand phone?</h2>
      <p>You're relying on the seller. Common problems are a worn battery, a fault that shows up later, a screen that isn't original quality, or a phone still locked to someone's Apple ID or Google account, which makes it unusable. A private sale usually has no warranty.</p>

      <h2>How do I check a phone isn't stolen?</h2>
      <p>Ask for the IMEI number (dial *#06#) and check it hasn't been reported lost or stolen; in Australia, blocked phones won't work on local networks. A reputable refurbisher does this for you.</p>

      <h2>When is new worth the extra?</h2>
      <p>If you want the very latest model on launch day, or you keep phones for many years and want the full manufacturer warranty from day one. For everyone else, a recent refurbished phone gives most of the experience for much less.</p>

      <h2>Frequently asked questions</h2>
      <h3>Q: Is refurbished the same as "renewed" or "pre-owned"?</h3>
      <p>The names vary between sellers. What matters is whether the phone was tested, graded and comes with a warranty, so ask.</p>
      <h3>Q: Do refurbished phones come with a warranty?</h3>
      <p>They should. At Mobile Armour every refurbished phone has a 6-month warranty: if anything goes wrong, we fix it.</p>
      <h3>Q: Where can I see refurbished phones in person?</h3>
      <p>At our kiosk in Warringal Shopping Centre, Heidelberg, open 7 days. See the <a href="${R}">refurbished iPhones and Samsungs</a> we can get.</p>
    `,
  },
  {
    slug: 'refurbished-phone-grades-explained',
    seoTitle: 'Refurbished Phone Grades Explained: A, B, C and What They Mean',
    metaDescription:
      'Refurbished phone grades describe how the phone looks, not how it works. Grade names vary by seller, so ask what each grade means before you buy.',
    title: 'Refurbished Phone Grades Explained',
    excerpt:
      'A refurbished phone’s grade describes its cosmetic condition, not how well it works: a properly refurbished phone should work perfectly in every grade. Sellers use different names, such as A/B/C or Excellent/Good/Fair, so always ask what each grade means. A lower grade means more visible wear and usually a lower price.',
    category: 'Refurbished Phones',
    date: 'November 1, 2026',
    publishedDate: '2026-11-01T12:00:00+11:00',
    author: 'Mobile Armour Team',
    readingTime: 4,
    image: '/img/blog/refurbished-phone-grades-explained.webp',
    imageAlt: 'Back of a smartphone next to A, B and C grade badges and a magnifying glass',
    keywords: ['refurbished phone grades', 'grade a refurbished iphone', 'refurbished phone condition', 'refurbished grade b'],
    tags: TAGS,
    content: `
      <table>
        <thead><tr><th>Common grade</th><th>Typical meaning</th></tr></thead>
        <tbody>
          <tr><td>A / Excellent</td><td>Close to new; hard to see marks</td></tr>
          <tr><td>B / Good</td><td>Light marks on the frame or back</td></tr>
          <tr><td>C / Fair</td><td>Visible wear; works perfectly</td></tr>
        </tbody>
      </table>
      <p><em>Names and definitions vary between sellers; ask what each grade means.</em></p>

      <h2>Does the grade affect how the phone works?</h2>
      <p>It shouldn't. On a properly refurbished phone, the grade only describes how it looks. Every grade should pass the same checks: screen, touch, battery, cameras, speakers, buttons, charging and signal.</p>

      <h2>Which grade should I buy?</h2>
      <p>If you'll use a case anyway, a lower grade saves money and the marks will be hidden. If you want it to look new, or it's a gift, choose the top grade. Marks on the screen matter more than marks on the back, so ask about the screen specifically.</p>

      <h2>Is battery health part of the grade?</h2>
      <p>Usually not: grades are about appearance. Ask for the battery health separately. On an iPhone it's in Settings &gt; Battery &gt; Battery Health; on a Samsung, use the Samsung Members app's diagnostics.</p>

      <h2>How does Mobile Armour grade phones?</h2>
      <p>Every refurbished phone we sell is graded on its cosmetic condition and fully checked, and we tell you the grade before you buy. You can see the phone at the kiosk first, and it comes with a 6-month warranty.</p>

      <h2>Frequently asked questions</h2>
      <h3>Q: Is a grade C phone a bad buy?</h3>
      <p>Not if it's been properly tested. It's the same phone with more visible wear, usually for less.</p>
      <h3>Q: Can I see the phone before buying?</h3>
      <p>At our kiosk, yes. Online, ask for photos and the grade definition.</p>
      <h3>Q: Where can I buy a graded refurbished phone in Melbourne?</h3>
      <p>At Mobile Armour, Warringal Shopping Centre, Heidelberg. <a href="${R}">Ask what's in stock</a>.</p>
    `,
  },
  {
    slug: 'what-to-check-buying-refurbished-samsung',
    seoTitle: 'What to Check When Buying a Refurbished Samsung or Android',
    metaDescription:
      'Check the phone is signed out of Google and Samsung accounts, the screen has no burn-in or lines, battery health, and that you get a warranty.',
    title: 'What to Check When Buying a Refurbished Samsung',
    excerpt:
      'Check four things: the phone is signed out of the previous owner’s Google and Samsung accounts (otherwise it can lock after a reset); the screen has no burn-in, lines or dead spots; the battery is in good health; and the seller gives you a warranty. On an Ultra, check the S Pen; on a Z Flip or Fold, check the hinge and inner screen.',
    category: 'Refurbished Phones',
    date: 'November 1, 2026',
    publishedDate: '2026-11-01T13:00:00+11:00',
    author: 'Mobile Armour Team',
    readingTime: 5,
    image: '/img/blog/what-to-check-buying-refurbished-samsung.webp',
    imageAlt: 'Two Android smartphones being inspected with a magnifying glass',
    keywords: ['refurbished samsung', 'refurbished samsung phones', 'refurbished android phones', 'refurbished samsung s23'],
    tags: TAGS,
    content: `
      <table>
        <thead><tr><th>Check</th><th>Why</th></tr></thead>
        <tbody>
          <tr><td>Google and Samsung accounts removed</td><td>Factory Reset Protection can lock the phone</td></tr>
          <tr><td>Screen on white and grey</td><td>Shows burn-in, lines or dead spots</td></tr>
          <tr><td>Battery health</td><td>A worn battery means more charging</td></tr>
          <tr><td>S Pen (Ultra) / hinge (foldables)</td><td>Model-specific wear</td></tr>
          <tr><td>Warranty</td><td>Covers faults after you buy</td></tr>
        </tbody>
      </table>

      <h2>Why does the Google account matter so much?</h2>
      <p>Android's Factory Reset Protection asks for the previous owner's Google account after a reset. If the seller didn't remove it, the phone can be unusable. Samsung phones can also be linked to a Samsung account. A proper refurbisher signs the phone out of both before selling it.</p>

      <h2>How do I check a Samsung screen?</h2>
      <p>Open a plain white image and then a grey one at full brightness. Look for faint ghost images (burn-in), coloured lines or dark spots. Galaxy phones use AMOLED screens, which look superb but can show burn-in after long use.</p>

      <h2>How do I check battery health on a Samsung?</h2>
      <p>Open the Samsung Members app, go to diagnostics and run the battery status check. Ask the seller to show you before you buy.</p>

      <h2>Which refurbished Samsung is best value?</h2>
      <p>A <a href="${R}/samsung-galaxy">Galaxy S23 or S24</a> suits most people. The S24 and newer include Galaxy AI, and Samsung has promised seven years of updates for the Galaxy S24 series onwards, so they have plenty of life left. An A series phone is the lowest-cost option.</p>

      <h2>Frequently asked questions</h2>
      <h3>Q: Are refurbished Samsung phones unlocked?</h3>
      <p>They should be signed out of all accounts. Ask about network locks for the specific phone.</p>
      <h3>Q: Do you sell refurbished Google Pixel phones too?</h3>
      <p>Yes, alongside Samsung and iPhone. Ask what we have.</p>
      <h3>Q: Where can I buy a refurbished Samsung in Melbourne?</h3>
      <p>At Mobile Armour, Warringal Shopping Centre, Heidelberg. Every phone is graded, fully checked and has a 6-month warranty. <a href="${R}/samsung-galaxy">See refurbished Samsung Galaxy phones</a>.</p>
    `,
  },
  {
    slug: 'which-refurbished-iphone-should-you-buy',
    seoTitle: 'Which Refurbished iPhone Should You Buy? Model-by-Model Guide',
    metaDescription:
      'iPhone 11 or 12 for the lowest cost, iPhone 13 or 14 for best value, iPhone 15 or 16 for USB-C and Apple Intelligence, iPhone 17 for the newest.',
    title: 'Which Refurbished iPhone Should You Buy?',
    excerpt:
      'For the lowest cost, an iPhone 11 or 12. For the best value, an iPhone 13 or 14. For USB-C, choose an iPhone 15 or newer, and for Apple Intelligence an iPhone 15 Pro, any iPhone 16 or newer. For the newest features, an iPhone 17. Within each generation, the Pro models add a better screen and camera.',
    category: 'Refurbished Phones',
    date: 'November 1, 2026',
    publishedDate: '2026-11-01T14:00:00+11:00',
    author: 'Mobile Armour Team',
    readingTime: 5,
    image: '/img/blog/which-refurbished-iphone-should-you-buy.webp',
    imageAlt: 'Four smartphones in a row from smallest to largest',
    keywords: ['which refurbished iphone to buy', 'best refurbished iphone', 'refurbished iphone 13', 'refurbished iphone 15'],
    tags: TAGS,
    content: `
      <table>
        <thead><tr><th>If you want…</th><th>Choose</th></tr></thead>
        <tbody>
          <tr><td>The lowest cost</td><td><a href="${R}/iphone-11">iPhone 11</a> or <a href="${R}/iphone-12">iPhone 12</a></td></tr>
          <tr><td>The best value</td><td><a href="${R}/iphone-13">iPhone 13</a> or <a href="${R}/iphone-14">iPhone 14</a></td></tr>
          <tr><td>USB-C charging</td><td><a href="${R}/iphone-15">iPhone 15</a> or newer</td></tr>
          <tr><td>Apple Intelligence</td><td>iPhone 15 Pro / Pro Max, <a href="${R}/iphone-16">iPhone 16</a> or newer</td></tr>
          <tr><td>The newest</td><td><a href="${R}/iphone-17">iPhone 17</a> family</td></tr>
        </tbody>
      </table>

      <h2>What's the cheapest refurbished iPhone worth buying?</h2>
      <p>The <a href="${R}/iphone-11">iPhone 11</a> is usually the lowest-cost iPhone with Face ID and a good dual camera, and a popular first phone. The <a href="${R}/iphone-12">iPhone 12</a> adds 5G, an OLED screen and MagSafe for a little more.</p>

      <h2>Which is the best-value refurbished iPhone?</h2>
      <p>The <a href="${R}/iphone-13">iPhone 13</a>: the A15 chip is still quick and every model has an OLED screen. The <a href="${R}/iphone-14">iPhone 14 Pro</a> adds the Dynamic Island, Always-On display and a 48MP camera.</p>

      <h2>Should I get one with USB-C?</h2>
      <p>If you'd like one cable for your phone, laptop and iPad, yes: the <a href="${R}/iphone-15">iPhone 15</a> was the first iPhone with USB-C. Every iPhone 15 model also has the Dynamic Island and a 48MP main camera.</p>

      <h2>Which refurbished iPhones have Apple Intelligence?</h2>
      <p>The iPhone 15 Pro and 15 Pro Max, every <a href="${R}/iphone-16">iPhone 16</a> model and the <a href="${R}/iphone-17">iPhone 17</a> family. The standard iPhone 15 and 15 Plus don't support it.</p>

      <h2>Pro or standard?</h2>
      <p>The Pro models add a smoother ProMotion screen (from the iPhone 13 Pro) and a telephoto camera. If you mostly message, browse and take everyday photos, the standard model is the better value.</p>

      <h2>Frequently asked questions</h2>
      <h3>Q: How much storage should I get?</h3>
      <p>128GB suits most people. Choose 256GB or more if you shoot a lot of video or keep many photos on the phone; storage can't be added later.</p>
      <h3>Q: Is a refurbished iPhone 11 still OK in 2026?</h3>
      <p>For calls, messages, photos and everyday apps, yes. For 5G or longer life ahead, look at an iPhone 12 or 13.</p>
      <h3>Q: Where can I buy a refurbished iPhone near Heidelberg?</h3>
      <p>At Mobile Armour, Warringal Shopping Centre. Tell us your budget and we'll tell you the best iPhone we can do. <a href="${R}">Ask what's in stock</a>.</p>
    `,
  },
];
