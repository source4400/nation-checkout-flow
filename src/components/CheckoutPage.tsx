
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Smartphone } from 'lucide-react';

interface CheckoutState {
  hasCoupon: boolean;
  hasWeeklySubscription: boolean;
  paymentMethod: 'mpesa' | 'card';
}

const CheckoutPage = () => {
  const [state, setState] = useState<CheckoutState>({
    hasCoupon: false,
    hasWeeklySubscription: false,
    paymentMethod: 'mpesa'
  });

  const basePrice = 900;
  const couponDiscount = 100;
  const proRataDiscount = 280;

  const calculateTotal = () => {
    let total = basePrice;
    if (state.hasCoupon) {
      total -= couponDiscount;
    }
    if (state.hasWeeklySubscription) {
      total -= proRataDiscount;
    }
    return total;
  };

  const finalPrice = calculateTotal();

  return (
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
                  <p className="text-gray-600">Access to all premium content and features</p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Price</span>
                    <span className="font-semibold">KES {basePrice}</span>
                  </div>

                  {/* Coupon Section */}
                  {state.hasCoupon && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>Discount Coupon (NMG100)</span>
                      <span>-KES {couponDiscount}</span>
                    </div>
                  )}

                  {/* Pro-rata Discount */}
                  {state.hasWeeklySubscription && (
                    <div className="flex justify-between items-center text-blue-600">
                      <span>Pro-rata Discount</span>
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

                {/* Test Toggles */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="coupon"
                      checked={state.hasCoupon}
                      onChange={(e) => setState(prev => ({ ...prev, hasCoupon: e.target.checked }))}
                      className="rounded"
                    />
                    <Label htmlFor="coupon" className="text-sm">Apply Coupon Code</Label>
                  </div>
                  
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
                <RadioGroup
                  value={state.paymentMethod}
                  onValueChange={(value) => setState(prev => ({ ...prev, paymentMethod: value as 'mpesa' | 'card' }))}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="mpesa" id="mpesa" />
                    <Label htmlFor="mpesa" className="flex items-center space-x-3 cursor-pointer flex-1">
                      <Smartphone className="h-6 w-6 text-green-600" />
                      <div>
                        <div className="font-semibold">M-PESA</div>
                        <div className="text-sm text-gray-500">Pay with your mobile money</div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center space-x-3 cursor-pointer flex-1">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                      <div>
                        <div className="font-semibold">Credit/Debit Card</div>
                        <div className="text-sm text-gray-500">Visa, Mastercard accepted</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {/* Coupon Code Input */}
                {state.hasCoupon && (
                  <div className="space-y-2">
                    <Label htmlFor="couponCode">Coupon Code</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="couponCode" 
                        placeholder="Enter coupon code"
                        defaultValue="NMG100"
                        className="flex-1"
                      />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>
                )}

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
  );
};

export default CheckoutPage;

