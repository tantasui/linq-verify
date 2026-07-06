import { useEffect, useState } from 'react';
import { verifyNIN, friendlyErrorMessage } from './api';

// Hand-drawn to a single 1.6px stroke weight, rather than pulling in an icon
// library for three glyphs.
const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3 5 6v5c0 4.4 3 8.2 7 9.5 4-1.3 7-5.1 7-9.5V6l-7-3Z"
      stroke="var(--info)"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="var(--accent)" strokeWidth="1.6" />
    <path d="m8 12.5 2.5 2.5L16 9.5" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlertIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 4 3 20h18L12 4Z"
      stroke="var(--danger)"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M12 10.5v4" stroke="var(--danger)" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="17.2" r="0.9" fill="var(--danger)" />
  </svg>
);

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function App() {
  const [initData, setInitData] = useState<string | null>(null);
  const [nin, setNin] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    webApp?.ready();
    webApp?.expand();
    // Dev-only: let the form render outside Telegram so the UI can be previewed
    // in a plain browser. Stripped in production builds (import.meta.env.DEV).
    const devFallback = import.meta.env.DEV ? 'dev-preview-no-real-initdata' : '';
    setInitData(webApp?.initData || devFallback);
  }, []);

  useEffect(() => {
    if (status !== 'success') return;
    const timer = setTimeout(() => window.Telegram?.WebApp.close(), 1500);
    return () => clearTimeout(timer);
  }, [status]);

  if (initData === null) {
    return null; // brief flash while reading window.Telegram.WebApp
  }

  if (!initData) {
    return (
      <div className="page">
        <div className="grain" />
        <div className="card">
          <div className="icon-badge warn">
            <AlertIcon />
          </div>
          <div className="title">Open this from Telegram</div>
          <div className="subtitle">
            This verification page only works when opened from the Linq Telegram bot.
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nin.length !== 11) return;
    setStatus('submitting');
    setError('');
    try {
      const res = await verifyNIN(initData, nin);
      if (res.status === 'verified') {
        setStatus('success');
      } else {
        setStatus('error');
        setError(res.message || 'Verification could not be completed.');
      }
    } catch (err) {
      setStatus('error');
      setError(friendlyErrorMessage(err));
    }
  };

  if (status === 'success') {
    return (
      <div className="page">
        <div className="grain" />
        <div className="card">
          <div className="icon-badge">
            <CheckIcon />
          </div>
          <div className="title">Verification complete</div>
          <div className="subtitle">Your identity has been verified. You can return to Telegram now.</div>
        </div>
      </div>
    );
  }

  const digitsComplete = nin.length === 11;

  return (
    <div className="page">
      <div className="grain" />
      <div className="card">
        <div className="icon-badge info">
          <ShieldIcon />
        </div>
        <div className="title">Verify your identity</div>
        <div className="subtitle">
          Enter your National Identity Number to verify your identity. This is a one-time
          process — your NIN is never stored, only used to confirm who you are.
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className="nin-input"
            placeholder="11-digit NIN"
            inputMode="numeric"
            autoComplete="off"
            value={nin}
            onChange={(e) => setNin(e.target.value.replace(/\D/g, '').slice(0, 11))}
            disabled={status === 'submitting'}
          />

          {status === 'error' && (
            <div className="error-banner">
              <AlertIcon />
              <span>{error}</span>
            </div>
          )}

          <div className={`counter${digitsComplete ? ' complete' : ''}`}>{nin.length}/11 digits</div>

          <button type="submit" className="btn" disabled={!digitsComplete || status === 'submitting'}>
            {status === 'submitting' && <span className="spinner" />}
            {status === 'submitting' ? 'Verifying' : 'Verify NIN'}
          </button>
        </form>
      </div>
    </div>
  );
}
