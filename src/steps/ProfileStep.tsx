import { useState } from 'react';
import { startSignup, ApiError, friendlyErrorMessage } from '../api';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Props {
  onDone: (token: string) => void;
}

export default function ProfileStep({ onDone }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [alreadyVerified, setAlreadyVerified] = useState(false);

  const canSubmit = firstName.trim() !== '' && lastName.trim() !== '' && EMAIL_RE.test(email.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError('');
    setAlreadyVerified(false);
    try {
      const res = await startSignup(firstName.trim(), lastName.trim(), email.trim());
      onDone(res.token);
    } catch (err) {
      if (err instanceof ApiError && err.message.toLowerCase().includes('already exists and is verified')) {
        setAlreadyVerified(true);
      } else {
        setError(friendlyErrorMessage(err));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="screen">
      <div className="topbar">
        <span className="pill pill-primary">Create your profile</span>
        <a className="pill pill-muted" href="mailto:support@uselinq.xyz">
          Support
        </a>
      </div>

      <div className="content">
        <h1 className="headline">Tell us about yourself</h1>
        <p className="subtitle">
          Already have a Linq account? Open the bot and tap <em>"I've signed up, verify me"</em> to link it —
          no need to sign up again.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label" htmlFor="firstName">
              First name
            </label>
            <input
              id="firstName"
              className="field-input"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={submitting}
              autoComplete="given-name"
            />
          </div>

          <div className="field">
            <label className="field-label" htmlFor="lastName">
              Last name
            </label>
            <input
              id="lastName"
              className="field-input"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={submitting}
              autoComplete="family-name"
            />
          </div>

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

          {alreadyVerified && (
            <div className="error-banner">
              An account with this email is already verified. Open the Linq bot and tap "I've signed up, verify
              me" to link it.
            </div>
          )}
          {error && <div className="error-banner">{error}</div>}

          <div className="btn-footer">
            <button type="submit" className="btn" disabled={!canSubmit || submitting}>
              {submitting && <span className="spinner" />}
              {submitting ? 'Continuing…' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
