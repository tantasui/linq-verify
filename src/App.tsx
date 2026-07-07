import { useState } from 'react';
import ProfileStep from './steps/ProfileStep';
import NinStep from './steps/NinStep';
import SuccessSheet from './components/SuccessSheet';

type Step = 'profile' | 'nin' | 'done';

export default function App() {
  const [step, setStep] = useState<Step>('profile');
  const [token, setToken] = useState('');

  return (
    <div className="page">
      {step === 'profile' && (
        <ProfileStep
          onDone={(t) => {
            setToken(t);
            setStep('nin');
          }}
        />
      )}

      {(step === 'nin' || step === 'done') && (
        <NinStep token={token} onBack={() => setStep('profile')} onVerified={() => setStep('done')} />
      )}

      {step === 'done' && <SuccessSheet />}
    </div>
  );
}
