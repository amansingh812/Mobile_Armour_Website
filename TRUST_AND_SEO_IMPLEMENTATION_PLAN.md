# Mobile Armour: Trust Signals & Local SEO Implementation Plan

**Document Date:** December 1, 2025  
**Business Context:** Google's 2018 ban on third-party technical support advertising requires alternative digital marketing strategies emphasizing trust, legitimacy, and organic reach.

---

## Executive Summary

This document outlines a prioritized implementation roadmap to strengthen Mobile Armour's online presence through trust signals, structured data, and local SEO optimization. The plan aligns with Google policies and addresses the challenges outlined in the mobile phone repair technician marketing guide.

**Immediate Wins (Already Implemented):**
- ✅ Enhanced LocalBusinessSchema with aggregateRating and Review JSON-LD
- ✅ ReviewBadge component added to hero section (visible trust signal)

**Roadmap:** Quick wins (1–2 days) → Medium efforts (3–7 days) → Strategic long-term (2–4 weeks)

---

## Phase 1: Quick Wins (1–2 Days)

### 1.1 Activate Structured Review Data Collection
**Status:** ✅ Code implemented; Requires real data  
**Effort:** 2–4 hours (wire real reviews source)  
**Files:** `src/components/seo/LocalBusinessSchema.tsx`

**What to do:**
- Currently using placeholder testimonial data for aggregateRating/Review JSON-LD
- Replace hardcoded `reviewData` array with a real source:
  - Option A: Connect to a reviews management API (e.g., Google Reviews API, Trustpilot, or custom DB)
  - Option B: Fetch from a `.ts` file with real customer reviews (near-term solution)
  - Option C: Populate from an admin dashboard where you manually add verified reviews

**Implementation Notes:**
```typescript
// Example: Fetch from real reviews DB/API
const reviewData = await fetchReviewsFromDB(); // Your API endpoint
// OR
import { VERIFIED_REVIEWS } from "@/data/verified-reviews.ts"; // Static file
```

**Expected Outcome:** Google can crawl actual review count & ratings; increases CTR in SERPs.

---

### 1.2 Add FAQ Schema to Service Pages
**Status:** ⏳ Not started  
**Effort:** 3–4 hours  
**Files:** Create `src/components/seo/FAQSchema.tsx` and integrate on service pages

**What to do:**
- Create a reusable FAQSchema component for structured FAQ data
- Add to key pages: `/services`, `/products`, `/about` (or service detail pages)
- Common repair FAQs:
  - "How long does phone repair take?"
  - "Do you offer warranty on repairs?"
  - "What devices do you repair?"
  - "What is your turnaround time for broken screens?"

