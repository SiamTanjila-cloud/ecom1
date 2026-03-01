import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, CreditCard, Truck, ChevronRight, Check, Shield, MapPin } from 'lucide-react';
import { formatCurrency } from '../../utils';
import PRODUCTS from '../../data/products';

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'US',
    cardNumber: '', expiry: '', cvv: '', nameOnCard: '',
    shippingMethod: 'standard',
    saveInfo: true,
  });

  const cartItems = [
    { product: PRODUCTS[0], quantity: 1 },
    { product: PRODUCTS[7], quantity: 2 },
  ];

  const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const shipping = formData.shippingMethod === 'express' ? 14.99 : subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + tax + shipping;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const steps = [
    { num: 1, label: 'Shipping', icon: MapPin },
    { num: 2, label: 'Payment', icon: CreditCard },
    { num: 3, label: 'Review', icon: Check },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>Checkout</h1>
            <div className="flex items-center gap-1 text-sm text-slate-400">
              <Lock className="h-3.5 w-3.5" /> Secure Checkout
            </div>
          </div>

          {/* Steps */}
          <div className="flex items-center justify-center gap-4 mt-6">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${step >= s.num ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                  {step > s.num ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-slate-300" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 lg:p-8 space-y-6 animate-fade-in">
                <h2 className="text-xl font-bold text-slate-900">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'firstName', label: 'First Name', placeholder: 'John' },
                    { name: 'lastName', label: 'Last Name', placeholder: 'Doe' },
                    { name: 'email', label: 'Email', placeholder: 'john@example.com', type: 'email', full: true },
                    { name: 'phone', label: 'Phone', placeholder: '+1 (555) 123-4567' },
                    { name: 'address', label: 'Street Address', placeholder: '123 Main Street', full: true },
                    { name: 'city', label: 'City', placeholder: 'San Francisco' },
                    { name: 'state', label: 'State', placeholder: 'California' },
                    { name: 'zip', label: 'ZIP Code', placeholder: '94102' },
                  ].map((field) => (
                    <div key={field.name} className={field.full ? 'sm:col-span-2' : ''}>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
                      <input
                        name={field.name}
                        type={field.type || 'text'}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none transition-all"
                      />
                    </div>
                  ))}
                </div>

                {/* Shipping Method */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Shipping Method</h3>
                  <div className="space-y-3">
                    {[
                      { value: 'standard', label: 'Standard Shipping', desc: '5-7 business days', price: subtotal > 100 ? 'Free' : '$9.99' },
                      { value: 'express', label: 'Express Shipping', desc: '2-3 business days', price: '$14.99' },
                    ].map((method) => (
                      <label key={method.value} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${formData.shippingMethod === method.value ? 'border-violet-500 bg-violet-50' : 'border-slate-200 hover:border-slate-300'
                        }`}>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="shippingMethod" value={method.value} checked={formData.shippingMethod === method.value} onChange={handleChange} className="text-violet-600 focus:ring-violet-500" />
                          <div>
                            <p className="text-sm font-medium text-slate-900">{method.label}</p>
                            <p className="text-xs text-slate-500">{method.desc}</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{method.price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button onClick={() => setStep(2)} className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all text-sm">
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 lg:p-8 space-y-6 animate-fade-in">
                <h2 className="text-xl font-bold text-slate-900">Payment Information</h2>
                <div className="p-4 bg-slate-50 rounded-xl flex items-center gap-3">
                  <Shield className="h-5 w-5 text-emerald-500" />
                  <p className="text-sm text-slate-600">Your payment information is encrypted and secure.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="4242 4242 4242 4242"
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Name on Card</label>
                    <input name="nameOnCard" value={formData.nameOnCard} onChange={handleChange} placeholder="John Doe"
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Expiry Date</label>
                      <input name="expiry" value={formData.expiry} onChange={handleChange} placeholder="MM/YY"
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">CVV</label>
                      <input name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" type="password"
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="px-6 py-3.5 border border-slate-200 text-slate-700 font-medium rounded-2xl hover:bg-slate-50 transition-all text-sm">Back</button>
                  <button onClick={() => setStep(3)} className="flex-1 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg shadow-violet-500/25 transition-all text-sm">Review Order</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 lg:p-8 space-y-6 animate-fade-in">
                <h2 className="text-xl font-bold text-slate-900">Review Your Order</h2>
                <div className="space-y-4">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                      <img src={item.product.images[0]} alt="" className="h-16 w-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-slate-900">{item.product.name}</p>
                        <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-slate-900">{formatCurrency(item.product.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-sm">
                  <p className="font-medium text-slate-900">Shipping to:</p>
                  <p className="text-slate-600">{formData.firstName || 'John'} {formData.lastName || 'Doe'}</p>
                  <p className="text-slate-500">{formData.address || '123 Main St'}, {formData.city || 'San Francisco'}, {formData.state || 'CA'} {formData.zip || '94102'}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="px-6 py-3.5 border border-slate-200 text-slate-700 font-medium rounded-2xl hover:bg-slate-50 transition-all text-sm">Back</button>
                  <button className="flex-1 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg shadow-violet-500/25 transition-all text-sm flex items-center justify-center gap-2">
                    <Lock className="h-4 w-4" /> Place Order — {formatCurrency(total)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 lg:sticky lg:top-24">
              <h3 className="font-bold text-lg mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative">
                      <img src={item.product.images[0]} alt="" className="h-12 w-12 rounded-lg object-cover" />
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-slate-900 text-white text-[10px] rounded-full flex items-center justify-center">{item.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{item.product.name}</p>
                    </div>
                    <p className="text-sm font-medium">{formatCurrency(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm border-t border-slate-100 pt-4">
                <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                <div className="flex justify-between text-slate-600"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
                <div className="flex justify-between text-slate-600"><span>Shipping</span><span>{shipping === 0 ? <span className="text-emerald-600">Free</span> : formatCurrency(shipping)}</span></div>
                <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-lg text-slate-900"><span>Total</span><span>{formatCurrency(total)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;