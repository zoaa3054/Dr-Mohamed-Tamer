import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLandingData } from '../hooks/useLandingData';
import { useTranslation } from 'react-i18next';
import { Save, Loader2, Globe, Shield, User, Award, CheckCircle, Mail, Eye, Menu } from 'lucide-react';
import LandingPage from './LandingPage';

// Refactored Components
import { AdminSidebar } from '../components/Admin/AdminSidebar';
import { ListSection } from '../components/Admin/ListSection';
import { SectionCard, Input, Textarea } from '../components/Admin/AdminUI';

import { useBlocker, useBeforeUnload } from 'react-router-dom';
import { cn } from '@/lib/utils';

const AdminPage = () => {
  const { logout, updatePassword } = useAuth();
  const { data, loading, updateData } = useLandingData();
  const { t } = useTranslation();
  const [formData, setFormData] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [lastTab, setLastTab] = useState('hero');
  const [newPass, setNewPass] = useState('');
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  // Detect changes
  useEffect(() => {
    if (data && formData) {
      const changed = JSON.stringify(data) !== JSON.stringify(formData);
      setIsDirty(changed);
    }
  }, [formData, data]);

  // Block tab/browser close
  useBeforeUnload(
    React.useCallback(
      (event) => {
        if (isDirty) {
          event.preventDefault();
        }
      },
      [isDirty]
    )
  );

  // Block internal navigation
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateData(formData);
      setIsDirty(false);
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 3000);
    } catch (error) {
      alert('Error saving changes: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePassUpdate = async () => {
    if (!newPass) return;
    if (await updatePassword(newPass)) {
      alert('Password updated successfully!');
      setNewPass('');
    }
  };

  // Handle blocked navigation confirmation
  useEffect(() => {
    if (blocker.state === 'blocked') {
      const proceed = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (proceed) blocker.proceed();
      else blocker.reset();
    }
  }, [blocker]);

  const handleLogout = () => {
    if (isDirty) {
      if (window.confirm('You have unsaved changes. If you logout, changes will be lost. Proceed?')) {
        logout();
      }
    } else {
      logout();
    }
  };

  if (loading || !formData) return <div className="flex items-center justify-center min-h-screen bg-background"><Loader2 className="animate-spin text-primary" /></div>;

  const tabs = [
    { id: 'hero', label: 'Hero', icon: <Globe size={18} /> },
    { id: 'about', label: 'About', icon: <User size={18} /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Award size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'preview', label: 'Live Preview', icon: <Eye size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          if (activeTab !== 'preview') setLastTab(activeTab);
          setActiveTab(tab);
        }} 
        onLogout={handleLogout} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <header className="h-16 border-b bg-card/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 md:hidden hover:bg-muted rounded-lg"
            >
              <Menu size={20} />
            </button>
            <h2 className="font-bold text-lg md:text-xl capitalize truncate max-w-[120px] sm:max-w-none">
              {activeTab.replace('-', ' ')}
            </h2>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            {isDirty && (
              <span className="flex items-center gap-1.5 text-amber-500 text-[10px] md:text-xs font-bold uppercase tracking-wider animate-pulse whitespace-nowrap">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-500 shrink-0" />
                <span className="hidden xs:inline">Unsaved changes</span>
                <span className="xs:hidden">Unsaved</span>
              </span>
            )}
            
            {/* Quick Preview Toggle (Mobile & Desktop) */}
            <button 
              onClick={() => {
                if (activeTab === 'preview') {
                  setActiveTab(lastTab);
                } else {
                  setLastTab(activeTab);
                  setActiveTab('preview');
                }
              }}
              className={cn(
                "p-2 rounded-full border transition-all md:hidden",
                activeTab === 'preview' ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-muted"
              )}
              title="Toggle Preview"
            >
              <Eye size={20} />
            </button>

            <button 
              onClick={handleSave} 
              disabled={saving}
              className="flex items-center gap-2 px-4 md:px-6 py-2 bg-primary text-primary-foreground rounded-full font-bold transition-all shadow-lg shadow-primary/10 disabled:opacity-50 text-sm md:text-base"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              <span className="hidden sm:inline">Save Changes</span>
            </button>
          </div>
        </header>

        <div className="p-4 md:p-8 w-full max-w-screen-2xl mx-auto">
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <SectionCard title="Hero Titles" description="The main heading shown at the top of your landing page.">
                <div className="grid gap-6 md:grid-cols-3">
                  <Input label="Title (EN)" value={formData.hero.titleEn} onChange={(v) => setFormData({...formData, hero: {...formData.hero, titleEn: v}})} />
                  <Input label="Title (AR)" value={formData.hero.titleAr} onChange={(v) => setFormData({...formData, hero: {...formData.hero, titleAr: v}})} />
                  <Input label="Title (TR)" value={formData.hero.titleTr} onChange={(v) => setFormData({...formData, hero: {...formData.hero, titleTr: v}})} />
                </div>
              </SectionCard>
              <SectionCard title="Hero Subtitles" description="A short description under the main heading.">
                <div className="grid gap-6 md:grid-cols-3">
                  <Textarea label="Subtitle (EN)" value={formData.hero.subtitleEn} onChange={(v) => setFormData({...formData, hero: {...formData.hero, subtitleEn: v}})} />
                  <Textarea label="Subtitle (AR)" value={formData.hero.subtitleAr} onChange={(v) => setFormData({...formData, hero: {...formData.hero, subtitleAr: v}})} />
                  <Textarea label="Subtitle (TR)" value={formData.hero.subtitleTr} onChange={(v) => setFormData({...formData, hero: {...formData.hero, subtitleTr: v}})} />
                </div>
              </SectionCard>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <SectionCard title="About Story" description="Share your background, education, and practice philosophy.">
                <div className="grid gap-6 md:grid-cols-3">
                  <Textarea label="Story (EN)" value={formData.about.contentEn} onChange={(v) => setFormData({...formData, about: {...formData.about, contentEn: v}})} />
                  <Textarea label="Story (AR)" value={formData.about.contentAr} onChange={(v) => setFormData({...formData, about: {...formData.about, contentAr: v}})} />
                  <Textarea label="Story (TR)" value={formData.about.contentTr} onChange={(v) => setFormData({...formData, about: {...formData.about, contentTr: v}})} />
                </div>
              </SectionCard>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="grid md:grid-cols-2 gap-8">
              <ListSection 
                title="Certificates" 
                icon={<Award size={20} className="text-primary" />}
                items={formData.certificates} 
                onUpdate={(items) => setFormData({...formData, certificates: items})}
                renderItem={(item, onChange) => (
                  <div className="grid grid-cols-4 gap-2">
                    <input className="col-span-3 p-2 border rounded-lg bg-background" value={item.title} onChange={(e) => onChange({...item, title: e.target.value})} placeholder="Certificate Title" />
                    <input className="p-2 border rounded-lg bg-background" value={item.year} onChange={(e) => onChange({...item, year: e.target.value})} placeholder="Year" />
                  </div>
                )}
              />
              <ListSection 
                title="Accomplishments" 
                icon={<CheckCircle size={20} className="text-primary" />}
                items={formData.accomplishments} 
                onUpdate={(items) => setFormData({...formData, accomplishments: items})}
                renderItem={(item, onChange) => (
                  <input className="w-full p-2 border rounded-lg bg-background" value={item.title} onChange={(e) => onChange({...item, title: e.target.value})} placeholder="Description" />
                )}
              />
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <SectionCard title="Contact Info" description="Direct communication channels for your patients.">
                <div className="grid gap-6 md:grid-cols-2">
                  <Input label="Email" value={formData.contact.email} onChange={(v) => setFormData({...formData, contact: {...formData.contact, email: v}})} />
                  <Input label="Phone" value={formData.contact.phone} onChange={(v) => setFormData({...formData, contact: {...formData.contact, phone: v}})} />
                </div>
              </SectionCard>
              <SectionCard title="Social Media" description="Links to your professional social profiles.">
                <div className="grid gap-6 md:grid-cols-2">
                  <Input label="Instagram" value={formData.socials.instagram} onChange={(v) => setFormData({...formData, socials: {...formData.socials, instagram: v}})} />
                  <Input label="Facebook" value={formData.socials.facebook} onChange={(v) => setFormData({...formData, socials: {...formData.socials, facebook: v}})} />
                  <Input label="LinkedIn" value={formData.socials.linkedin} onChange={(v) => setFormData({...formData, socials: {...formData.socials, linkedin: v}})} />
                  <Input label="WhatsApp" value={formData.socials.whatsapp} onChange={(v) => setFormData({...formData, socials: {...formData.socials, whatsapp: v}})} />
                </div>
              </SectionCard>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="max-w-md">
              <SectionCard title="Admin Credentials" description="Change your dashboard access password.">
                <div className="space-y-4">
                  <Input label="New Password" type="password" value={newPass} onChange={setNewPass} />
                  <button 
                    onClick={handlePassUpdate} 
                    className="w-full px-6 py-2 bg-foreground text-background rounded-lg font-bold hover:opacity-90 transition-all"
                  >
                    Update Admin Password
                  </button>
                </div>
              </SectionCard>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="rounded-2xl border bg-card overflow-hidden shadow-2xl h-[calc(100vh-180px)] flex flex-col animate-in zoom-in-95 duration-500">
              {/* Browser Header Mockup */}
              <div className="bg-muted/50 p-3 flex items-center justify-between border-b backdrop-blur-sm">
                <div className="flex gap-2 px-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 max-w-md mx-4">
                  <div className="bg-background/50 border rounded-lg px-3 py-1 text-[10px] text-muted-foreground truncate text-center">
                    https://dr-mohamed-tamer.com/preview
                  </div>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground px-2">
                  <Globe size={14} />
                  <div className="text-[10px] font-bold tracking-tighter">LIVE</div>
                </div>
              </div>
              
              {/* Preview Container */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden bg-background custom-scrollbar flex justify-center">
                <div className="origin-top transition-transform duration-300 transform scale-[0.9] w-[111.1%] mx-auto">
                  <LandingPage previewData={formData} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Success Toast */}
      {showSavedToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 backdrop-blur-md">
            <CheckCircle size={20} />
            <span className="font-bold tracking-tight">Changes Saved Successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