**Example Schema Structure:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does phone screen repair take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most screen replacements are completed within 2-4 hours."
      }
    }
  ]
}
```

**Expected Outcome:** FAQ snippets appear in Google search results; improves SERP real estate and CTR.

---

### 1.3 Optimize Contact & Location Pages
**Status:** ⏳ Not started  
**Effort:** 2–3 hours  
**Files:** `src/app/contact/page.tsx`, `src/app/about/page.tsx`

**What to do:**
- Ensure Name, Address, Phone (NAP) is visible, crawlable, and **matches exactly** across all pages and schema
- Add schema markup to contact page (Organization + LocalBusiness + PostalAddress)
- Embed a map with address pin
- Add business hours and services offered

**Compliance Check:**
```
Current schema NAP:
✓ Name: "Mobile Armour" (consistent)
✓ Address: "Kiosk 4 Warringal Shopping Centre, Heidelberg, VIC 3084" (exact)
✓ Phone: "+61-XXX-XXX-XXX" (TODO: Update with real phone)
✓ Geo: lat -37.7547, lon 145.0603 (matches Heidelberg)
```

**Expected Outcome:** Correct local search rankings; users find accurate contact details; reduced bounce rate.

---

### 1.4 Create a Visible "Reviews" or "Testimonials" Landing Page
**Status:** ⏳ Not started  
**Effort:** 3–5 hours  
**Files:** Create `src/app/reviews/page.tsx` or use `/about` as testimonials hub

**What to do:**
- Display all verified reviews/testimonials with star ratings
- Add schema markup (Review + AggregateRating)
- Include customer names, dates, and ratings
- Add a CTA: "Leave a Review" button → links to Google Business review form

**Expected Outcome:** Strengthens trust; provides user-generated content for credibility; captures repeat visitors interested in proof.

---

## Phase 2: Medium Efforts (3–7 Days)

### 2.1 Implement Active Review Collection Workflow
**Status:** ⏳ Not started  
**Effort:** 2–3 days  
**Platforms:** Google Reviews, Facebook, Email/SMS campaigns

**What to do:**
1. **Post-repair email flow:**
   - Trigger email 24 hours after repair completion
   - Include direct link to Google Business review form
   - Keep template short and friendly

2. **SMS / In-app prompt:**
   - Display review request on order confirmation page
   - Add pop-up after 5 seconds with "Rate your experience" button

3. **Invoice/Receipt:**
   - Print QR code linking to review form
   - Add small review request text

4. **Incentivize smartly (no paywall):**
   - Do NOT pay for reviews (violates Google policies)
   - Instead: "Leave a review → enter monthly raffle for $50 accessory gift" (compliant)

**Expected Outcome:** Organic review growth; real ratings appear in schema & Google Business; higher trust signals = more local search visibility.

---

### 2.2 Strengthen Local SEO Content Strategy
**Status:** ⏳ Not started  
**Effort:** 3–5 days (content writing + dev)

**What to do:**
1. **Create location-specific landing pages** (if serving multiple suburbs):
   - E.g., `/service-areas/heidelberg`, `/service-areas/ivanhoe`, etc.
   - Unique title/meta: "iPhone Repair in Heidelberg | Mobile Armour"
   - LocalBusiness schema with matching address
   - Local testimonials & photos
   - Internal link from homepage

2. **Optimize service pages with location keywords:**
   - Instead of just: "iPhone Screen Repair"
   - Use: "iPhone Screen Repair in Heidelberg | Fast & Affordable"
   - Include location in first 100 words and headers

3. **Build service + location matrix:**
   - Create unique pages for high-value service + location combos
   - Example: "iPad Battery Replacement in Ivanhoe" (if you serve multiple areas)

4. **Add Trust Content:**
   - "Why Choose Mobile Armour?" — highlight years in business, certified technicians, warranty
   - "Our Repair Process" — build transparency and confidence
   - "FAQs" section with repair timelines, pricing, warranty info

**Expected Outcome:** Rank for local search queries; capture organic traffic from nearby users; establish authority in service categories.

---

### 2.3 Optimize Google Business Profile (GBP)
**Status:** ⏳ Not started (external)  
**Effort:** 1–2 hours setup; ongoing maintenance

**What to do:**
1. **Claim and verify** your Google Business Profile (if not already done)
   - Profile URL: search "Mobile Armour Heidelberg" → click profile
   - Claim ownership and verify via postcard/phone

2. **Optimize GBP listing:**
   - ✅ Business name, address, phone (matches schema)
   - ✅ Hours of operation (24/7? or specific hours?)
   - ✅ Categories: "Mobile Phone Repair", "Phone & Tablet Repair Service"
   - ✅ Services: List specific repairs (Screen Replacement, Battery Replacement, etc.)
   - ✅ Photos: 10–15 high-quality images
     - Shop interior/exterior
     - Technicians at work
     - Customer testimonials with photos
     - Before/after repair photos
   - ✅ Booking link: Add "Request a Quote" or "Call for Booking" CTA
   - ✅ Website link: Points to homepage

3. **Enable Google Posts:**
   - Post weekly/monthly updates: "New iPhone 16 repair kits in stock", "Winter special: 10% off screen repairs"
   - Posts are indexed and help SEO

4. **Monitor & Respond to Reviews:**
   - Respond to ALL reviews within 24 hours (positive & negative)
   - Thank customers, address concerns, invite them to return

**Expected Outcome:** Higher local pack rankings; more phone calls and map clicks; visible proof of active business management.

---

### 2.4 Add Service Schema Markup
**Status:** ⏳ Not started  
**Effort:** 2–3 hours  
**Files:** Create `src/components/seo/ServiceSchema.tsx` and integrate per service page

**What to do:**
- Add schema.org/Service markup for each major repair service
- Include:
  - Service name
  - Description
  - Provider (Mobile Armour)
  - Service area (city/suburb)
  - Price range (or link to pricing page)
  - Availability

**Example:**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "iPhone Screen Repair",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Mobile Armour"
  },
  "areaServed": "Heidelberg, VIC",
  "serviceType": "Mobile Phone Repair",
  "priceRange": "$$"
}
```

**Expected Outcome:** Service pages rank better for "X repair near me" queries; rich snippets appear in SERPs.

---

## Phase 3: Strategic Long-Term (2–4 Weeks)

### 3.1 Explore Google Local Services Ads (Google Guarantee)
**Status:** ⏳ Not started (strategic planning)  
**Effort:** 1 week (research + setup + compliance audit)

**Important Warning:** Do not use Google Guarantee badge unless officially enrolled. Misrepresenting enrollment is a policy violation.

