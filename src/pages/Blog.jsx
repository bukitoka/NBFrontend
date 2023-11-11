import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { nbDefaultImage } from "@/assets";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { apiGet } from "@/api/ApiService";
const baseurl = import.meta.env.VITE_API_BASE_URL;

// components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    await apiGet(
      `blogs/`,
      (data) => onGetBlogsSuccess(data),
      (error) => onGetBlogsError(error)
    );
  }

  const onGetBlogsSuccess = (data) => {
    console.log(data)
    setBlogs(data.results)
  }

  const onGetBlogsError = (error) => {
    console.log(error)
  }


  return (
    <div className="bg-white">
      {/* Navbar */}
      <Navbar />
      <main>
        <div className="bg-white pt-[130px] lg:pt-[86px] mb-4">
          <div className="mx-auto max-w-2xl px-4 pt-16  sm:px-6 sm:pt-24 lg:max-w-7xl lg:px-8">
            <div className="mt-2 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {
                (blogs.map((blog) => (
                  <div key={blog.id}>
                    <Link to={`/blogs/${blog.slug}`}>
                      <div className="relative">
                        <div className="relative h-72 w-full overflow-hidden rounded-lg">
                          <img
                            src={`${baseurl}${blog.cover}`}
                            alt=""
                            onError={(e) => (e.target.src = nbDefaultImage)}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="relative mt-0">
                          <p className="text-sm font-medium text-gray-900 font-bold">
                            {blog.title}
                          </p>
                        </div>

                      </div>
                    </Link>
                  </div>
                )))}
            </div>

            {/* <!-- component --> */}
            {/* {
              (blogs.length === 0) ?
                <></> :
                <div className="flex items-center justify-center mt-8 mb-4">
                  <ul className="flex items-center -mx-[6px]">
                    <li className="px-[6px]">
                      <a href="#" className="w-9 h-9 flex items-center justify-center rounded-md text-lg border border-[#EDEFF1]text-[#838995] text-base hover:text-xl" onClick={() => getProducts(prevPage)}>
                        <span>
                          <FaChevronLeft className="h-15 w-8" />
                        </span>
                      </a>
                    </li>
                    <li className="px-[6px]">
                      <a href="#" className=" w-9 h-9 flex items-center text-lg justify-center rounded-md border  border-[#EDEFF1]text-[#838995] text-base hover:text-xl" onClick={() => getProducts(nextPage)}>
                        <span>
                          <FaChevronRight className="h-15 w-8" />
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
            } */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Blog;
