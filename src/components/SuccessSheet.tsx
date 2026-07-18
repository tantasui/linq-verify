import { CheckIcon } from '../icons';
import { botLink } from '../constants';

interface Props {
  botLinkToken?: string;
}

export default function SuccessSheet({ botLinkToken }: Props) {
  // With a token, the button links the account automatically on tap — no email or
  // code to re-enter. Without one (the upgrade flow, already linked), it just
  // reopens the bot, so the copy stays generic.
  const hasAutoLink = !!botLinkToken;
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
          {hasAutoLink
            ? 'Tap below to open Telegram — your account links automatically and your full daily limit unlocks. No code to enter.'
            : "You're all set. Tap below to head back to Telegram."}
        </p>
        <a className="btn" href={botLink(botLinkToken)} style={{ textDecoration: 'none' }}>
          {hasAutoLink ? 'Finish in Telegram' : 'Back to Telegram'}
        </a>
      </div>
    </div>
  );
}
