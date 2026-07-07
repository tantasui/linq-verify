import { CheckIcon } from '../icons';

// No browser equivalent of Telegram.WebApp.close() for a plain tab — deep-link
// back into the bot chat instead (opens the Telegram app on mobile, Telegram
// Desktop/web.telegram.org on desktop).
const BOT_DEEP_LINK = 'https://t.me/LInqTelegramBot';

export default function SuccessSheet() {
  return (
    <div className="sheet-overlay">
      <div className="sheet">
        <div className="sheet-icon">
          <CheckIcon />
        </div>
        <h2 className="headline" style={{ fontSize: '20px' }}>
          KYC completed
        </h2>
        <p className="subtitle" style={{ marginBottom: '24px' }}>
          Your KYC has been completed successfully. Head back to Telegram and enter this email to finish linking
          your account.
        </p>
        <a className="btn" href={BOT_DEEP_LINK} style={{ textDecoration: 'none' }}>
          Done
        </a>
      </div>
    </div>
  );
}
