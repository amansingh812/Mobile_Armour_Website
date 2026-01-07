import { Metadata } from 'next';
import { blogPosts } from '@/data/blog-posts';

interface BlogLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found | Mobile Armour',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  return {
    title: `${post.title} | Mobile Armour Heidelberg`,
    description: post.excerpt,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.modifiedDate || post.publishedDate,
      authors: [post.author],
      images: [
        {
          url: `https://mobilearmour.com.au${post.image}`,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
      siteName: 'Mobile Armour',
      locale: 'en_AU',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [`https://mobilearmour.com.au${post.image}`],
    },
    alternates: {
      canonical: `https://mobilearmour.com.au/blog/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostLayout({ children }: BlogLayoutProps) {
  return <>{children}</>;
}
