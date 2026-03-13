import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    // Verify authentication
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { public_id } = await request.json();

    if (!public_id) {
      return NextResponse.json({ error: "No public_id provided" }, { status: 400 });
    }

    // Delete image from Cloudinary
    const result = await cloudinary.uploader.destroy(public_id);
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
