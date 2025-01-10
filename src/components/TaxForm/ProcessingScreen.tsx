import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  UserCheck, 
  DollarSign, 
  Receipt, 
  Wallet, 
  Calculator,
  CheckCircle
} from 'lucide-react';

const steps = [
  { 
    message: 'Uploading Information', 
    duration: 2000,
    icon: Upload
  },
  { 
    message: 'Processing Tax Debt Info', 
    duration: 2000,
    icon: FileText
  },
  { 
    message: 'Processing Filing Status Info', 
    duration: 2000,
    icon: UserCheck
  },
  { 
    message: 'Processing Income Info', 
    duration: 2000,
    icon: DollarSign
  },
  { 
    message: 'Processing Expenses Info', 
    duration: 3000,
    icon: Receipt
  },
  { 
    message: 'Processing Assets Info', 
    duration: 2000,
    icon: Wallet
  },
  { 
    message: 'Calculating...', 
    duration: 3000,
    icon: Calculator
  },
  { 
    message: 'Done!', 
    duration: 1000,
    icon: CheckCircle
  }
];

interface ProcessingScreenProps {
  onComplete: () => void;
}

const ProcessingScreen = ({ onComplete }: ProcessingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const totalDuration = steps.reduce((acc, step) => acc + step.duration, 0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let currentTime = 0;

    const updateProgress = () => {
      currentTime += 100;
      const newProgress = (currentTime / totalDuration) * 100;
      setProgress(Math.min(newProgress, 100));

      let timeSum = 0;
      for (let i = 0; i < steps.length; i++) {
        timeSum += steps[i].duration;
        if (currentTime <= timeSum) {
          setCurrentStep(i);
          break;
        }
      }

      if (currentTime < totalDuration) {
        timer = setTimeout(updateProgress, 100);
      } else {
        onComplete();
      }
    };

    timer = setTimeout(updateProgress, 100);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto p-6 bg-white rounded-lg shadow-sm">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">Processing…</h2>
            <p className="text-lg text-gray-600">Thank you for your patience</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-center space-x-3">
              <CurrentIcon className="w-6 h-6 text-blue-500" />
              <div className="text-lg font-medium text-gray-700">
                {steps[currentStep].message}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingScreen;