import { notFound } from 'next/navigation';
import { categories } from '@/data/categories';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  
  // Find the category based on the slug
  const category = categories.find(cat => 
    cat.link === `/category/${slug}`
  );

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-gray-600">
            Discover our premium collection of {category.name.toLowerCase()} for your mobile devices
          </p>
        </div>

        {/* Placeholder for products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* This would be replaced with actual product components */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md p-6">
              <div className="h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500">Product Image</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Product {item}
              </h3>
              <p className="text-gray-600 mb-4">
                High-quality {category.name.toLowerCase()} for your device
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-orange-600">
                  $29.99
                </span>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Generate static params for all categories
export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.link.split('/').pop(),
  }));
}
