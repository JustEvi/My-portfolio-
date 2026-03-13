"use client";

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered, Heading2, Quote } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  content: string | any;
  onChange: (content: any) => void;
  placeholder?: string;
}

const MenuButton = ({ 
  isActive, 
  onClick, 
  children, 
  ariaLabel 
}: { 
  isActive: boolean, 
  onClick: () => void, 
  children: React.ReactNode, 
  ariaLabel: string 
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    className={cn(
      "p-1.5 rounded-sm transition-colors text-muted-foreground hover:bg-muted hover:text-foreground",
      isActive && "bg-muted text-foreground font-medium"
    )}
  >
    {children}
  </button>
);

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-1 p-1 border border-border rounded-t-md bg-muted/30">
      <MenuButton
        isActive={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
        ariaLabel="Toggle bold"
      >
        <Bold className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        isActive={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        ariaLabel="Toggle italic"
      >
        <Italic className="h-4 w-4" />
      </MenuButton>
      
      <Separator orientation="vertical" className="h-5 mx-1" />

      <MenuButton
        isActive={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        ariaLabel="Toggle heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </MenuButton>

      <Separator orientation="vertical" className="h-5 mx-1" />

      <MenuButton
        isActive={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        ariaLabel="Toggle bullet list"
      >
        <List className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        isActive={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        ariaLabel="Toggle ordered list"
      >
        <ListOrdered className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        isActive={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        ariaLabel="Toggle quote"
      >
        <Quote className="h-4 w-4" />
      </MenuButton>
    </div>
  );
};

export default function RichTextEditor({ content, onChange, placeholder = "Start typing..." }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // Return JSON so it matches our supabase Writeup jsonb schema requirement
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm md:prose-base focus:outline-none min-h-[150px] p-4 text-foreground prose-p:my-2',
      },
    },
  });

  return (
    <div className="flex flex-col border border-border rounded-md overflow-hidden bg-card focus-within:ring-1 focus-within:ring-ring">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="cursor-text" />
    </div>
  );
}
