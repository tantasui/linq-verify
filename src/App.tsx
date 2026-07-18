import { useState } from 'react';
import ProfileStep from './steps/ProfileStep';
import TiersExplainerStep from './steps/TiersExplainerStep';
import UpgradeEmailStep from './steps/UpgradeEmailStep';
import UpgradeOtpStep from './steps/UpgradeOtpStep';
import NinStep from './steps/NinStep';
import SuccessSheet from './components/SuccessSheet';

type Step = 'profile' | 'signupDone' | 'upgradeEmail' | 'upgradeOtp' | 'nin' | 'done';

const isUpgradeMode = new URLSearchParams(window.location.search).get('mode') === 'upgrade';

export default function App() {
  const [step, setStep] = useState<Step>(isUpgradeMode ? 'upgradeEmail' : 'profile');
  const [token, setToken] = useState('');
  // The bot-link token, minted at signup, that turns the "back to Telegram" links
  // into one-tap auto-link deep links. Absent in the upgrade flow (already linked).
  const [botLinkToken, setBotLinkToken] = useState<string | undefined>(undefined);
  const [upgradeEmail, setUpgradeEmail] = useState('');

  return (
    <div className="page">
      {step === 'profile' && (
        <ProfileStep
          onDone={(t, blt) => {
            setToken(t);
            setBotLinkToken(blt);
            setStep('signupDone');
          }}
        />
      )}

      {step === 'signupDone' && (
        <TiersExplainerStep botLinkToken={botLinkToken} onVerifyNow={() => setStep('nin')} />
      )}

      {step === 'upgradeEmail' && (
        <UpgradeEmailStep
          onDone={(email) => {
            setUpgradeEmail(email);
            setStep('upgradeOtp');
          }}
        />
      )}

      {step === 'upgradeOtp' && (
        <UpgradeOtpStep
          email={upgradeEmail}
          onBack={() => setStep('upgradeEmail')}
          onDone={(t) => {
            setToken(t);
            setStep('nin');
          }}
        />
      )}

      {(step === 'nin' || step === 'done') && (
        <NinStep
          token={token}
          onBack={() => setStep(isUpgradeMode ? 'upgradeEmail' : 'signupDone')}
          onVerified={() => setStep('done')}
        />
      )}

      {step === 'done' && <SuccessSheet botLinkToken={botLinkToken} />}
    </div>
  );
}
