import { useState } from 'react';
import { startNINUpgrade, friendlyErrorMessage } from '../api';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Props {
  onDone: (email: string) => void;
}

export default function UpgradeEmailStep({ onDone }: Props) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = EMAIL_RE.test(email.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError('');
    try {
      await startNINUpgrade(email.trim());
      onDone(email.trim());
    } catch (err) {
      setError(friendlyErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="screen">
      <div className="content">
        <h1 className="headline">Verify your NIN</h1>
        <p className="subtitle">
          Enter the email you signed up with. We'll send you a code to confirm it's you before you enter your
          NIN.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="field-input"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              autoComplete="email"
            />
          </div>

          {error && <div className="error-banner">{error}</div>}

          <div className="btn-footer">
            <button type="submit" className="btn" disabled={!canSubmit || submitting}>
              {submitting && <span className="spinner" />}
              {submitting ? 'Sending…' : 'Send code'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
