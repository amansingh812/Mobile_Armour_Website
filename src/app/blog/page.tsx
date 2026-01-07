import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog-posts';
import Breadcrumb from '@/components/sections/breadcrumb/breadcrumb';
import './blog-index.css';

export const metadata: Metadata = {
  title: 'Mobile Repair Blog | Tips & Guides | Mobile Armour Heidelberg',
  description: 'Expert mobile repair tips, guides, and tutorials from Mobile Armour Heidelberg. Learn about iPhone repair, Samsung fixes, battery care, and more.',
  keywords: [
    'mobile repair tips',
    'phone repair guide',
    'iPhone repair tips',
    'Samsung repair guide',
    'smartphone maintenance',
    'phone care tips',
    'mobile armour blog',
  ],
  openGraph: {
    title: 'Mobile Repair Blog | Mobile Armour Heidelberg',
    description: 'Expert mobile repair tips, guides, and tutorials. Learn how to care for your smartphone and when to seek professional help.',
    type: 'website',
  },
};

export default function BlogIndexPage() {
  return (
    <div className="blog-index-wrapper">
      <Breadcrumb title="Blog" />
      
      <section className="blog-section section-padding">
        <div className="container">
          {/* Header */}
          <div className="section-header text-center">
            <span className="section-subtitle">Expert Tips & Guides</span>
            <h1 className="section-title">Mobile Repair Blog</h1>
            <p className="section-description">
              Learn from Heidelberg's mobile repair experts. Get tips on phone maintenance, 
              repair guides, and know when to seek professional help.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="row blog-grid">
            {blogPosts.map((post) => (
              <div key={post.slug} className="col-lg-4 col-md-6 col-12 blog-card-wrapper">
                <article className="blog-card">
                  <Link href={`/blog/${post.slug}`} className="blog-card-link">
                    <div className="blog-card-image">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        width={400}
                        height={250}
                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                      />
                      <span className="blog-card-category">{post.category}</span>
                    </div>
                    <div className="blog-card-content">
                      <div className="blog-card-meta">
                        <span className="date">{post.date}</span>
                        <span className="reading-time">{post.readingTime} min read</span>
                      </div>
                      <h2 className="blog-card-title">{post.title}</h2>
                      <p className="blog-card-excerpt">{post.excerpt}</p>
                      <span className="read-more">Read Article →</span>
                    </div>
                  </Link>
                </article>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="blog-cta">
            <h3>Need Professional Mobile Repair?</h3>
            <p>
              Don't wait for problems to get worse. Visit Mobile Armour in Heidelberg 
              for expert diagnosis and same-day repairs with a 6-month warranty.
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="btn btn-primary">
                Book a Repair
              </Link>
              <Link href="tel:0405326205" className="btn btn-outline">
                Call 0405-326-205
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
