import { ShieldIcon } from '../icons';
import { BOT_DEEP_LINK } from '../constants';

export default function TiersExplainerStep() {
  return (
    <div className="screen">
      <div className="content">
        <div className="icon-badge">
          <ShieldIcon />
        </div>
        <h1 className="headline">You're set up</h1>
        <p className="subtitle">
          You can start using Linq right away with up to <strong>₦50,000/day</strong>. Verify your NIN anytime
          to unlock up to <strong>₦5,000,000/day</strong> — just tap "Verify my NIN" in the bot whenever
          you're ready.
        </p>

        <div className="btn-footer">
          <a className="btn" href={BOT_DEEP_LINK} style={{ textDecoration: 'none' }}>
            Back to Telegram
          </a>
        </div>
      </div>
    </div>
  );
}
