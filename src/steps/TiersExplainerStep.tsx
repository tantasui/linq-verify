import { ShieldIcon } from '../icons';
import { BOT_DEEP_LINK } from '../constants';

interface Props {
  onVerifyNow: () => void;
}

export default function TiersExplainerStep({ onVerifyNow }: Props) {
  return (
    <div className="screen">
      <div className="content">
        <div className="icon-badge">
          <ShieldIcon />
        </div>
        <h1 className="headline">You're set up</h1>
        <p className="subtitle">
          You can start using Linq right away with up to <strong>₦50,000/day</strong>. Verify your NIN to
          unlock up to <strong>₦5,000,000/day</strong>.
        </p>

        <div className="btn-footer">
          <button type="button" className="btn" onClick={onVerifyNow}>
            Verify now
          </button>
          <p className="subtitle" style={{ fontSize: '12px', margin: '10px 0 20px' }}>
            Takes under a minute — unlocks the full ₦5,000,000/day limit immediately.
          </p>
          <a className="btn btn-secondary" href={BOT_DEEP_LINK} style={{ textDecoration: 'none' }}>
            Skip for now, I'll verify later
          </a>
        </div>
      </div>
    </div>
  );
}
