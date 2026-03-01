import { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Shield, Bell, Globe, Save, Eye, EyeOff } from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567', address: '123 Main Street',
    city: 'San Francisco', state: 'California', zip: '94102', country: 'United States',
    bio: 'Passionate about technology and design.',
  });
  const [notifications, setNotifications] = useState({
    orderUpdates: true, promotions: true, newsletter: false, sms: false,
  });

  const handleChange = (e) => setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8" style={{ fontFamily: 'var(--font-display)' }}>Account Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 lg:sticky lg:top-24">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="h-24 w-24 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-violet-500/25">
                    JD
                  </div>
                  <button className="absolute -bottom-1 -right-1 h-8 w-8 bg-white rounded-xl border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-50 transition-all">
                    <Camera className="h-3.5 w-3.5 text-slate-500" />
                  </button>
                </div>
                <h3 className="font-bold text-slate-900 mt-3">{profile.firstName} {profile.lastName}</h3>
                <p className="text-sm text-slate-500">{profile.email}</p>
              </div>

              {/* Tabs */}
              <nav className="space-y-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                  >
                    <tab.icon className="h-4 w-4" /> {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 lg:p-8 animate-fade-in">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Personal Information</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'firstName', label: 'First Name', icon: User },
                      { name: 'lastName', label: 'Last Name', icon: User },
                      { name: 'email', label: 'Email', icon: Mail, type: 'email', full: true },
                      { name: 'phone', label: 'Phone', icon: Phone },
                    ].map(field => (
                      <div key={field.name} className={field.full ? 'sm:col-span-2' : ''}>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
                        <div className="relative">
                          <field.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            name={field.name}
                            type={field.type || 'text'}
                            value={profile[field.name]}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Bio</label>
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none resize-none"
                    />
                  </div>

                  <h3 className="font-bold text-slate-900 pt-4 border-t border-slate-100">Address</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'address', label: 'Street Address', full: true },
                      { name: 'city', label: 'City' },
                      { name: 'state', label: 'State' },
                      { name: 'zip', label: 'ZIP Code' },
                      { name: 'country', label: 'Country' },
                    ].map(field => (
                      <div key={field.name} className={field.full ? 'sm:col-span-2' : ''}>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
                        <input
                          name={field.name}
                          value={profile[field.name]}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all text-sm flex items-center gap-2">
                    <Save className="h-4 w-4" /> Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 lg:p-8 animate-fade-in space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Security</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Password</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none" />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                    <input type="password" placeholder="••••••••"
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm New Password</label>
                    <input type="password" placeholder="••••••••"
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none" />
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-violet-500/25 text-sm flex items-center gap-2">
                    <Shield className="h-4 w-4" /> Update Password
                  </button>
                </div>
                <div className="pt-6 border-t border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-medium text-sm text-slate-900">2FA is currently disabled</p>
                      <p className="text-xs text-slate-500 mt-0.5">Add an extra layer of security to your account</p>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-violet-600 bg-violet-50 rounded-xl hover:bg-violet-100">Enable</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 lg:p-8 animate-fade-in space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { key: 'orderUpdates', label: 'Order Updates', desc: 'Get notified about your order status changes' },
                    { key: 'promotions', label: 'Promotions & Deals', desc: 'Receive special offers and discount codes' },
                    { key: 'newsletter', label: 'Newsletter', desc: 'Weekly newsletter with product highlights' },
                    { key: 'sms', label: 'SMS Notifications', desc: 'Receive text messages for important updates' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-medium text-sm text-slate-900">{item.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[item.key]}
                          onChange={(e) => setNotifications(prev => ({ ...prev, [item.key]: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:ring-4 peer-focus:ring-violet-500/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 lg:p-8 animate-fade-in space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Preferences</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Language</label>
                    <select className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none">
                      <option>English</option><option>Spanish</option><option>French</option><option>German</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Currency</label>
                    <select className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none">
                      <option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Timezone</label>
                    <select className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 outline-none">
                      <option>Pacific Time (PT)</option><option>Eastern Time (ET)</option><option>UTC</option>
                    </select>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-violet-500/25 text-sm flex items-center gap-2">
                    <Save className="h-4 w-4" /> Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;