import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const extractBlogData = searchParams.get("id");
    const { title, description } = await req.json();
    console.log(extractBlogData, "s");

    const updateBlog = await Blog.findByIdAndUpdate(
        extractBlogData, 
        { title, description },
        { new: true }
      );

    if (updateBlog) {
      return NextResponse.json({
        success: true,
        data: updateBlog,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
