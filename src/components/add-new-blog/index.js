
import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddNewBlog = ({
  openDialog,
  setOpenDialog,
  loading,
  setLoading,
  blogData,
  setBlogData,
  saveBlogdata,
  currentEditedBlogId,
  setCurrentEditedBlogId

}) => 
{
    console.log(blogData)
  return (
    <>
      <div>
        <Button onClick={() => setOpenDialog(true)}>Add new Blog</Button>
      </div>

      <Dialog open={openDialog} onOpenChange={()=>{
          setOpenDialog(false)
          setBlogData({
            title:'',
            description:''
          })
          setCurrentEditedBlogId(null)
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentEditedBlogId?'Edit Blog':'Add new Blog'} </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                name="title"
                value={blogData.title}
                onChange={(e) =>
                  setBlogData({ ...blogData, title: e.target.value })
                }
                id="name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Input
                name="description"
                value={blogData.description}
                onChange={(e) =>
                  setBlogData({ ...blogData, description: e.target.value })
                }
                id="username"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={saveBlogdata}>{loading?'Saving Data...':'Save changes'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewBlog;
