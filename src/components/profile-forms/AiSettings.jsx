import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import api from '../../api/axios';
import { updateUser } from '../../features/auth/authSlice';
import { FaRobot, FaGem, FaCommentSlash, FaEnvelope } from 'react-icons/fa';

const AiSettings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [settings, setSettings] = useState({
    enabled: true,
    freeQuestions: 5,
    afterFreeLimit: 'contact',
    diamondCostPerPackage: 15,
    repliesPerPackage: 5,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.aiConversationSettings) {
      setSettings((prev) => ({
        ...prev,
        ...user.aiConversationSettings,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.patch("/auth/profile", {
        aiConversationSettings: settings,
      });
      if (res.data.user) {
        dispatch(updateUser(res.data.user));
        toast.success("🤖 AI Settings updated successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update AI settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="pb-6 border-b border-border-subtle space-y-1">
            <h3 className="text-xl font-black text-text-main flex items-center gap-3">
                <FaRobot className="text-primary" /> AI Conversation Settings
            </h3>
            <p className="text-[10px] text-text-muted font-black uppercase tracking-widest leading-loose opacity-60">
                Manage how the AI Portfolio Guide interacts with your visitors.
            </p>
        </div>

        <form onSubmit={handleSave} className="max-w-xl space-y-8">
            
            {/* Enable/Disable AI */}
            <div className="flex items-center justify-between p-6 bg-foreground/5 rounded-2xl border border-border-subtle hover:border-primary/30 transition-colors">
              <div>
                <p className="font-bold text-text-main">Enable AI Portfolio Guide</p>
                <p className="text-[10px] text-text-muted font-black uppercase tracking-widest mt-1 opacity-70">
                  Allow visitors to ask questions about your profile.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="enabled" 
                  checked={settings.enabled} 
                  onChange={handleChange} 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-foreground/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className={`space-y-8 transition-opacity duration-300 ${!settings.enabled ? 'opacity-40 pointer-events-none' : ''}`}>
              
              {/* Free Limits */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1 opacity-60">
                  Global Daily Free AI Replies
                </label>
                <input
                  type="number"
                  name="freeQuestions"
                  value={settings.freeQuestions}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full px-5 py-4 rounded-2xl border border-border-subtle bg-foreground/10 text-text-main focus:border-primary/50 outline-none transition-all font-semibold text-sm"
                />
                <p className="text-[9px] font-bold text-text-muted ml-2">Total number of free answers the AI will give per 24 hours across ALL visitors.</p>
              </div>

              {/* Action after limit */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1 opacity-60">
                  Action After Limit Reached
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className={`cursor-pointer flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${settings.afterFreeLimit === 'smart_diamonds' ? 'border-primary bg-primary/10' : 'border-border-subtle bg-foreground/5 hover:bg-foreground/10'}`}>
                    <input type="radio" name="afterFreeLimit" value="smart_diamonds" checked={settings.afterFreeLimit === 'smart_diamonds'} onChange={handleChange} className="hidden" />
                    <FaGem className={settings.afterFreeLimit === 'smart_diamonds' ? 'text-primary' : 'text-text-muted'} size={24} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-center">Smart Auto-Pay (Recommended)</span>
                  </label>

                  <label className={`cursor-pointer flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${settings.afterFreeLimit === 'diamonds' ? 'border-emerald-500 bg-emerald-500/10' : 'border-border-subtle bg-foreground/5 hover:bg-foreground/10'}`}>
                    <input type="radio" name="afterFreeLimit" value="diamonds" checked={settings.afterFreeLimit === 'diamonds'} onChange={handleChange} className="hidden" />
                    <FaGem className={settings.afterFreeLimit === 'diamonds' ? 'text-emerald-500' : 'text-text-muted'} size={24} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-center">Fixed Packages (Old System)</span>
                  </label>

                  <label className={`cursor-pointer flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${settings.afterFreeLimit === 'disable' ? 'border-rose-500 bg-rose-500/10' : 'border-border-subtle bg-foreground/5 hover:bg-foreground/10'}`}>
                    <input type="radio" name="afterFreeLimit" value="disable" checked={settings.afterFreeLimit === 'disable'} onChange={handleChange} className="hidden" />
                    <FaCommentSlash className={settings.afterFreeLimit === 'disable' ? 'text-rose-500' : 'text-text-muted'} size={24} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-center">Block Chat completely</span>
                  </label>

                  <label className={`cursor-pointer flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${settings.afterFreeLimit === 'contact' ? 'border-orange-500 bg-orange-500/10' : 'border-border-subtle bg-foreground/5 hover:bg-foreground/10'}`}>
                    <input type="radio" name="afterFreeLimit" value="contact" checked={settings.afterFreeLimit === 'contact'} onChange={handleChange} className="hidden" />
                    <FaEnvelope className={settings.afterFreeLimit === 'contact' ? 'text-orange-500' : 'text-text-muted'} size={24} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-center">Fake System Fault & Contact</span>
                  </label>
                </div>
              </div>

              {settings.afterFreeLimit === 'smart_diamonds' && (
                <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl space-y-4">
                  <div className="flex items-start gap-3">
                    <FaGem className="text-primary mt-1" />
                    <div>
                      <p className="text-sm font-bold text-primary">Smart Tiered Auto-Deduction Active</p>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mt-1 leading-relaxed">
                        After {settings.freeQuestions} free queries, we offer a grace period of 2 free replies. Then it scales dynamically: 15💎 for first 5 extra, +5💎 for next 5, etc. Max 20 extra queries allowed.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {settings.afterFreeLimit === 'diamonds' && (
                <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl space-y-4">
                  <div className="flex items-start gap-3">
                    <FaGem className="text-emerald-500 mt-1" />
                    <div>
                      <p className="text-sm font-bold text-emerald-400">Fixed Package Auto-Deduction</p>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mt-1 leading-relaxed">
                        When global daily limit exhausts, {settings.diamondCostPerPackage} diamonds will be deducted from your wallet to grant {settings.repliesPerPackage} AI replies. No grace period.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div className="pt-6 border-t border-border-subtle flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform disabled:opacity-50 shadow-[0_0_20px_var(--primary-color)]/30"
                >
                    {loading ? "Saving..." : "Save AI Limits"}
                </button>
            </div>
        </form>
      </section>
    </div>
  );
};

export default AiSettings;
