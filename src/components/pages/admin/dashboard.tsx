"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderKanban, Tags, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Project, Category } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    totalCategories: 0,
    totalImages: 0
  });
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      const supabase = createClient();
      
      try {
        // Fetch projects stats
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*');
          
        if (projectsError) throw projectsError;
        
        // Fetch categories stats
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*');
          
        if (categoriesError) throw categoriesError;

        const projects = projectsData as Project[] || [];
        const categories = categoriesData as Category[] || [];
        
        // Calculate image count based on cover images and screengrabs
        let imageCount = 0;
        projects.forEach(p => {
          if (p.cover_image_url) imageCount++;
          if (p.screengrabs && Array.isArray(p.screengrabs)) {
            imageCount += p.screengrabs.length;
          }
        });

        setStats({
          totalProjects: projects.length,
          publishedProjects: projects.filter(p => p.published).length,
          totalCategories: categories.length,
          totalImages: imageCount,
        });

        // Get 5 most recent projects
        setRecentProjects(
          projects.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5)
        );

      } catch (error: any) {
        console.error("Dashboard fetch error:", error);
        toast.error("Failed to load dashboard data. Are you logged in?");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto py-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm">Overview of your portfolio content</p>
        </div>
        <Link href="/">
          <Button className="bg-foreground text-primary-pale hover:bg-secondary-muted uppercase tracking-widest text-xs rounded-none lg:px-6">
            View Website
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground text-sm">Loading dashboard data...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Card className="border-border shadow-sm bg-card rounded-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-sans uppercase tracking-widest text-muted-foreground">Total Projects</CardTitle>
                <FolderKanban className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-serif">{stats.totalProjects}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.publishedProjects} published
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm bg-card rounded-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-sans uppercase tracking-widest text-muted-foreground">Categories</CardTitle>
                <Tags className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-serif">{stats.totalCategories}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Dynamic filters
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm bg-card rounded-lg lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-sans uppercase tracking-widest text-muted-foreground">Media Assets</CardTitle>
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-serif">{stats.totalImages}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Images across all projects
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-card border border-border rounded-lg shadow-sm p-6 max-w-4xl">
            <h2 className="font-serif text-xl mb-4 text-foreground">Recent Projects</h2>
            {recentProjects.length === 0 ? (
              <p className="text-sm text-muted-foreground">No projects found. Add one to see it here.</p>
            ) : (
              <div className="divide-y divide-border">
                {recentProjects.map(project => (
                  <div key={project.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                    <div>
                      <p className="font-medium text-foreground text-sm">{project.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{project.category}</p>
                    </div>
                    <Link href="/admin/projects" className="text-xs uppercase tracking-widest text-primary-deep hover:text-foreground transition-colors">
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-6 pt-4 border-t border-border">
              <Link href="/admin/projects" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                View all projects &rarr;
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
