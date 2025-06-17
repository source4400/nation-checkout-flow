
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CheckoutState {
  hasCoupon: boolean;
  hasWeeklySubscription: boolean;
  paymentMethod: 'mpesa' | 'card';
  showCouponInput: boolean;
  couponCode: string;
  couponError: string;
  couponApplied: boolean;
}

const CheckoutPage = () => {
  const [state, setState] = useState<CheckoutState>({
    hasCoupon: false,
    hasWeeklySubscription: false,
    paymentMethod: 'mpesa',
    showCouponInput: false,
    couponCode: '',
    couponError: '',
    couponApplied: false
  });

  const basePrice = 900;
  const couponDiscount = 100;
  const proRataDiscount = 280;

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

  const finalPrice = calculateTotal();

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 font-georgia">
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Nation Subscription</h1>
              <p className="text-gray-600">Complete your subscription to access premium content</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Side - Order Summary */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Plan Details */}
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Plan</h3>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Price</span>
                      <span className="font-semibold">KES {basePrice}</span>
                    </div>

                    {/* Coupon Section */}
                    {state.couponApplied && (
                      <div className="flex justify-between items-center text-green-600">
                        <span>Discount Coupon (NMG100)</span>
                        <span>-KES {couponDiscount}</span>
                      </div>
                    )}

                    {/* Pro-rata Discount */}
                    {state.hasWeeklySubscription && (
                      <div className="flex justify-between items-center text-green-600">
                        <div className="flex items-center space-x-2">
                          <span>Pro-rata Discount</span>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs p-3">
                              <p className="text-sm">
                                When you change your subscription before it ends, you get money back for the days you didn't use. We calculate this by seeing how many days are left in your subscription period and giving you a discount based on that unused time. For example, if you paid KES 599 for a monthly subscription but only used it for 10 days out of 30, you'd get back KES 400 for the 20 unused days. This ensures you only pay for what you actually used, making subscription changes fair and worry-free.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <span>-KES {proRataDiscount}</span>
                      </div>
                    )}

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>To Pay</span>
                        <span className="text-blue-600">KES {finalPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Coupon Code Section - Moved to Left Side */}
                  <div className="space-y-3 pt-4 border-t">
                    {!state.showCouponInput ? (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Have a coupon code?</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setState(prev => ({ ...prev, showCouponInput: true }))}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-normal underline"
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

                  {/* Test Toggles */}
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="weekly"
                        checked={state.hasWeeklySubscription}
                        onChange={(e) => setState(prev => ({ ...prev, hasWeeklySubscription: e.target.checked }))}
                        className="rounded"
                      />
                      <Label htmlFor="weekly" className="text-sm">Has Weekly Subscription</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Right Side - Payment Method */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div 
                      className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                        state.paymentMethod === 'mpesa' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setState(prev => ({ ...prev, paymentMethod: 'mpesa' }))}
                    >
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/2560px-M-PESA_LOGO-01.svg.png" 
                        alt="M-PESA" 
                        className="h-6 w-auto"
                      />
                      <div className="flex-1">
                        <div className="font-semibold">M-PESA</div>
                        <div className="text-sm text-gray-500">Pay with your mobile money</div>
                      </div>
                    </div>

                    <div 
                      className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                        state.paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setState(prev => ({ ...prev, paymentMethod: 'card' }))}
                    >
                      <div className="flex space-x-2">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
                          alt="Visa" 
                          className="h-6 w-auto"
                        />
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
                          alt="Mastercard" 
                          className="h-6 w-auto"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Card</div>
                        <div className="text-sm text-gray-500">Visa, Mastercard accepted</div>
                      </div>
                    </div>
                  </div>

                  {/* Subscribe Button */}
                  <Button 
                    className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
                    onClick={() => console.log('Subscribe clicked', { finalPrice, paymentMethod: state.paymentMethod })}
                  >
                    Subscribe Now - KES {finalPrice}
                  </Button>

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
      </div>
    </TooltipProvider>
  );
};

export default CheckoutPage;
