export interface Category {
  id: string;
  name: string;
  created_at?: string;
}

export interface Screengrab {
  url: string;
  public_id: string;
  caption?: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  category: string;
  short_description: string | null;
  cover_image_url: string | null;
  cover_image_public_id: string | null;
  tools: string[] | null;
  project_link: string | null;
  year: string | null;
  writeup: any | null; // TipTap JSON content
  screengrabs: Screengrab[] | null;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}
