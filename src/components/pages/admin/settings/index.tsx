"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { SiteSettings } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Save, Plus, Trash2, Camera } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setSettings(data as SiteSettings);
      } else {
        // Fallback default state if the row randomly wasn't created
        setSettings({
          id: '1',
          display_name: 'Evie.',
          full_name: 'Evie Adebayo',
          title: 'Creative Director',
          bio: '',
          logo_url: null,
          email: '',
          social_links: [],
          updated_at: new Date().toISOString()
        });
      }
    } catch (error: any) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to fetch settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof SiteSettings, value: any) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  const handleSocialLinkChange = (index: number, field: 'platform' | 'url', value: string) => {
    if (!settings || !settings.social_links) return;
    const newLinks = [...settings.social_links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    handleChange('social_links', newLinks);
  };

  const addSocialLink = () => {
    if (!settings) return;
    const currentLinks = settings.social_links || [];
    handleChange('social_links', [
      ...currentLinks, 
      { id: Date.now().toString(), platform: '', url: '' }
    ]);
  };

  const removeSocialLink = (index: number) => {
    if (!settings || !settings.social_links) return;
    const newLinks = settings.social_links.filter((_, i) => i !== index);
    handleChange('social_links', newLinks);
  };

  const handleSave = async () => {
    if (!settings) return;
    setIsSaving(true);
    try {
      const supabase = createClient();
      const { id, updated_at, ...updateData } = settings;
      
      const { error } = await supabase
        .from('site_settings')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      toast.success('Settings saved successfully');
      fetchSettings();
    } catch (error: any) {
      console.error('Error saving settings:', error);
      toast.error(error.message || 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !settings) {
    return (
      <div className="w-full max-w-4xl mx-auto py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-40 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Global Settings</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage your brand identity across the site</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="flex items-center gap-2 bg-foreground text-primary-pale hover:bg-secondary-muted uppercase tracking-widest text-xs rounded-none"
        >
          {isSaving ? "Saving..." : <><Save size={16} /> Save Changes</>}
        </Button>
      </div>

      <div className="space-y-8">
        {/* Brand Information */}
        <div className="bg-card border border-border p-6 md:p-8 rounded-lg shadow-sm">
          <h2 className="font-serif text-xl border-b border-border pb-4 mb-6">Brand Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 flex flex-col md:flex-row gap-6 items-start">
               <div>
                 <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Logo</label>
                 <div className="relative group w-32 h-32 bg-muted border border-border rounded-lg overflow-hidden flex items-center justify-center">
                    {settings.logo_url ? (
                      <Image src={settings.logo_url} alt="Logo" fill className="object-cover" />
                    ) : (
                      <span className="text-xs text-muted-foreground uppercase tracking-wider text-center px-4">No Logo</span>
                    )}
                    
                    <CldUploadWidget 
                      uploadPreset="evie_portfolio"
                      onSuccess={(result: any) => {
                        handleChange('logo_url', result.info.secure_url);
                      }}
                    >
                      {({ open }) => (
                        <div 
                          className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer"
                          onClick={() => open()}
                        >
                          <Camera size={24} className="text-foreground mb-2" />
                          <span className="text-[10px] uppercase font-medium tracking-widest">Change</span>
                        </div>
                      )}
                    </CldUploadWidget>
                 </div>
                 {settings.logo_url && (
                   <button 
                     className="mt-2 text-[10px] uppercase tracking-widest text-destructive hover:underline"
                     onClick={() => handleChange('logo_url', null)}
                   >
                     Remove Logo
                   </button>
                 )}
               </div>
               <div className="flex-1 w-full space-y-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Display Name (Header/Footer)</label>
                    <Input 
                      value={settings.display_name} 
                      onChange={(e) => handleChange('display_name', e.target.value)}
                      className="h-11 border-border font-serif text-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Full Name</label>
                    <Input 
                      value={settings.full_name} 
                      onChange={(e) => handleChange('full_name', e.target.value)}
                      className="h-11 border-border"
                    />
                  </div>
               </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Professional Title</label>
              <Input 
                value={settings.title} 
                onChange={(e) => handleChange('title', e.target.value)}
                className="h-11 border-border"
              />
            </div>

             <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Email Address</label>
              <Input 
                type="email"
                value={settings.email || ''} 
                onChange={(e) => handleChange('email', e.target.value)}
                className="h-11 border-border"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Short Bio</label>
              <Textarea 
                value={settings.bio} 
                onChange={(e) => handleChange('bio', e.target.value)}
                className="min-h-[120px] border-border resize-y"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-card border border-border p-6 md:p-8 rounded-lg shadow-sm">
          <div className="flex justify-between items-center border-b border-border pb-4 mb-6">
            <h2 className="font-serif text-xl">Social Links</h2>
            <Button 
               variant="outline" 
               size="sm" 
               onClick={addSocialLink}
               className="uppercase tracking-widest text-[10px] h-8"
            >
              <Plus size={14} className="mr-1" /> Add Link
            </Button>
          </div>

          {!settings.social_links || settings.social_links.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No social links added yet.</p>
          ) : (
            <div className="space-y-4">
              {settings.social_links.map((link, index) => (
                <div key={link.id || index} className="flex gap-4 items-start">
                  <div className="w-1/3">
                    <Input 
                      placeholder="Platform (e.g. Twitter)" 
                      value={link.platform}
                      onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                      className="h-10 border-border"
                    />
                  </div>
                  <div className="flex-1">
                    <Input 
                      placeholder="URL (https://...)" 
                      value={link.url}
                      onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                      className="h-10 border-border"
                    />
                  </div>
                  <button 
                    onClick={() => removeSocialLink(index)}
                    className="p-2 h-10 text-muted-foreground hover:text-destructive transition-colors bg-muted rounded-md shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
