import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from '@/components/store/AddToCartButton';
import { currentPrice, productPath } from '@/lib/products';
import type { ShopProduct } from '@/lib/shop-data';

const fmt = (n: number) => (n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`);

/** "Pairs well with": add-on cards with a one-tap + button. */
export default function PairsWith({ items, device }: { items: ShopProduct[]; device?: string }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="pairs" className="ma-section ma-pairs">
      <div className="ma-shead">
        <h2 id="pairs" className="ma-h2">
          Pairs well with
        </h2>
        {device && <span className="ma-pairs__for">For {device}</span>}
      </div>
      <ul className="ma-pairs__grid">
        {items.map((i) => (
          <li key={i._id} className="ma-pairs__card">
            <Link href={productPath(i)} className="ma-pairs__img" tabIndex={-1} aria-hidden="true">
              <Image src={i.imageUrl} alt="" fill sizes="96px" />
            </Link>
            <div className="ma-pairs__body">
              <Link href={productPath(i)} className="ma-pairs__name">
                {i.name}
              </Link>
              <strong className="ma-pairs__price">{fmt(currentPrice(i))}</strong>
            </div>
            <AddToCartButton
              product={{
                _id: i._id,
                name: i.name,
                category: i.category,
                imageUrl: i.imageUrl,
                price: i.price,
                newPrice: i.newPrice,
                oldPrice: i.oldPrice,
                deviceCompatibility: i.deviceCompatibility,
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
