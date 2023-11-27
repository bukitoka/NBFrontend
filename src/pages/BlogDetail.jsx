import { useState, useEffect } from "react";
import { nbDefaultImage } from "@/assets";
import { apiGet } from "@/api/ApiService";
import { useParams } from 'react-router-dom';
const baseurl = import.meta.env.VITE_API_BASE_URL;
import dayjs from "dayjs"
import { useTranslation } from "react-i18next"
import { languageOptions } from "@/tools/constants"
import parse from 'html-react-parser';

// components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NewspaperIcon, ClockIcon } from '@heroicons/react/20/solid'

const BlogDetail = () => {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null);
  const { t, i18n } = useTranslation()

  useEffect(() => {
    fetchBlogDetail();
  }, []);

  const fetchBlogDetail = async () => {
    await apiGet(
      `blogs/${slug}/`,
      (data) => onGetBlogSuccess(data),
      (error) => onGetBlogError(error)
    );
  }

  const onGetBlogSuccess = (data) => {
    setBlog(data)
  }

  const onGetBlogError = (error) => {
    console.log(error)
  }

  return (
    <div className="bg-white">
      {/* Navbar */}
      <Navbar />
      <main>
        <div className="bg-white pt-[130px] lg:pt-[86px] mb-4">
          <div className="mx-auto max-w-2xl px-4 pt-16  sm:px-6 sm:pt-24 lg:max-w-7xl lg:px-8 ">
            <div className="mt-0 flex flex-col">
              {/* image section */}
              <div className="h-32 lg:h-60 w-full">
                <img
                  src={`${baseurl}${blog?.cover}`}
                  alt=""
                  className="h-full w-full object-cover object-center rounded-lg hidden lg:block"
                  onError={(e) => (e.target.src = nbDefaultImage)}
                />

                <img
                  src={`${baseurl}${blog?.cover_mobile}`}
                  alt=""
                  className="h-full w-full object-cover object-center rounded-lg block lg:hidden"
                  onError={(e) => (e.target.src = nbDefaultImage)}
                />
              </div>
              {/* title section*/}
              <div className=" flex flex-col mt-3">
                <div className="flex flex-row">
                  <ClockIcon className="w-6 h-6 text-zinc-600" />
                  <span className="text-sm text-zinc-600 ms-3">{dayjs(blog?.created_at).format('MMMM D, YYYY')}</span>
                </div>
                <div className="flex flex-row mt-2">
                  <NewspaperIcon className="w-6 h-6 text-zinc-600" />
                  <span className="text-xl font-bold tracking-tight ms-3">  {i18n.language == languageOptions.english ? blog?.title : blog?.title_id}</span>
                </div>
              </div>
              {/* content section */}
              <div>
                <div className="mt-4 text-zinc-600 text-lg">
                  {i18n.language == languageOptions.english ? parse(blog?.content ?? "") : parse(blog?.content_id ?? "")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogDetail
