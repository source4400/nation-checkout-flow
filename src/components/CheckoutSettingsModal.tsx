
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface CheckoutSettings {
  isInternational: boolean;
  hasWeeklySubscription: boolean;
}

interface CheckoutSettingsModalProps {
  isOpen: boolean;
  onSettingsConfirm: (settings: CheckoutSettings) => void;
}

const CheckoutSettingsModal = ({ isOpen, onSettingsConfirm }: CheckoutSettingsModalProps) => {
  const [isInternational, setIsInternational] = useState(false);
  const [hasWeeklySubscription, setHasWeeklySubscription] = useState(false);

  const handleProceed = () => {
    onSettingsConfirm({
      isInternational,
      hasWeeklySubscription
    });
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md [&>button[data-state]]:hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Subscription Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* International or National */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Location</Label>
            <div className="space-y-2">
              <div 
                className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                  !isInternational ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setIsInternational(false)}
              >
                <span className="font-medium">National</span>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  !isInternational ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}>
                  {!isInternational && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                </div>
              </div>
              
              <div 
                className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                  isInternational ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setIsInternational(true)}
              >
                <span className="font-medium">International</span>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  isInternational ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}>
                  {isInternational && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Subscription */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Current Subscription</Label>
            <div className="space-y-2">
              <div 
                className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                  !hasWeeklySubscription ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setHasWeeklySubscription(false)}
              >
                <span className="font-medium">No existing subscription</span>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  !hasWeeklySubscription ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}>
                  {!hasWeeklySubscription && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                </div>
              </div>
              
              <div 
                className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                  hasWeeklySubscription ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setHasWeeklySubscription(true)}
              >
                <span className="font-medium">Has weekly subscription</span>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  hasWeeklySubscription ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}>
                  {hasWeeklySubscription && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleProceed}
          className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
        >
          Proceed
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutSettingsModal;