**What to do:**
1. **Assess eligibility:**
   - Business must be verified (✅ you should be)
   - Valid business insurance (check current policy)
   - Background checks on owner/technicians (may be required in AU)
   - Proper licensing if required in your state

2. **Prepare documentation:**
   - Business registration papers
   - Insurance certificates
   - References or testimonials (5–10 existing customers)

3. **Apply for LSA if eligible:**
   - Go to Google Local Services Ads
   - Follow enrollment flow
   - Pay per lead (not per click) — typically $3–$10 per qualified lead in repair industry

4. **If enrolled, add Google Guarantee badge:**
   - Update schema or component to reflect official status
   - Add visible badge to website

**Compliance Notes:**
- Do NOT claim Google certification or Apple/Samsung partnerships unless you have it
- Do NOT use Google Guarantee before approval
- Ad copy must be clear: "We're a Google Guaranteed service provider"

**Expected Outcome:** 
- Increased visibility in local search (above organic results)
- Pay-per-lead model = more predictable customer acquisition cost
- Strong trust signal (Google vets the business)

---

### 3.2 Build Content Marketing Hub
**Status:** ⏳ Not started  
**Effort:** 2–3 weeks (ongoing)

**What to do:**
1. **Create a Blog:**
   - "How to Clean Your Phone Screen Without Damage"
   - "Signs Your Battery Needs Replacement"
   - "Water Damage: Can We Fix It?"
   - "Difference Between OEM and Aftermarket Parts"
   - Target keywords: "iPhone repair tips", "phone maintenance", etc.

2. **Video Content:**
   - Short repair timelapse videos (Instagram Reels / TikTok)
   - FAQ answers (YouTube Shorts)
   - Customer testimonials on camera

3. **SEO Benefits:**
   - Blog posts rank for long-tail keywords
   - Internal links back to service pages
   - Increases site authority and time on site

**Expected Outcome:** 
- Organic traffic growth from educational searches
- Brand recognition in repair niche
- Multiple entry points for organic visitors

---

### 3.3 Implement Advanced Tracking & Analytics
**Status:** ⏳ Not started  
**Effort:** 1–2 days

**What to do:**
1. **Set up Google Analytics 4 (GA4) goals:**
   - Goal: Call button clicked
   - Goal: "Book Repair" form submitted
   - Goal: Page scroll past first section (engagement)

2. **Add UTM parameters to ads/emails:**
   - Track which marketing channel brings best customers
   - Optimize spend accordingly

3. **Monitor schema performance:**
   - Use Google Search Console → Enhancements → Rich Results
   - Track how many pages are showing rich snippets
   - Monitor clicks to reviews page

4. **Conversion tracking:**
   - Set up conversion pixels for calls (if using VoIP)
   - Track repair bookings to ROI

**Expected Outcome:** Data-driven decision making; identify best-performing pages and marketing channels.

---

### 3.4 PPC Strategy & Ad Policy Compliance
**Status:** ⏳ Not started  
**Effort:** Ongoing (1–2 weeks initial setup)

