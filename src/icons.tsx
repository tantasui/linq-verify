// Hand-drawn to a single 1.6px stroke weight, rather than pulling in an icon
// library for a handful of glyphs.

export const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3 5 6v5c0 4.4 3 8.2 7 9.5 4-1.3 7-5.1 7-9.5V6l-7-3Z"
      stroke="var(--primary)"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

export const CheckIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <path d="m7 12.5 3.2 3.2L17 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AlertIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 4 3 20h18L12 4Z" stroke="var(--error)" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M12 10.5v4" stroke="var(--error)" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="17.2" r="0.9" fill="var(--error)" />
  </svg>
);
