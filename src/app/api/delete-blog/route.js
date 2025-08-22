'use client'

import connectToDB from "@/database"
import Blog from "@/models/blog"
import { NextResponse } from "next/server"




export async function DELETE(req){
    try {
            await connectToDB()
            const {searchParams}= new URL(req.url)
            console.log(searchParams, 'search params')
            const extractBlogId =searchParams.get('id')
            console.log(extractBlogId, 'exu')
            await Blog.findByIdAndDelete(extractBlogId)
            return NextResponse.json({
                success: true,
                message: 'Blog deleted successfully'
            })
        } catch (error) {
            return NextResponse.json({
                success: false,
                message: error.message
            })
        }
}