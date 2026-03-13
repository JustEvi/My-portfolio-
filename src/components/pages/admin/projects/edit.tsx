"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, X } from 'lucide-react';
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

export default function AdminEditProjectPage({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  
  // Form States
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [year, setYear] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [toolsStr, setToolsStr] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  
  const [coverImage, setCoverImage] = useState<{url: string, public_id: string} | null>(null);
  const [published, setPublished] = useState(false);
  const [category, setCategory] = useState("Brand Identity");
  const [categories, setCategories] = useState<{name: string}[]>([]);
  const [writeup, setWriteup] = useState<any>(null);
  const [screengrabs, setScreengrabs] = useState<Screengrab[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      
      // Fetch categories
      const { data: catData } = await supabase.from('categories').select('name').order('name');
      if (catData) setCategories(catData);

      // Fetch existing project data
      const { data: projData, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();
        
      if (projData) {
        setName(projData.name || "");
        setShortDescription(projData.short_description || "");
        setYear(projData.year || "");
        setProjectLink(projData.project_link || "");
        setToolsStr(projData.tools ? projData.tools.join(", ") : "");
        setDisplayOrder(projData.display_order || 0);
        
        if (projData.cover_image_url && projData.cover_image_public_id) {
          setCoverImage({
            url: projData.cover_image_url,
            public_id: projData.cover_image_public_id
          });
        }
        
        setPublished(projData.published || false);
        setCategory(projData.category || (catData ? catData[0]?.name : ""));
        setWriteup(projData.writeup || null);
        setScreengrabs(projData.screengrabs || []);
      }
      
      setLoadingInitial(false);
    };
    
    fetchData();
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Generate new slug in case name changed
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const tools = toolsStr ? toolsStr.split(',').map(t => t.trim()) : [];

    try {
      const supabase = createClient();
      
      const { error } = await supabase
        .from('projects')
        .update({
          slug,
          name,
          category,
          short_description: shortDescription,
          cover_image_url: coverImage?.url || null,
          cover_image_public_id: coverImage?.public_id || null,
          tools,
          project_link: projectLink,
          year,
          writeup,
          screengrabs,
          published,
          display_order: displayOrder
        })
        .eq('id', projectId);

      if (error) {
        console.error("Supabase update error:", error);
        alert(`Error updating project: ${error.message}`);
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

  if (loadingInitial) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-8 h-8 rounded-full border-2 border-foreground border-t-transparent animate-spin"></div>
        <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Loading Project Data...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 mb-24 animate-in fade-in duration-500">
      <div className="mb-8 flex items-center gap-4">
        <NextLink href="/admin/projects" className="p-2 bg-muted rounded-full hover:bg-border transition-colors">
          <ArrowLeft size={18} className="text-foreground" />
        </NextLink>
        <div>
          <h1 className="font-serif text-3xl text-foreground">Edit Project</h1>
          <p className="text-muted-foreground mt-1 text-sm">Update your portfolio piece details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Basic Information */}
        <section className="bg-card border border-border p-6 md:p-8 rounded-lg shadow-sm space-y-6">
          <h2 className="font-serif text-2xl text-foreground border-b border-border pb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">Project Name *</Label>
              <Input 
                 id="name" 
                 name="name" 
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 required 
                 placeholder="e.g. Lumina Skincare" 
                 className="h-11" 
              />
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
              <Textarea 
                 id="short_description" 
                 name="short_description" 
                 value={shortDescription}
                 onChange={(e) => setShortDescription(e.target.value)}
                 placeholder="A brief 1-2 sentence summary" 
                 className="resize-none h-20" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year" className="text-xs uppercase tracking-widest text-muted-foreground">Year</Label>
              <Input 
                 id="year" 
                 name="year" 
                 value={year}
                 onChange={(e) => setYear(e.target.value)}
                 placeholder="e.g. 2024" 
                 className="h-11" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project_link" className="text-xs uppercase tracking-widest text-muted-foreground">Live URL (optional)</Label>
              <Input 
                 id="project_link" 
                 name="project_link" 
                 type="url" 
                 value={projectLink}
                 onChange={(e) => setProjectLink(e.target.value)}
                 placeholder="https://" 
                 className="h-11" 
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="tools" className="text-xs uppercase tracking-widest text-muted-foreground">Tools Used (comma separated)</Label>
              <Input 
                 id="tools" 
                 name="tools" 
                 value={toolsStr}
                 onChange={(e) => setToolsStr(e.target.value)}
                 placeholder="Photoshop, Illustrator, Figma" 
                 className="h-11" 
              />
            </div>
          </div>
        </section>

        {/* Media & Content */}
        <section className="bg-card border border-border p-6 md:p-8 rounded-lg shadow-sm space-y-6">
          <h2 className="font-serif text-2xl text-foreground border-b border-border pb-4">Media & Content</h2>
          
          <div className="space-y-4">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground">Cover Image</Label>
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
                      className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
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
                <Input 
                   id="display_order" 
                   name="display_order" 
                   type="number" 
                   value={displayOrder}
                   onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)} 
                   className="h-11" 
                />
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
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
            
          </div>
        </section>
        
      </form>
    </div>
  );
}
