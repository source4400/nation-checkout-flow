import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Lock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import CheckoutSettingsModal from './CheckoutSettingsModal';

interface CheckoutState {
  hasCoupon: boolean;
  hasWeeklySubscription: boolean;
  isInternational: boolean;
  paymentMethod: 'mpesa' | 'card';
  showCouponInput: boolean;
  couponCode: string;
  couponError: string;
  couponApplied: boolean;
  showModal: boolean;
  settingsConfigured: boolean;
}

const CheckoutPage = () => {
  const [state, setState] = useState<CheckoutState>({
    hasCoupon: false,
    hasWeeklySubscription: false,
    isInternational: false,
    paymentMethod: 'card',
    showCouponInput: false,
    couponCode: '',
    couponError: '',
    couponApplied: false,
    showModal: true,
    settingsConfigured: false
  });

  // Dynamic pricing based on location
  const basePrice = state.isInternational ? 29 : 900;
  const couponDiscount = state.isInternational ? 10 : 100;
  const proRataDiscount = state.isInternational ? 5 : 280;
  const currency = state.isInternational ? '$' : 'KES';

  const calculateTotal = () => {
    let total = basePrice;
    if (state.couponApplied) {
      total -= couponDiscount;
    }
    if (state.hasWeeklySubscription) {
      total -= proRataDiscount;
    }
    return total;
  };

  const handleSettingsConfirm = (settings: { isInternational: boolean; hasWeeklySubscription: boolean }) => {
    setState(prev => ({
      ...prev,
      isInternational: settings.isInternational,
      hasWeeklySubscription: settings.hasWeeklySubscription,
      paymentMethod: 'card', // Always default to card
      showModal: false,
      settingsConfigured: true
    }));
  };

  const handleApplyCoupon = () => {
    if (state.couponCode.trim() === 'NMG100') {
      setState(prev => ({ 
        ...prev, 
        couponApplied: true, 
        couponError: '',
        hasCoupon: true 
      }));
    } else {
      setState(prev => ({ 
        ...prev, 
        couponError: 'Invalid coupon code',
        couponApplied: false,
        hasCoupon: false 
      }));
    }
  };

  const handleSubscribe = () => {
    console.log('Subscribe clicked', { finalPrice, paymentMethod: state.paymentMethod });
  };

  const handleSettingsChange = () => {
    setState(prev => ({ ...prev, showModal: true }));
  };

  const finalPrice = calculateTotal();
  const buttonText = state.hasWeeklySubscription ? 'Upgrade now' : 'Subscribe Now';

  if (!state.settingsConfigured) {
    return (
      <TooltipProvider>
        <CheckoutSettingsModal 
          isOpen={state.showModal}
          onSettingsConfirm={handleSettingsConfirm}
        />
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 font-georgia pb-24 md:pb-8">
        <div className="container mx-auto py-4 md:py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Daily Nation Subscription</h1>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleSettingsChange}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-gray-600">Join 300,000+ subscribers for expert reporting, ad-free news and puzzles</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
              {/* Left Side - Order Summary */}
              <Card className="shadow-lg h-fit lg:h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base md:text-lg font-bold text-gray-900">Order Summary</CardTitle>
                    <p className="text-sm text-gray-500">user@example.com</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6 flex-1">
                  {/* Plan Details */}
                  <div className="border-b pb-4">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Monthly Plan</h3>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Price</span>
                      <span className="font-semibold">{currency} {basePrice}</span>
                    </div>

                    {/* Coupon Section */}
                    {state.couponApplied && (
                      <div className="flex justify-between items-center text-green-600">
                        <span>Discount Coupon (NMG100)</span>
                        <span>-{currency} {couponDiscount}</span>
                      </div>
                    )}

                    {/* Upgrade Credit */}
                    {state.hasWeeklySubscription && (
                      <div className="flex justify-between items-center text-green-600">
                        <div className="flex items-center space-x-2">
                          <span>Upgrade credit</span>
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="h-4 w-4 rounded-full border border-gray-400 flex items-center justify-center text-xs text-gray-600 cursor-help">i</div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs p-3">
                              <p className="text-sm">
                                When you change your subscription before it ends, you get money back for the days you didn't use. We calculate this by seeing how many days are left in your subscription period and giving you a discount based on that unused time.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <span>-{currency} {proRataDiscount}</span>
                      </div>
                    )}

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>To Pay</span>
                        <span className="text-blue-600">{currency} {finalPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Coupon Code Section */}
                  <div className="space-y-3 pt-4 border-t">
                    {!state.showCouponInput ? (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Have a coupon code?</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setState(prev => ({ ...prev, showCouponInput: true }))}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 p-0 h-auto font-normal underline transition-colors hover:underline"
                        >
                          Click here to apply
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="couponCode">Coupon Code</Label>
                        <div className="flex space-x-2">
                          <Input 
                            id="couponCode" 
                            placeholder="Enter coupon code"
                            value={state.couponCode}
                            onChange={(e) => setState(prev => ({ ...prev, couponCode: e.target.value, couponError: '' }))}
                            className="flex-1"
                          />
                          <Button 
                            variant="outline"
                            onClick={handleApplyCoupon}
                          >
                            Apply
                          </Button>
                        </div>
                        {state.couponError && (
                          <p className="text-red-500 text-sm">{state.couponError}</p>
                        )}
                        {state.couponApplied && (
                          <p className="text-green-600 text-sm">Coupon applied successfully!</p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Right Side - Payment Method */}
              <Card className="shadow-lg h-fit lg:h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl font-bold text-gray-900">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6 flex-1">
                  <div className="space-y-3">
                    {/* Card Payment - Always first */}
                    <div 
                      className={`flex items-center justify-between p-3 border-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                        state.paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setState(prev => ({ ...prev, paymentMethod: 'card' }))}
                    >
                      <div className="flex flex-col">
                        <div className="font-semibold text-sm">Card</div>
                        <div className="text-xs text-gray-500">Visa, Mastercard accepted</div>
                      </div>
                      <div className="flex space-x-1">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
                          alt="Visa" 
                          className="h-4 w-auto"
                        />
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
                          alt="Mastercard" 
                          className="h-4 w-auto"
                        />
                      </div>
                    </div>

                    {/* M-PESA - Only for National */}
                    {!state.isInternational && (
                      <div 
                        className={`flex items-center justify-between p-3 border-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                          state.paymentMethod === 'mpesa' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                        onClick={() => setState(prev => ({ ...prev, paymentMethod: 'mpesa' }))}
                      >
                        <div className="flex flex-col">
                          <div className="font-semibold text-sm">M-PESA</div>
                          <div className="text-xs text-gray-500">Pay with your mobile money</div>
                        </div>
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/2560px-M-PESA_LOGO-01.svg.png" 
                          alt="M-PESA" 
                          className="h-6 w-auto"
                        />
                      </div>
                    )}
                  </div>

                  {/* Desktop Subscribe Button */}
                  <div className="hidden md:block space-y-3">
                    <Button 
                      className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
                      onClick={handleSubscribe}
                    >
                      {buttonText} - {currency} {finalPrice}
                    </Button>
                    
                    {/* Secure Transaction */}
                    <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                      <Lock className="h-4 w-4" />
                      <span>Secure transaction</span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="text-center text-sm text-gray-500 pt-4 border-t">
                    <p>Need help?</p>
                    <p>Call us at <span className="text-blue-600">+254 20 328 8000</span></p>
                    <p>or email <span className="text-blue-600">support@nation.co.ke</span></p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Mobile Floating Subscribe Button */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg z-50">
          <div className="space-y-3">
            <Button 
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
              onClick={handleSubscribe}
            >
              {buttonText} - {currency} {finalPrice}
            </Button>
            
            {/* Secure Transaction - Mobile */}
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              <Lock className="h-4 w-4" />
              <span>Secure transaction</span>
            </div>
          </div>
        </div>

        {/* Settings Modal */}
        <CheckoutSettingsModal 
          isOpen={state.showModal}
          onSettingsConfirm={handleSettingsConfirm}
        />
      </div>
    </TooltipProvider>
  );
};

export default CheckoutPage;
