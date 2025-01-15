import React, { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3a from './Step3a';
import Step3b from './Step3b';
import Step4a from './Step4a';
import Step4b from './Step4b';
import Step4c from './Step4c';
import Step5 from './Step5';
import ProcessingScreen from './ProcessingScreen';
import SuccessScreen from './SuccessScreen';

const TaxForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    // ... existing form data ...
  });

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const updateFormData = useCallback((data:any) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      triggerConfetti();
    }, 17000);
  };

  if (isSuccess) {
    console.log('Form Data being passed to SuccessScreen:', formData);
    return <SuccessScreen formData={formData} />;
  }

  if (isProcessing) {
    return <ProcessingScreen onComplete={triggerConfetti} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-4 left-4 z-50">
        <a href="https://remedytaxsolutions.com" target="_blank" rel="noopener noreferrer">
          <img 
            src="/Group-237892-2.png" 
            alt="Remedy Tax Solutions Logo" 
            className="h-12 w-auto hover:opacity-90 transition-opacity"
          />
        </a>
      </div>
      <div className="py-12">
        {currentStep === 1 && (
          <Step1 
            onNext={handleNext} 
          />
        )}
        {currentStep === 2 && (
          <Step2 
            onNext={handleNext} 
            onPrevious={handlePrevious}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {currentStep === 3 && (
          <Step3a 
            onNext={handleNext} 
            onPrevious={handlePrevious}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {currentStep === 4 && (
          <Step3b 
            onNext={handleNext} 
            onPrevious={handlePrevious}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {currentStep === 5 && (
          <Step4a 
            onNext={handleNext} 
            onPrevious={handlePrevious}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {currentStep === 6 && (
          <Step4b
            onNext={handleNext}
            onPrevious={handlePrevious}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {currentStep === 7 && (
          <Step4c
            onNext={handleNext}
            onPrevious={handlePrevious}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {currentStep === 8 && (
          <Step5
            onNext={handleSubmit}
            onPrevious={handlePrevious}
            formData={formData}
          />
        )}
      </div>
    </div>
  );
};

export default TaxForm;