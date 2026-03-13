"use client";

import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface FileUploadProps {
  onUploadSuccess: (result: { secure_url: string; public_id: string }) => void;
  defaultValue?: string;
  onRemove?: () => void;
  className?: string;
  label?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUploadSuccess,
  defaultValue,
  onRemove,
  className = "",
  label = "Upload Image"
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultValue || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('File size too large. Max 10MB.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      setPreviewUrl(result.secure_url);
      onUploadSuccess(result);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    if (onRemove) onRemove();
  };

  return (
    <div className={`space-y-4 h-full ${className}`}>
      {previewUrl ? (
        <div className="space-y-3">
          <div className="relative aspect-7/6 rounded-lg overflow-hidden border border-border bg-muted">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 h-9"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              Change
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="h-9 px-3"
              onClick={handleRemove}
              disabled={isUploading}
            >
              <X className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors cursor-pointer min-h-[160px]"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </>
          ) : (
            <>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-muted-foreground text-center">
                JPG, PNG or WEBP (Max. 10MB)
              </p>
            </>
          )}
        </div>
      )}
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};
