"use client";

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';
import './blog-post.css';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: `https://www.mobilearmour.com.au${post.image}`,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mobile Armour',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.mobilearmour.com.au/images/logo.png',
      },
    },
    datePublished: post.publishedDate,
    dateModified: post.modifiedDate || post.publishedDate,
    description: post.excerpt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.mobilearmour.com.au/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.mobilearmour.com.au',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.mobilearmour.com.au/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://www.mobilearmour.com.au/blog/${post.slug}`,
      },
    ],
  };

  // Get related posts from same category
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  // If no same-category posts, get latest posts
  const displayRelatedPosts = relatedPosts.length > 0 
    ? relatedPosts 
    : blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      {/* Schema markup - metadata handled by layout.tsx generateMetadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="blog-post-wrapper">
        {/* Breadcrumb */}
        <div className="breadcrumb-section">
          <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/home1">Blog</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {post.title.length > 50 ? post.title.substring(0, 50) + '...' : post.title}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Blog Post Content */}
        <article className="blog-post-container">
          <div className="container">
            <div className="row">
              {/* Main Content */}
              <div className="col-lg-8">
                <div className="blog-post-content">
                  {/* Post Header */}
                  <header className="post-header">
                    <div className="post-meta">
                      <span className="category">{post.category}</span>
                      <span className="date">{post.date}</span>
                      <span className="reading-time">{post.readingTime} min read</span>
                    </div>
                    <h1 className="post-title">{post.title}</h1>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <div className="author-info">
                      <span className="author-name">By {post.author}</span>
                    </div>
                  </header>

                  {/* Featured Image */}
                  <div className="featured-image">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      width={800}
                      height={450}
                      priority
                      className="img-fluid"
                      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Post Body */}
                  <div className="post-body" dangerouslySetInnerHTML={{ __html: post.content }} />

                  {/* Call to Action */}
                  <div className="post-cta">
                    <h3>Need Professional Mobile Phone Repair?</h3>
                    <p>
                      Visit Mobile Armour in Heidelberg for expert repairs with a 6-month warranty.
                      Same-day service available!
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

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="post-tags">
                      <strong>Tags:</strong>
                      {post.tags.map((tag, index) => (
                        <span key={index} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="col-lg-4">
                <div className="blog-sidebar">
                  {/* Contact Widget */}
                  <div className="sidebar-widget contact-widget">
                    <h4>Need Help Now?</h4>
                    <p>Our repair experts are ready to assist you.</p>
                    <Link href="tel:0405326205" className="sidebar-cta-btn">
                      📞 0405-326-205
                    </Link>
                    <div className="opening-hours">
                      <p>
                        <strong>Mon-Fri:</strong> 9:00 AM - 6:00 PM
                      </p>
                      <p>
                        <strong>Sat:</strong> 9:00 AM - 5:00 PM
                      </p>
                      <p>
                        <strong>Sun:</strong> 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>

                  {/* Related Posts */}
                  <div className="sidebar-widget related-posts">
                    <h4>Related Articles</h4>
                    <ul>
                      {displayRelatedPosts.map((relatedPost) => (
                        <li key={relatedPost.slug}>
                          <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Services Widget */}
                  <div className="sidebar-widget services-widget">
                    <h4>Our Services</h4>
                    <ul>
                      <li>
                        <Link href="/services">Screen Repairs</Link>
                      </li>
                      <li>
                        <Link href="/services">Battery Replacement</Link>
                      </li>
                      <li>
                        <Link href="/services">Water Damage Repair</Link>
                      </li>
                      <li>
                        <Link href="/services">Charging Port Repair</Link>
                      </li>
                      <li>
                        <Link href="/services">Camera Repair</Link>
                      </li>
                    </ul>
                  </div>

                  {/* Location Widget */}
                  <div className="sidebar-widget location-widget">
                    <h4>Visit Us</h4>
                    <address>
                      <strong>Mobile Armour</strong><br />
                      Kiosk 4, Warringal Shopping Centre<br />
                      56 Burgundy Street<br />
                      Heidelberg VIC 3084
                    </address>
                    <Link 
                      href="https://maps.google.com/?q=Warringal+Shopping+Centre+Heidelberg" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="directions-link"
                    >
                      📍 Get Directions
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </div>

      <style jsx>{`
        .blog-post-wrapper {
          padding-top: 120px;
          padding-bottom: 80px;
          background-color: #f8f9fa;
        }
        
        @media (max-width: 767px) {
          .blog-post-wrapper {
            padding-top: 80px;
            padding-bottom: 60px;
          }
        }
      `}</style>
    </>
  );
}
