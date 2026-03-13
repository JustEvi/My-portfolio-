"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { PageContent } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Save } from 'lucide-react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUpload } from '@/components/ui/custom/file-upload';

export default function AdminPagesPage() {
  const [content, setContent] = useState<Record<string, PageContent>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('page_content')
        .select('*');

      if (error) throw error;
      
      const contentMap: Record<string, PageContent> = {};
      if (data) {
        data.forEach((item: PageContent) => {
          contentMap[`${item.page_slug}_${item.section_name}`] = item;
        });
      }
      setContent(contentMap);
    } catch (error: any) {
      console.error('Error fetching page content:', error);
      toast.error('Failed to fetch page content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextChange = (pageSlug: string, sectionName: string, textValue: string) => {
    const key = `${pageSlug}_${sectionName}`;
    setContent(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        page_slug: pageSlug,
        section_name: sectionName,
        content: textValue,
        id: prev[key]?.id || ''
      }
    }));
  };

  const handleImageChange = (pageSlug: string, sectionName: string, imageUrl: string | null) => {
    const key = `${pageSlug}_${sectionName}`;
    setContent(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        page_slug: pageSlug,
        section_name: sectionName,
        image_url: imageUrl,
        id: prev[key]?.id || ''
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const supabase = createClient();
      
      // Upsert all modified content
      const itemsToUpdate = Object.values(content).filter(item => item.content !== undefined || item.image_url !== undefined).map(item => {
        const { id, updated_at, ...rest } = item;
        // If it has an ID it's an update, otherwise it's a new insert
        return id ? { id, ...rest, updated_at: new Date().toISOString() } : { ...rest, updated_at: new Date().toISOString() };
      });

      if (itemsToUpdate.length === 0) return;

      const { error } = await supabase
        .from('page_content')
        .upsert(itemsToUpdate, { onConflict: 'page_slug, section_name' });

      if (error) throw error;
      toast.success('Static pages content saved successfully');
      fetchContent();
    } catch (error: any) {
      console.error('Error saving content:', error);
      toast.error(error.message || 'Failed to save content');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
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
          <h1 className="font-serif text-3xl text-foreground">Static Pages</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage content for static pages like Home and About</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="flex items-center gap-2 bg-foreground text-primary-pale hover:bg-secondary-muted uppercase tracking-widest text-xs rounded-none"
        >
          {isSaving ? "Saving..." : <><Save size={16} /> Save Changes</>}
        </Button>
      </div>

      <Tabs defaultValue="home" className="w-full">
        <TabsList className="mb-8 w-full justify-start border-b border-border rounded-none h-auto p-0 bg-transparent flex gap-6">
          <TabsTrigger 
            value="home" 
            className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground pb-2 px-0 text-muted-foreground data-[state=active]:text-foreground uppercase tracking-widest text-xs font-semibold"
          >
            Home Page
          </TabsTrigger>
          <TabsTrigger 
            value="about" 
            className="rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground pb-2 px-0 text-muted-foreground data-[state=active]:text-foreground uppercase tracking-widest text-xs font-semibold"
          >
            About Page
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="home" className="space-y-8 mt-0 focus-visible:outline-none focus-visible:ring-0">
          <div className="bg-card border border-border p-6 md:p-8 rounded-lg shadow-sm">
             <h2 className="font-serif text-xl border-b border-border pb-4 mb-6">Hero Section</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Main Headline</label>
                    <Input 
                      value={content['home_hero_main_text']?.content || ''} 
                      onChange={(e) => handleTextChange('home', 'hero_main_text', e.target.value)}
                      className="h-11 border-border font-serif text-lg"
                      placeholder="e.g. Shaping Brands Through"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Sub Headline (Italicized)</label>
                    <Input 
                      value={content['home_hero_sub_text']?.content || ''} 
                      onChange={(e) => handleTextChange('home', 'hero_sub_text', e.target.value)}
                      className="h-11 border-border font-serif italic text-lg"
                      placeholder="e.g. Intentional Design"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Hero Description</label>
                    <Textarea 
                      value={content['home_hero_description']?.content || ''} 
                      onChange={(e) => handleTextChange('home', 'hero_description', e.target.value)}
                      className="min-h-[120px] border-border resize-y"
                    />
                  </div>
                </div>

                <div>
                  <FileUpload 
                    label="Upload Hero Image"
                    defaultValue={content['home_hero_image']?.image_url || undefined}
                    onUploadSuccess={(result) => handleImageChange('home', 'hero_image', result.secure_url)}
                    onRemove={() => handleImageChange('home', 'hero_image', null)}
                    className="w-full"
                  />
                </div>
             </div>
          </div>
        </TabsContent>
        
        <TabsContent value="about" className="space-y-8 mt-0 focus-visible:outline-none focus-visible:ring-0">
          <div className="bg-card border border-border p-6 md:p-8 rounded-lg shadow-sm">
             <h2 className="font-serif text-xl border-b border-border pb-4 mb-6">About Profile</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Pull Quote</label>
                    <Input 
                      value={content['about_about_quote']?.content || ''} 
                      onChange={(e) => handleTextChange('about', 'about_quote', e.target.value)}
                      className="h-11 border-border font-serif italic text-lg"
                      placeholder="Enter a meaningful quote"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Biography Paragraph</label>
                    <Textarea 
                      value={content['about_about_bio_text']?.content || ''} 
                      onChange={(e) => handleTextChange('about', 'about_bio_text', e.target.value)}
                      className="min-h-[200px] border-border resize-y"
                      placeholder="Extended bio..."
                    />
                  </div>
                </div>

                <div>
                  <FileUpload 
                    label="Upload Profile Image"
                    defaultValue={content['about_about_image']?.image_url || undefined}
                    onUploadSuccess={(result) => handleImageChange('about', 'about_image', result.secure_url)}
                    onRemove={() => handleImageChange('about', 'about_image', null)}
                    className="w-full"
                  />
                </div>
             </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
