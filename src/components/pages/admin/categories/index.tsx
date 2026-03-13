"use client";

import React, { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { Category } from '@/types';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setCategories(data as Category[] || []);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      toast.error(error.message || 'Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    
    setIsAdding(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('categories')
        .insert({ name: newCategoryName.trim() });

      if (error) throw error;
      
      setNewCategoryName("");
      toast.success('Category added successfully');
      fetchCategories();
    } catch (error: any) {
      console.error('Error adding category:', error);
      toast.error(error.message || 'Failed to add category. Are you logged in?');
    } finally {
      setIsAdding(false);
    }
  };

  const executeDelete = async (id: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error: any) {
      console.error('Error deleting category:', error);
      toast.error(error.message || 'Failed to delete category');
    } finally {
      setCategoryToDelete(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setCategoryToDelete(id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Categories</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage dynamic portfolio categories</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Add Form */}
        <div className="md:col-span-1">
          <div className="bg-card border border-border p-6 rounded-lg shadow-sm sticky top-8">
            <h2 className="font-serif text-xl border-b border-border pb-4 mb-4">New Category</h2>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                  Category Name
                </label>
                <Input 
                  id="name" 
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Photography" 
                  required
                  className="h-11 border-border" 
                />
              </div>
              <Button 
                type="submit" 
                disabled={isAdding || !newCategoryName.trim()}
                className="w-full flex items-center gap-2 bg-foreground text-primary-blush hover:bg-secondary-muted uppercase tracking-widest text-xs rounded-none h-11"
              >
                {isAdding ? "Adding..." : <><Plus size={16} /> Add Category</>}
              </Button>
            </form>
          </div>
        </div>

        {/* Categories List */}
        <div className="md:col-span-2">
          <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 border-b border-border uppercase tracking-wider text-[0.7rem] text-muted-foreground font-sans">
                <tr>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-8 text-center text-muted-foreground">
                      Loading categories...
                    </td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-8 text-center text-muted-foreground">
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleDeleteClick(category.id)}
                          className="p-1.5 text-muted-foreground hover:text-destructive transition-colors bg-muted rounded-md" 
                          aria-label="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AlertDialog open={!!categoryToDelete} onOpenChange={(open: boolean) => !open && setCategoryToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Projects using it will still keep the text value, but it won't be selectable for new projects.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => categoryToDelete && executeDelete(categoryToDelete)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
