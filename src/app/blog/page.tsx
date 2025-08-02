import BlogCards from "@/components/sections/blog/blog-cards";
import Breadcrumb from "@/components/sections/breadcrumb/breadcrumb";
import React from "react";

function BlogPage({}) {
  return (
    <div>
      <Breadcrumb title="Blog" />
      <BlogCards />
    </div>
  );
}

export default BlogPage;
