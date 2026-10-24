/** Simple line icons (24x24, stroke = currentColor) used across the redesign. */
export type IconName =
  | 'screen'
  | 'battery'
  | 'bolt'
  | 'droplet'
  | 'phone-back'
  | 'camera'
  | 'watch'
  | 'tablet'
  | 'check'
  | 'clock'
  | 'store'
  | 'tag'
  | 'wrench'
  | 'return'
  | 'sparkle'
  | 'call'
  | 'mail'
  | 'pin'
  | 'quote'
  | 'bag';

const PATHS: Record<IconName, React.ReactNode> = {
  screen: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M10.5 5.5h3" />
      <path d="M9 11l2.5 2.5L9 16M14 9.5l1.5 2-2 2.5" />
    </>
  ),
  battery: (
    <>
      <rect x="2.5" y="7" width="17" height="10" rx="2.5" />
      <path d="M21.5 10.5v3" />
      <path d="M11.5 9l-2 3h3l-2 3" />
    </>
  ),
  bolt: <path d="M13 2.5L5 13.5h6l-1 8 8-11h-6l1-8z" />,
  droplet: (
    <>
      <path d="M12 2.8s6.5 7 6.5 11.2a6.5 6.5 0 01-13 0C5.5 9.8 12 2.8 12 2.8z" />
      <path d="M9 14.5a3 3 0 003 3" />
    </>
  ),
  'phone-back': (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <rect x="8.5" y="5" width="5" height="5" rx="1.5" />
      <path d="M13 14l-3 4M16 13l-2 3" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l1.5-2.5h7L17 8h3a1.5 1.5 0 011.5 1.5v8A1.5 1.5 0 0120 19H4a1.5 1.5 0 01-1.5-1.5v-8A1.5 1.5 0 014 8z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  watch: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="3" />
      <path d="M9 6l.8-3.5h4.4L15 6M9 18l.8 3.5h4.4L15 18" />
      <path d="M12 9.5V12l1.8 1.3" />
    </>
  ),
  tablet: (
    <>
      <rect x="4" y="2.5" width="16" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  check: (
    <>
      <path d="M12 2.8l7.5 3v5.7c0 4.6-3.2 8.3-7.5 9.7-4.3-1.4-7.5-5.1-7.5-9.7V5.8l7.5-3z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  store: (
    <>
      <path d="M3.5 9.5L5 4h14l1.5 5.5" />
      <path d="M3.5 9.5a2.8 2.8 0 005.6 0 2.8 2.8 0 005.8 0 2.8 2.8 0 005.6 0" />
      <path d="M5 12.5V20h14v-7.5M10 20v-4.5h4V20" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12.2V4.5A1.5 1.5 0 014.5 3h7.7L21 11.8a1.5 1.5 0 010 2.1l-7.1 7.1a1.5 1.5 0 01-2.1 0L3 12.2z" />
      <circle cx="8" cy="8" r="1.5" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a4.5 4.5 0 005.9 5.9l-8.9 8.9a2.1 2.1 0 01-3-3l8.9-8.9a4.5 4.5 0 01-2.9-2.9z M17 3.5l-2.3 2.8 1 2 2 1 2.8-2.3" />
  ),
  return: (
    <>
      <path d="M4 9h11a5 5 0 010 10H9" />
      <path d="M8 5L4 9l4 4" />
    </>
  ),
  sparkle: <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3zM18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />,
  call: (
    <path d="M5 3.5h3.5l1.8 4.5-2.3 1.4a11 11 0 006.6 6.6l1.4-2.3 4.5 1.8V19a1.5 1.5 0 01-1.5 1.5A16.5 16.5 0 013.5 5 1.5 1.5 0 015 3.5z" />
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M3 6.5l9 6.5 9-6.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s-7-6.2-7-11.5a7 7 0 0114 0c0 5.3-7 11.5-7 11.5z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  quote: (
    <>
      <path d="M4 5.5h16a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-1.5 1.5h-9l-5 4v-4H4A1.5 1.5 0 012.5 16V7A1.5 1.5 0 014 5.5z" />
      <path d="M7.5 10h9M7.5 13.5h5" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14l-1 13H6L5 8z" />
      <path d="M9 10V6.5a3 3 0 016 0V10" />
    </>
  ),
};

export default function Icon({ name, size = 30, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </svg>
  );
}
