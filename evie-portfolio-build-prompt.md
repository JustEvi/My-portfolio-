# Evie Portfolio — Full Build Prompt

**Stack:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Supabase (database + auth), Cloudinary (media storage), TipTap (rich text editor)

---

## Project Overview

Build a professional portfolio website for a graphic designer named Evie, with a separate admin CMS interface to manage portfolio projects dynamically. No portfolio content should be hardcoded — everything is managed through the admin panel and stored in Supabase.

---

## Design System

**Typography:**
- Display/headings: `Cormorant Garamond` (Google Fonts) — weights 300, 400, 500; use italic variants liberally
- Body: `DM Sans` (Google Fonts) — weights 300, 400, 500

**Color Palette (CSS variables):**
```css
--background: #faf7f5;
--foreground: #1a1118;

--primary: #e8b4b8;
--primary-foreground: #1a1118;
--primary-deep: #c9848a;
--primary-pale: #f5e6e8;
--primary-blush: #fdf0f1;

--secondary: #1a1118;
--secondary-foreground: #faf7f5;
--secondary-light: #4a3a44;
--secondary-muted: #8a7080;

--muted: #f0e8ea;
--muted-foreground: #8a7080;

--card: #ffffff;
--card-foreground: #1a1118;

--border: #ecdde0;
--input: #ecdde0;
--ring: #c9848a;

--accent: #fdf0f1;
--accent-foreground: #1a1118;

--destructive: #c0392b;
--destructive-foreground: #ffffff;

--radius: 0.125rem;
```

**Aesthetic:** Professional, modern, yet elegant, and minimalist. Generous white space. Thin borders. Serif display headings paired with clean sans-serif body. No rounded corners except 2px radius on form inputs. No drop shadows except subtle ones on floating cards.

---

## Supabase Schema

```sql
-- Projects table
create table projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null, -- 'Social Media Ads' | 'Print Design' | 'Brand Identity' | 'Other'
  short_description text,
  cover_image_url text,
  cover_image_public_id text, -- Cloudinary public ID
  tools text[], -- array of tool names e.g. ['Photoshop', 'Illustrator']
  project_link text,
  year text,
  writeup jsonb, -- TipTap JSON content
  screengrabs jsonb[], -- array of { url, public_id, caption }
  published boolean default false,
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table projects enable row level security;

-- Public can read published projects
create policy "Public read published" on projects
  for select using (published = true);

-- Authenticated users (admin) can do everything
create policy "Admin full access" on projects
  for all using (auth.role() = 'authenticated');
```

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=evie_portfolio
```

---

## File Structure

```
/lib
  /supabase/client.ts               ← Browser client
  /supabase/server.ts               ← Server client (cookies)
  /cloudinary/                      ← Upload helpers
/types
  /index.ts                         ← Project type definitions