**What to do:**
1. **Consult a Google Ads specialist familiar with:**
   - 3rd-party tech support restrictions (Google's 2018 policy)
   - Allowed ad copy and landing pages
   - Compliance with device manufacturer rules

2. **Create compliant ad copy:**
   - ✅ "Expert iPhone Screen Replacement in Heidelberg"
   - ✅ "Affordable iPad Battery Replacement | Same-day service"
   - ❌ "Apple Certified iPhone Repair" (unless actually certified)
   - ❌ "Official Samsung Repair Center" (unless official partner)

3. **Build compliant landing pages:**
   - Clear service description
   - Pricing (or link to pricing page)
   - Testimonials / proof
   - Local address + phone
   - FAQs about service/turnaround

4. **Bidding strategy:**
   - Focus on local keywords + long-tail
   - Target high-intent keywords: "iPhone screen repair cost", "quick phone repair near me"
   - Avoid generic broad matches in repair category (expensive, low conversion)

**Expected Outcome:** 
- Compliant, high-ROI paid campaigns
- Avoids account suspension due to policy violations
- Consistent customer flow during seasonal demand

---

## Phase 4: Ongoing Maintenance & Growth (Monthly)

### 4.1 Review Monitoring & Response
- Monitor Google Business Profile reviews daily
- Respond to all reviews within 24 hours
- Aim for 4.5+ star average rating

### 4.2 Content Updates
- Add 1–2 new blog posts per month
- Update service pages quarterly with new offerings
- Refresh testimonials / add new customer reviews

### 4.3 Analytics & Performance Reporting
- Monthly review of GA4 conversion metrics
- Analyze top-performing keywords in Google Search Console
- Track GBP insights (views, calls, bookings)

### 4.4 Local Link Building
- Partner with local businesses (referrals)
- Sponsor local events (small charity donations)
- Get mentioned in local directories / community sites

---

## Implementation Priority Matrix

| Initiative | Effort | Impact | Timeline | Status |
|---|---|---|---|---|
| Real review data source | 2–4 hrs | High | Week 1 | ⏳ |
| FAQ Schema | 3–4 hrs | Medium | Week 1 | ⏳ |
| Optimize contact pages | 2–3 hrs | Medium | Week 1 | ⏳ |
| Reviews landing page | 3–5 hrs | High | Week 1–2 | ⏳ |
| Review collection workflow | 2–3 days | Very High | Week 2–3 | ⏳ |
| Local SEO content | 3–5 days | Very High | Week 2–4 | ⏳ |
| GBP optimization | 1–2 hrs | Very High | Week 1 | ⏳ |
| Service Schema | 2–3 hrs | Medium | Week 2 | ⏳ |
| Google Local Services exploration | 1 week | High | Week 3–4 | ⏳ |
| Content marketing blog | 2–3 weeks | Medium | Week 4+ | ⏳ |
| Advanced tracking | 1–2 days | Medium | Week 3 | ⏳ |
| PPC setup + compliance | 1–2 weeks | High | Week 3–4 | ⏳ |

---

## Success Metrics & KPIs

### Short-term (1–3 months)
- ✅ Schema validation: All pages show in Google Rich Results Test
- ✅ Review count: Target 10–15 new verified reviews
- ✅ Organic traffic: +20% increase in organic sessions
- ✅ Local pack visibility: Appear in top 3 for "[service] near Heidelberg"

### Medium-term (3–6 months)
- ✅ Average rating: Maintain 4.5+ stars
- ✅ GBP profile views: +50% from baseline
- ✅ Phone calls from web: +30% attribution to organic/local
- ✅ Organic conversions: +25% from baseline

### Long-term (6–12 months)
- ✅ Monthly organic traffic: +100% YoY
- ✅ Brand recognition: Appear in "best phone repair Heidelberg" searches
- ✅ Review count: 50+ verified reviews
- ✅ LSA eligibility: Applied or enrolled (if strategic fit)

---

## Files & Code Changes

### Already Implemented ✅
1. `src/components/seo/LocalBusinessSchema.tsx` — Enhanced with aggregateRating + Review JSON-LD
2. `src/components/shared/review-badge/ReviewBadge.tsx` — Visible review badge component
3. `src/components/shared/review-badge/review-badge.module.css` — Badge styling
4. `src/components/sections/hero/hero1-slide.tsx` — ReviewBadge integrated into hero

### To Implement (Phase 1)
- [ ] `src/data/verified-reviews.ts` — Real review data source
- [ ] `src/components/seo/FAQSchema.tsx` — FAQ structured data
- [ ] `src/app/reviews/page.tsx` — Reviews landing page
- [ ] Update `src/app/contact/page.tsx` — Add schema, NAP, hours

### To Implement (Phase 2+)
- [ ] Review collection workflow (email/SMS automation)
- [ ] Service schema component
- [ ] Location-specific landing pages
- [ ] Blog/content hub
- [ ] Advanced GA4 setup

---

## Compliance & Policy Notes

✅ **Mobile Armour is compliant if:**
- You do NOT claim Google Certification without enrollment
- You do NOT claim Apple/Samsung partnership without official status
- You use REAL, verified reviews (never fabricated)
- Your NAP is consistent across all channels
- You respond professionally to all customer feedback

❌ **Avoid:**
- Fake reviews or review stuffing
- Misleading "Google Guaranteed" claims
- False certifications
- Spammy local SEO tactics (link farms, PBNs)

---

## Next Steps

1. **Week 1:** Wire real review data → update LocalBusinessSchema
2. **Week 1–2:** Add FAQ Schema, optimize contact pages, create reviews page
3. **Week 2–3:** Implement review collection workflow, start GBP optimization
4. **Week 3–4:** Local content strategy, explore LSA eligibility
5. **Month 2+:** Blog launch, PPC campaigns, ongoing measurement

---

## Questions & Support

- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Google Business Profile Help:** https://support.google.com/business
- **Schema.org Reference:** https://schema.org
- **Local Services Ads:** https://ads.google.com/local-services-ads
- **Google Ads Specialist Referral:** Consult agency experienced in repair/service vertical

---

**Document Version:** 1.0  
**Last Updated:** December 1, 2025  
**Next Review:** January 15, 2026
