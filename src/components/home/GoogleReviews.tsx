import { GOOGLE_REVIEWS } from '@/data/reviews';
import { STORE } from '@/data/store-settings';
import './reviews.css';

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="ma-stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} aria-hidden="true" width={size} height={size} viewBox="0 0 24 24">
          <path
            d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"
            fill={i < Math.round(rating) ? '#fbbc04' : '#d9dbe0'}
          />
        </svg>
      ))}
    </span>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}

const AVATAR_COLOURS = ['#ff5a1f', '#1a73e8', '#188038', '#a142f4', '#e37400', '#d93025', '#12858a', '#5f6368'];

export default function GoogleReviews() {
  const g = STORE.googleRating;
  const readUrl = g?.url || STORE.googleReviewsUrl;
  const writeUrl = `https://search.google.com/local/writereview?placeid=${STORE.googlePlaceId}`;

  return (
    <section aria-labelledby="reviews-h" className="ma-section ma-reviews">
      <div className="ma-reviews__head">
        <div>
          <span className="ma-eyebrow">Google reviews</span>
          <h2 id="reviews-h" className="ma-h2">
            What our customers say
          </h2>
        </div>
        {g && (
          <div className="ma-reviews__score">
            <strong>{g.rating.toFixed(1)}</strong>
            <span>
              <Stars rating={g.rating} size={20} />
              <span className="ma-reviews__count">
                Based on {g.count} reviews on Google
              </span>
            </span>
          </div>
        )}
      </div>

      <ul className="ma-reviews__list">
        {GOOGLE_REVIEWS.map((r, i) => (
          <li key={r.name} className="ma-review">
            <div className="ma-review__top">
              <span className="ma-review__avatar" style={{ background: AVATAR_COLOURS[i % AVATAR_COLOURS.length] }} aria-hidden="true">
                {initials(r.name)}
              </span>
              <span className="ma-review__who">
                <strong>{r.name}</strong>
                <span>{r.date} · Google</span>
              </span>
            </div>
            <Stars rating={r.rating} />
            <blockquote className="ma-review__text">
              <p>{r.text}</p>
            </blockquote>
            <span className="ma-review__tag">{r.topic}</span>
          </li>
        ))}
      </ul>

      <div className="ma-reviews__actions">
        <a href={readUrl} className="ma-btn ma-btn--dark" target="_blank" rel="noopener">
          Read all reviews on Google
        </a>
        <a href={writeUrl} className="ma-btn ma-btn--outline" target="_blank" rel="noopener">
          Leave us a review
        </a>
      </div>
    </section>
  );
}