```

---

## Pages — Content & Layout

### `/` — Home Page

- **Navbar:** Logo left ("Evie" with italic last name accent), nav links right: Home · About · Portfolio · Contact. Sticky, frosted glass background on scroll.
- **Hero:** Two-column grid. Left: eyebrow label "Creative Designer", large serif heading *"Designing stories through visuals."*, subheading in italic serif *"Graphic Design & Brand Identity"*, University of Ibadan badge (small pill with graduation cap icon: *"Recent graduate · University of Ibadan · Communication & Language Arts"*), bio paragraph, two CTA buttons (View My Work → `/portfolio`, Get In Touch → `/contact`). Right: full-height image area with blush background, profile photo from Cloudinary (or placeholder), floating card bottom-left showing availability status.
- **Bio text:**
  > Hi! I'm Evie, a graphic designer. My primary goal as a designer is to tell a story through the visuals, ensuring they convey the right message. I focus mainly on social media ads and print ads. I thrive in collaborative environments that spark fresh ideas and innovation as I'm always eager to learn and push my creativity further.
- **Marquee strip:** Dark background, rose text, scrolling: *"Social Media Ads · Print Design · Brand Identity · Visual Storytelling · Graphic Design · Creative Direction · Typography · Art Direction"*
- **Services section:** White background, 3-column grid of service cards — Social Media Ads (01), Print Design (02), Brand Identity (03). Each: large decorative number in rose, service title in serif, description.
- **Portfolio preview:** Fetch 3 most recent `published = true` projects from Supabase. Show `ProjectCard` components. "View All Work" link.
- **Footer:** Dark background, logo + tagline left, nav links right, copyright bar below.

### `/about` — About Page

- Two-column layout: left column is image (profile photo, blush background), right column is content.
- Eyebrow label, heading *"Hi, I'm Evie."*, blockquote in bordered italic serif, full bio including:
  > "I'm a recent graduate from the University of Ibadan, where I studied Communication and Language Arts — a background that deeply informs how I think about message, audience, and impact in my design work."
- Stats row at bottom: Projects Completed · Years of Design · Happy Clients (hardcode for now).

### `/portfolio` — Portfolio Listing

- Header section: page title, short description, category filter buttons (All · Social Media Ads · Print Design · Brand Identity). Filtering is client-side.
- Responsive 3-column grid of `ProjectCard` components, fetched server-side from Supabase (`published = true`, ordered by `display_order`).
- `ProjectCard`: cover image, project name, category label, tools as small tags. On hover: subtle lift. Clicking navigates to `/portfolio/[slug]`.

### `/portfolio/[slug]` — Project Detail

- Back button → `/portfolio`
- Category eyebrow label, large serif project title
- Meta row: Category · Tools Used · Year · Live Link (if present)
- Hero/cover image (full width, 16:9)
- Body: TipTap rich text rendered as HTML using `generateHTML` from `@tiptap/html`
- Screengrab gallery: 2-column grid of screenshots with captions
- Use `generateStaticParams` + ISR (`revalidate: 60`) for performance

### `/contact` — Contact Page

- Two-column layout: left dark panel (ink background) with contact details, right light panel with contact form.
- Form fields: Name, Email, Subject, Message. On submit, send via `/api/contact` route (use Resend or just `console.log` as placeholder). Show success toast on completion.

---

## Admin Panel — `/admin/*`

**Auth:** Supabase email/password auth. The `/admin/layout.tsx` must check `supabase.auth.getSession()` server-side and redirect to `/admin/login` if unauthenticated. Only one admin user is expected.

**`/admin/login`:** Simple centered form, email + password, calls `supabase.auth.signInWithPassword()`. Redirects to `/admin` on success.

**`/admin` — Dashboard:**
- Stats cards: Total Projects, Published Projects, Draft Projects
- Recent projects list with Edit/Delete quick actions

**`/admin/projects` — All Projects:**
- Table or card grid of all projects (published + drafts)
- Status badge (Published / Draft)
- Edit and Delete buttons. Delete should show a confirmation dialog (shadcn `AlertDialog`) before calling Supabase delete + Cloudinary delete for associated images.

**`/admin/projects/new` and `/admin/projects/[id]/edit` — Project Form:**

This is the most important screen. Build a rich form with these sections:

### 1. Basic Info (2-col grid)
- Project Name (text input) → auto-generates slug (show slug preview, allow override)
- Category (select: Social Media Ads / Print Design / Brand Identity / Other)
- Short Description (textarea, max 200 chars, show char count)
- Project Link (URL input, optional)
- Year (text input)

### 2. Tools Used
- Text input + "Add" button, renders as dismissible chips
- Stored as `text[]` in Supabase

### 3. Cover Image
- Single image upload via `/api/upload` route (signed Cloudinary upload)
- Show preview after upload
- On replace, delete old Cloudinary asset first

### 4. Screenshots / Screengrabs
- Multi-image uploader (add individually or in batch)
- Each image shows a preview with optional caption input and remove button
- Stored as `jsonb[]`: `[{ url, public_id, caption }]`

### 5. Write-up (Rich Text)
- TipTap editor with toolbar: Bold, Italic, Underline, H2, H3, Blockquote, Bullet List, Ordered List, Link, Horizontal Rule
- Store as TipTap JSON in `writeup jsonb` column
- Render on public detail page using `generateHTML` from `@tiptap/html`

### 6. Publish Toggle
- Draft / Published switch using shadcn `Switch` component

### 7. Save Buttons
- "Save as Draft" and "Publish" — both call the same upsert, just with different `published` values
- Show a toast on success
- After save, call `/api/revalidate` to trigger ISR revalidation of portfolio pages

---

## Cloudinary Integration

- Use `next-cloudinary` package
- Upload preset `evie_portfolio` should be **signed** — uploads go through `/api/upload` route (never expose `CLOUDINARY_API_SECRET` to the client)
- `/api/upload/route.ts`: accepts `formData` with a file, signs and uploads to Cloudinary, returns `{ url, public_id }`
- `/api/delete-image/route.ts`: accepts `{ public_id }`, deletes from Cloudinary (verify admin session before deleting)
- Folder structure in Cloudinary: `evie-portfolio/covers/` and `evie-portfolio/screengrabs/`

---

## Key Packages to Install

```bash
npx create-next-app@latest evie-portfolio --typescript --tailwind --app
npx shadcn@latest init
npx shadcn@latest add button input textarea select switch alert-dialog toast badge separator

npm install @supabase/supabase-js @supabase/ssr
npm install next-cloudinary cloudinary
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-underline @tiptap/extension-placeholder @tiptap/html
npm install lucide-react
npm install react-hook-form zod @hookform/resolvers
```

---

## Additional Notes

- All public-facing pages should be **server components** fetching from Supabase server-side where possible
- Use `loading.tsx` files for suspense boundaries on portfolio pages
- Images should use `next/image` with Cloudinary loader for optimization
- The admin sidebar should be collapsible on mobile
- Form state in admin should use `react-hook-form` + `zod` for validation
- Slug must be auto-generated from project name (kebab-case, lowercase) but remain manually editable
- On the public portfolio listing, if no projects are published yet, show a tasteful empty state
- The prototype HTML file (provided separately) shows the intended visual design — match it as closely as possible in the real implementation
