import BlogOverView from '@/components/blog-overview'
import React from 'react'



async function fetchListOfBlogs() {
  try {
    const apiResponse = await fetch('http://localhost:3000/api/get-blog', {
      method: 'GET',
      cache: 'no-store'
    });

    if (!apiResponse.ok) {
      throw new Error(`HTTP error! Status: ${apiResponse.status}`);
    }

    const result = await apiResponse.json();
    return result?.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error; // Rethrow the error for higher-level handling
  }
}




const Blog = async() => {
  const blogList = await fetchListOfBlogs()
  console.log(blogList)
  return (
   
       <div>
         <BlogOverView blogList={blogList}/>
       </div>
    
  )
}

export default Blog