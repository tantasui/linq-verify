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
  const [upgradeEmail, setUpgradeEmail] = useState('');

  return (
    <div className="page">
      {step === 'profile' && (
        <ProfileStep
          onDone={(t) => {
            setToken(t);
            setStep('signupDone');
          }}
        />
      )}

      {step === 'signupDone' && <TiersExplainerStep onVerifyNow={() => setStep('nin')} />}

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

      {step === 'done' && <SuccessSheet />}
    </div>
  );
}
