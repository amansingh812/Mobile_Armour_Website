import Image from "next/image";
import Link from "next/link";
import { currentPrice, productPath } from "@/lib/products";
import type { ShopProduct } from "@/lib/shop-data";
import AddToCartButton from "./AddToCartButton";

/** Short "fits" label, e.g. "Fits iPhone 17 Pro Max" or "Fits 3 iPhone models". */
export function fitLabel(devices?: string[]): string | null {
  if (!devices || devices.length === 0) return null;
  if (devices.length === 1) return `Fits ${devices[0]}`;
  if (devices.length === 2) return `Fits ${devices[0]} & ${devices[1].replace(/^iPhone /, "")}`;
  return `Fits ${devices.length} models`;
}

export default function ProductTile({ product, priority }: { product: ShopProduct; priority?: boolean }) {
  const price = currentPrice(product);
  const was = typeof product.oldPrice === "number" && product.oldPrice > price ? product.oldPrice : null;
  const inStock = typeof product.stock === "number" ? product.stock > 0 : true;
  const href = productPath(product);
  const fit = fitLabel(product.deviceCompatibility);

  return (
    <article className="ma-tile-p">
      <Link href={href} className="ma-tile-p__img" tabIndex={-1} aria-hidden="true">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt=""
            fill
            sizes="(max-width: 560px) 50vw, (max-width: 1100px) 33vw, 260px"
            priority={priority}
          />
        )}
        {was && <span className="ma-tile-p__badge">Save ${(was - price).toFixed(0)}</span>}
        {!inStock && <span className="ma-tile-p__badge ma-tile-p__badge--out">Out of stock</span>}
      </Link>
      <div className="ma-tile-p__body">
        {fit && <span className="ma-tile-p__fit">{fit}</span>}
        <h3 className="ma-tile-p__name">
          <Link href={href}>{product.name}</Link>
        </h3>
        <div className="ma-tile-p__row">
          <span className="ma-tile-p__price">
            ${price % 1 === 0 ? price : price.toFixed(2)}
            {was && <s>${was % 1 === 0 ? was : was.toFixed(2)}</s>}
          </span>
          <AddToCartButton
            disabled={!inStock}
            product={{
              _id: product._id,
              name: product.name,
              category: product.category,
              imageUrl: product.imageUrl,
              price: product.price,
              newPrice: product.newPrice,
              oldPrice: product.oldPrice,
              deviceCompatibility: product.deviceCompatibility,
            }}
          />
        </div>
      </div>
    </article>
  );
}
