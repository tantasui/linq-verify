import { useState } from 'react';
import { verifyNIN, friendlyErrorMessage } from '../api';
import { BackIcon, AlertIcon } from '../icons';

interface Props {
  token: string;
  onBack: () => void;
  onVerified: () => void;
}

export default function NinStep({ token, onBack, onVerified }: Props) {
  const [nin, setNin] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const digitsComplete = nin.length === 11;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!digitsComplete) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await verifyNIN(token, nin);
      if (res.status === 'verified') {
        onVerified();
      } else {
        setError(res.message || 'Verification could not be completed.');
      }
    } catch (err) {
      setError(friendlyErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="screen">
      <div className="topbar">
        <button type="button" className="back-btn" onClick={onBack} aria-label="Back">
          <BackIcon />
        </button>
        <span className="topbar-title">KYC</span>
        <span style={{ width: 36 }} />
      </div>

      <div className="content">
        <h1 className="headline">Verify your identity</h1>
        <p className="subtitle">Fill in your information below</p>

        <div className="field">
          <label className="field-label">Nationality</label>
          <div className="field-input" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-main)' }}>
            🇳🇬 Nigeria
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label" htmlFor="nin">
              NIN
            </label>
            <input
              id="nin"
              className="field-input nin-input"
              placeholder="Enter your NIN"
              inputMode="numeric"
              autoComplete="off"
              value={nin}
              onChange={(e) => setNin(e.target.value.replace(/\D/g, '').slice(0, 11))}
              disabled={submitting}
            />
            <div className={`counter${digitsComplete ? ' complete' : ''}`}>{nin.length}/11 digits</div>
          </div>

          {error && (
            <div className="error-banner">
              <AlertIcon />
              <span>{error}</span>
            </div>
          )}

          <div className="btn-footer">
            <button type="submit" className="btn" disabled={!digitsComplete || submitting}>
              {submitting && <span className="spinner" />}
              {submitting ? 'Verifying…' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
