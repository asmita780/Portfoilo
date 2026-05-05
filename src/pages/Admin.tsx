import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, Plus, Trash2, Image, FileText, User, Briefcase, MessageCircle, Share2, LogOut } from 'lucide-react';
import { PortfolioData, Experience, Testimonial } from '../types';
import { useNavigate } from 'react-router-dom';

export default function Admin({ data, onUpdate }: { data: PortfolioData; onUpdate: (data: PortfolioData) => void }) {
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<'profile' | 'about' | 'experience' | 'testimonials' | 'socials'>('profile');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, we'd have a /api/me endpoint
    // For this demo, we'll try to fetch the current portfolio data to see if we're authed
    // (the server will return 401/403 if not)
    const checkAuth = async () => {
      try {
        // We just use a small probe to check if we can reach protected status
        // Alternatively, the parent component already fetches data. 
        // We'll trust the cookies but wrap the save in error detection.
        setCheckingAuth(false);
      } catch (err) {
        setAuthError('Authentication failed.');
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate('/login');
  };
  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        onUpdate(formData);
        setMessage('Changes saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (e) {
      setMessage('Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  const updateProfile = (field: string, value: string) => {
    setFormData({ ...formData, profile: { ...formData.profile, [field]: value } });
  };

  const updateAbout = (field: string, value: any) => {
    setFormData({ ...formData, about: { ...formData.about, [field]: value } });
  };

  const addExperience = () => {
    const newExp: Experience = { period: '20XX - 20XX', role: 'New Role', skills: 'Languages, Tools', description: 'Description here...' };
    setFormData({ ...formData, experience: [newExp, ...formData.experience] });
  };

  const addTestimonial = () => {
    const newTest: Testimonial = { name: 'Name', role: 'Role', quote: 'Quote', feedback: 'Feedback...', avatar: '' };
    setFormData({ ...formData, testimonials: [newTest, ...formData.testimonials] });
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="animate-spin w-12 h-12 border-4 border-brand-teal/20 border-t-brand-teal rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-[#f8f8f0]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-brand-orange/10 text-brand-orange text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border border-brand-orange/20">
                Author Account
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-teal font-sans">Dashboard</h1>
            <p className="text-brand-teal/40 mt-2 font-medium">Manage your professional identity and portfolio data.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-500 hover:text-red-500 px-4 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden md:inline">Logout</span>
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 bg-brand-teal text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-teal/90 transition-all disabled:opacity-50 shadow-lg"
            >
              {saving ? <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> : <Save className="w-5 h-5" />}
              <span>Save All Changes</span>
            </button>
          </div>
        </div>

        {message && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl text-center font-medium">
            {message}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Nav */}
          <div className="lg:col-span-1 space-y-2">
            {[
              { id: 'profile', label: 'Profile Hero', icon: User },
              { id: 'about', label: 'About & Journey', icon: FileText },
              { id: 'experience', label: 'Work Experience', icon: Briefcase },
              { id: 'testimonials', label: 'Testimonials', icon: MessageCircle },
              { id: 'socials', label: 'Social Links', icon: Share2 },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id ? 'bg-brand-teal text-white shadow-md' : 'text-gray-600 hover:bg-white hover:text-brand-teal'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Editor Content */}
          <div className="lg:col-span-3 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <Input label="Name" value={formData.profile.name} onChange={v => updateProfile('name', v)} />
                <Input label="Headline" value={formData.profile.title} onChange={v => updateProfile('title', v)} />
                <Input label="Years of Experience" value={formData.profile.experienceYears} onChange={v => updateProfile('experienceYears', v)} />
                <Input label="Profile Image URL" value={formData.profile.profileImage} onChange={v => updateProfile('profileImage', v)} />
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-6">
                <Textarea label="About Description" value={formData.about.description} onChange={v => updateAbout('description', v)} rows={4} />
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Journey Paragraphs</label>
                    <div className="space-y-4">
                        {formData.about.journey.map((para, i) => (
                            <Textarea 
                                key={i} 
                                label={`Paragraph ${i+1}`} 
                                value={para} 
                                onChange={v => {
                                    const newJourney = [...formData.about.journey];
                                    newJourney[i] = v;
                                    updateAbout('journey', newJourney);
                                }}
                            />
                        ))}
                    </div>
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-8">
                <button onClick={addExperience} className="flex items-center space-x-2 text-brand-teal font-bold text-sm bg-brand-teal/5 px-4 py-2 rounded-lg hover:bg-brand-teal/10">
                  <Plus className="w-4 h-4" /> <span>Add Experience</span>
                </button>
                {formData.experience.map((exp, i) => (
                  <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-200 relative group">
                    <button 
                        onClick={() => {
                            const newExp = formData.experience.filter((_, idx) => idx !== i);
                            setFormData({ ...formData, experience: newExp });
                        }}
                        className="absolute top-4 right-4 p-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <Input label="Period" value={exp.period} onChange={v => {
                        const next = [...formData.experience]; next[i].period = v; setFormData({ ...formData, experience: next });
                      }} />
                      <Input label="Role" value={exp.role} onChange={v => {
                        const next = [...formData.experience]; next[i].role = v; setFormData({ ...formData, experience: next });
                      }} />
                    </div>
                    <Input label="Skills (comma separated)" value={exp.skills} onChange={v => {
                      const next = [...formData.experience]; next[i].skills = v; setFormData({ ...formData, experience: next });
                    }} />
                    <div className="mt-4">
                      <Textarea label="Description" value={exp.description} onChange={v => {
                        const next = [...formData.experience]; next[i].description = v; setFormData({ ...formData, experience: next });
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="space-y-8">
                <button onClick={addTestimonial} className="flex items-center space-x-2 text-brand-teal font-bold text-sm bg-brand-teal/5 px-4 py-2 rounded-lg hover:bg-brand-teal/10">
                  <Plus className="w-4 h-4" /> <span>Add Testimonial</span>
                </button>
                {formData.testimonials.map((test, i) => (
                  <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-200 relative group">
                    <button 
                        onClick={() => {
                            const next = formData.testimonials.filter((_, idx) => idx !== i);
                            setFormData({ ...formData, testimonials: next });
                        }}
                        className="absolute top-4 right-4 p-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <Input label="Name" value={test.name} onChange={v => {
                        const next = [...formData.testimonials]; next[i].name = v; setFormData({ ...formData, testimonials: next });
                      }} />
                      <Input label="Role" value={test.role} onChange={v => {
                        const next = [...formData.testimonials]; next[i].role = v; setFormData({ ...formData, testimonials: next });
                      }} />
                    </div>
                    <Input label="Quote (short)" value={test.quote} onChange={v => {
                      const next = [...formData.testimonials]; next[i].quote = v; setFormData({ ...formData, testimonials: next });
                    }} />
                    <div className="mt-4">
                      <Textarea label="Feedback (long)" value={test.feedback} onChange={v => {
                        const next = [...formData.testimonials]; next[i].feedback = v; setFormData({ ...formData, testimonials: next });
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'socials' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(formData.socials).map(key => (
                  <Input 
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)} 
                    value={(formData.socials as any)[key]} 
                    onChange={v => setFormData({ ...formData, socials: { ...formData.socials, [key]: v } })} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string; key?: any }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all outline-none"
      />
    </div>
  );
}

function Textarea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number; key?: any }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={rows}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all outline-none resize-none"
      />
    </div>
  );
}
