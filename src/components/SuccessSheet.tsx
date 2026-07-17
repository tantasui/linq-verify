import { CheckIcon } from '../icons';
import { BOT_DEEP_LINK } from '../constants';

export default function SuccessSheet() {
  return (
    <div className="sheet-overlay">
      <div className="sheet">
        <div className="sheet-icon">
          <CheckIcon />
        </div>
        <h2 className="headline" style={{ fontSize: '20px' }}>
          You're verified
        </h2>
        <p className="subtitle" style={{ marginBottom: '24px' }}>
          One last step to finish. Head back to the Telegram bot, tap{' '}
          <strong>"I've signed up — link my account"</strong>, and enter this same email to link it and unlock
          your full daily limit.
        </p>
        <a className="btn" href={BOT_DEEP_LINK} style={{ textDecoration: 'none' }}>
          Back to Telegram
        </a>
      </div>
    </div>
  );
}
