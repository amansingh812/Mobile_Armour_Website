import Image from "next/image";
import Link from "next/link";
import { currentPrice, productPath, slugify } from "@/lib/products";
import { shortModel, swatchFor } from "@/data/phone-models";
import type { ShopProduct } from "@/lib/shop-data";
import AddToCartButton from "./AddToCartButton";

/** Short "fits" label, e.g. "Fits iPhone 17 Pro Max" or "Fits 3 iPhone models". */
export function fitLabel(devices?: string[]): string | null {
  if (!devices || devices.length === 0) return null;
  if (devices.length === 1) return `Fits ${devices[0]}`;
  if (devices.length === 2) return `Fits ${devices[0]} & ${devices[1].replace(/^iPhone /, "")}`;
  return `Fits ${devices.length} models`;
}

export default function ProductTile({
  product,
  priority,
  model,
}: {
  product: ShopProduct;
  priority?: boolean;
  /** On a phone's page: open the product with that phone already chosen. */
  model?: string;
}) {
  const variants = product.variants;
  const forModel = variants && model ? variants.filter((v) => v.models.includes(model)) : variants;
  const options = forModel && forModel.length ? forModel : undefined;
  const price = options ? Math.min(...options.map((v) => v.price)) : currentPrice(product);
  const was = typeof product.oldPrice === "number" && product.oldPrice > price ? product.oldPrice : null;
  const inStock = options ? options.some((v) => v.available) : typeof product.stock === "number" ? product.stock > 0 : true;
  const href = model && variants ? `${productPath(product)}?model=${slugify(model)}` : productPath(product);
  const fit = model && variants ? `Fits ${model}` : fitLabel(product.deviceCompatibility);
  const colours = options ? Array.from(new Set(options.map((v) => v.colour).filter(Boolean))) as string[] : [];
  const phones = variants && !model ? Array.from(new Set(variants.flatMap((v) => v.models))) : [];

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
        {(colours.length > 1 || phones.length > 1) && (
          <p className="ma-tile-p__opts">
            {colours.length > 1 && (
              <span className="ma-tile-p__dots" aria-label={`${colours.length} colours`}>
                {colours.slice(0, 6).map((c) => (
                  <i key={c} style={{ background: swatchFor(c) }} title={c} />
                ))}
                {colours.length > 6 && <em>+{colours.length - 6}</em>}
              </span>
            )}
            {phones.length > 1 && <span>{phones.length <= 3 ? phones.map(shortModel).join(" · ") : `${phones.length} models`}</span>}
          </p>
        )}
        <div className="ma-tile-p__row">
          <span className="ma-tile-p__price">
            ${price % 1 === 0 ? price : price.toFixed(2)}
            {was && <s>${was % 1 === 0 ? was : was.toFixed(2)}</s>}
          </span>
          {variants ? (
            <Link href={href} className="ma-add-icon ma-add-icon--choose" aria-label={`Choose options for ${product.name}`}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </Link>
          ) : (
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
          )}
        </div>
      </div>
    </article>
  );
}
