"use client";

import React, { useEffect, useState } from "react";
import AddNewBlog from "../add-new-blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const initialBlogData = {
  title: "",
  description: "",
};

const BlogOverView = ({ blogList }) => {
  console.log(blogList);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState(initialBlogData);
  console.log(blogData);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);
  const saveBlogdata = async () => {
    try {
      setLoading(true);
      const apiResponse =
        currentEditedBlogId !== null
          ? await fetch(`/api/update-blog?id=${currentEditedBlogId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(blogData),
            })
          : await fetch("/api/add-blog", {
              method: "POST",

              body: JSON.stringify(blogData),
            });
      const result = await apiResponse.json();
      if (result?.success) {
        setBlogData(initialBlogData);
        setOpenDialog(false);
        setLoading(false);
        setCurrentEditedBlogId(null);
        router.refresh();
      }
      console.log(result, "res");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setBlogData(initialBlogData);
    }
  };

  const handleDelete = async (extractBlogId) => {
    console.log(extractBlogId);
    try {
      const apiResponse = await fetch(`/api/delete-blog?id=${extractBlogId}`, {
        method: "DELETE",
      });
      const result = await apiResponse.json();
      if (result?.success) {
        router.refresh();
      }
      console.log(result);
    } catch (error) {
      console.log(error.message, "err");
    }
  };

  const [currentEditedBlogId, setCurrentEditedBlogId] = useState(null);
  const handleEdit = (blog) => {
    console.log("lll", blog);
    setCurrentEditedBlogId(blog._id);
    setBlogData({
      title: blog?.title,
      description: blog?.description,
    });

    setOpenDialog(true);
  };
  console.log(currentEditedBlogId);
  return (
    <main className="flex min-h-screen flex-col   p-10">
      <AddNewBlog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        loading={loading}
        setLoading={setLoading}
        blogData={blogData}
        setBlogData={setBlogData}
        saveBlogdata={saveBlogdata}
        currentEditedBlogId={currentEditedBlogId}
        setCurrentEditedBlogId={setCurrentEditedBlogId}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 justify-items-center md:justify-items-start mt-7">
        {blogList.length > 0
          ? blogList.map((blog, index) => (
              <Card
                key={index}
                className="w-80 px-5 py-6 bg-slate-900 text-white"
              >
                <CardHeader>
                  <CardTitle>{blog.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {blog.description}
                  </CardDescription>
                </CardHeader>

                <CardFooter className="flex justify-between">
                  <Button
                    className="bg-white text-slate-900 hover:bg-gray-400"
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-white text-slate-900 hover:bg-gray-400"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          : null}
      </div>
    </main>
  );
};

export default BlogOverView;
