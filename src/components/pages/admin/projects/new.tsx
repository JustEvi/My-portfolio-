"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, ArrowLeft, Plus, X } from 'lucide-react';
import NextLink from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { FileUpload } from '@/components/ui/custom/file-upload';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/ui/custom/rich-text-editor';
import { Screengrab } from '@/types';

// Let's create a local simpler Form instead of complex shadcn form to reduce boilerplate and dependency chaos since 'react-form' is not the standard react-hook-form
// The Next.js template used standard HTML forms. We'll stick with that standard flow.

export default function AdminNewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<{url: string, public_id: string} | null>(null);
  const [showCoverImage, setShowCoverImage] = useState(true);
  const [published, setPublished] = useState(false);
  const [category, setCategory] = useState("Brand Identity");
  const [categories, setCategories] = useState<{name: string}[]>([]);
  const [writeup, setWriteup] = useState<any>(null);
  const [screengrabs, setScreengrabs] = useState<Screengrab[]>([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('categories').select('name').order('name');
      if (data) setCategories(data);
      if (data && data.length > 0) setCategory(data[0].name);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const short_description = formData.get('short_description') as string;
    const toolsString = formData.get('tools') as string;
    const project_link = formData.get('project_link') as string;
    const year = formData.get('year') as string;
    const display_order = parseInt(formData.get('display_order') as string) || 0;

    // Generate slug from name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const tools = toolsString ? toolsString.split(',').map(t => t.trim()) : [];

    try {
      const supabase = createClient();
      
      const finalCoverUrl = coverImage?.url ? (showCoverImage ? coverImage.url : `${coverImage.url}#hidden`) : null;

      const { data, error } = await supabase
        .from('projects')
        .insert({
          slug,
          name,
          category,
          short_description,
          cover_image_url: finalCoverUrl,
          cover_image_public_id: coverImage?.public_id || null,
          tools,
          project_link,
          year,
          writeup,
          screengrabs,
          published,
          display_order
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
        alert(`Error creating project: ${error.message}`);
        return;
      }
      
      router.push('/admin/projects');
      router.refresh();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScreengrabUpload = (result: { secure_url: string; public_id: string }) => {
    setScreengrabs(prev => [...prev, {
      url: result.secure_url,
      public_id: result.public_id,
      caption: ''
    }]);
  };

  const updateScreengrabCaption = (index: number, caption: string) => {
    setScreengrabs(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], caption };
      return updated;
    });
  };

  const removeScreengrab = async (index: number) => {
    const grabToRemove = screengrabs[index];
    
    // Optimistically remove from UI
    setScreengrabs(prev => prev.filter((_, i) => i !== index));

    // Try deleting from Cloudinary
    try {
      await fetch('/api/delete-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id: grabToRemove.public_id })
      });
    } catch (e) {
      console.error("Failed to delete image from cloudinary", e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 mb-24 animate-in fade-in duration-500">
      <div className="mb-8 flex items-center gap-4">
        <NextLink href="/admin/projects" className="p-2 bg-muted rounded-full hover:bg-border transition-colors">
          <ArrowLeft size={18} className="text-foreground" />
        </NextLink>
        <div>
          <h1 className="font-serif text-3xl text-foreground">New Project</h1>
          <p className="text-muted-foreground mt-1 text-sm">Add a new portfolio piece to your site</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Basic Information */}
        <section className="bg-card border border-border p-6 md:p-8 rounded-lg shadow-sm space-y-6">
          <h2 className="font-serif text-2xl text-foreground border-b border-border pb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">Project Name *</Label>
              <Input id="name" name="name" required placeholder="e.g. Lumina Skincare" className="h-11" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category" className="text-xs uppercase tracking-widest text-muted-foreground">Category *</Label>
              <select 
                id="category" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-11 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {categories.length > 0 ? (
                  categories.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))
                ) : (
                  <option value="">Loading categories...</option>
                )}
              </select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="short_description" className="text-xs uppercase tracking-widest text-muted-foreground">Short Description (for listing cards)</Label>
              <Textarea id="short_description" name="short_description" placeholder="A brief 1-2 sentence summary" className="resize-none h-20" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year" className="text-xs uppercase tracking-widest text-muted-foreground">Year</Label>
              <Input id="year" name="year" placeholder="e.g. 2024" className="h-11" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project_link" className="text-xs uppercase tracking-widest text-muted-foreground">Live URL (optional)</Label>
              <Input id="project_link" name="project_link" type="url" placeholder="https://" className="h-11" />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="tools" className="text-xs uppercase tracking-widest text-muted-foreground">Tools Used (comma separated)</Label>
              <Input id="tools" name="tools" placeholder="Photoshop, Illustrator, Figma" className="h-11" />
            </div>
          </div>
        </section>

        {/* Media & Content */}
        <section className="bg-card border border-border p-6 md:p-8 rounded-lg shadow-sm space-y-6">
          <h2 className="font-serif text-2xl text-foreground border-b border-border pb-4">Media & Content</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground">Cover Image</Label>
              <div className="flex items-center gap-2">
                <Switch 
                  id="showCover" 
                  checked={showCoverImage} 
                  onCheckedChange={setShowCoverImage} 
                />
                <Label htmlFor="showCover" className="text-[10px] uppercase tracking-widest text-muted-foreground cursor-pointer">Show on Details Page</Label>
              </div>
            </div>
            <FileUpload 
              label="Upload Cover Image"
              defaultValue={coverImage?.url || undefined}
              onUploadSuccess={(result) => setCoverImage({ url: result.secure_url, public_id: result.public_id })}
              onRemove={() => setCoverImage(null)}
              className="w-full"
            />
          </div>

          <div className="space-y-4 pt-6">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground">Project Writeup</Label>
            <RichTextEditor 
              content={writeup} 
              onChange={(content) => setWriteup(content)} 
              placeholder="Detail the challenge, process, and solution..."
            />
          </div>

          {/* Screengrabs (Additional Images) */}
          <div className="space-y-4 pt-6">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground">Additional Images (Screengrabs)</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {screengrabs.map((grab, index) => (
                <div key={index} className="relative border border-border rounded-sm overflow-hidden bg-card flex flex-col group">
                  <div className="relative w-full aspect-video bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={grab.url} alt={`Screengrab ${index}`} className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => removeScreengrab(index)}
                      className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1.5 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="p-3">
                    <Input 
                      placeholder="Image caption (optional)" 
                      value={grab.caption}
                      onChange={(e) => updateScreengrabCaption(index, e.target.value)}
                      className="h-8 text-xs bg-transparent border-0 border-b border-border rounded-none focus-visible:ring-0 px-1"
                    />
                  </div>
                </div>
              ))}

              <FileUpload 
                label="Add Screenshot"
                onUploadSuccess={handleScreengrabUpload}
                className="w-full aspect-video"
              />
            </div>
          </div>
        </section>

        {/* Publishing */}
        <section className="bg-card border border-border p-6 md:p-8 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
            
            <div className="flex gap-12 items-center">
              <div className="space-y-2 w-32">
                <Label htmlFor="display_order" className="text-xs uppercase tracking-widest text-muted-foreground">List Order</Label>
                <Input id="display_order" name="display_order" type="number" defaultValue={0} className="h-11" />
              </div>
              
              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-widest text-muted-foreground block">Visibility</Label>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="published" 
                    checked={published} 
                    onCheckedChange={setPublished} 
                  />
                  <Label htmlFor="published" className="text-sm font-normal cursor-pointer">
                    {published ? "Published (Visible to public)" : "Draft (Hidden)"}
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex gap-4 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-border">
              <NextLink href="/admin/projects">
                <Button type="button" variant="outline" className="w-full md:w-auto h-12 px-8 uppercase tracking-widest text-xs rounded-none border-border">
                  Cancel
                </Button>
              </NextLink>
              <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto h-12 px-8 bg-foreground text-primary-blush hover:bg-secondary-muted uppercase tracking-widest text-xs rounded-none">
                {isSubmitting ? "Saving..." : "Save Project"}
              </Button>
            </div>
            
          </div>
        </section>
        
      </form>
    </div>
  );
}
