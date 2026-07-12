import { useState } from 'react';
import { confirmNINUpgrade, friendlyErrorMessage } from '../api';
import { BackIcon } from '../icons';

interface Props {
  email: string;
  onBack: () => void;
  onDone: (token: string) => void;
}

export default function UpgradeOtpStep({ email, onBack, onDone }: Props) {
  const [otp, setOtp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const digitsComplete = otp.length === 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!digitsComplete) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await confirmNINUpgrade(email, otp);
      onDone(res.token);
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
        <span className="topbar-title">Verify email</span>
        <span style={{ width: 36 }} />
      </div>

      <div className="content">
        <h1 className="headline">Enter the code</h1>
        <p className="subtitle">We sent a 6-digit code to {email}.</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label" htmlFor="otp">
              Code
            </label>
            <input
              id="otp"
              className="field-input nin-input"
              placeholder="Enter 6-digit code"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              disabled={submitting}
            />
            <div className={`counter${digitsComplete ? ' complete' : ''}`}>{otp.length}/6 digits</div>
          </div>

          {error && <div className="error-banner">{error}</div>}

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
