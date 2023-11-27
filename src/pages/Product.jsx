import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { priceFormatter } from "@/tools/reformat";
import { nbDefaultImage } from "@/assets";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// components
import Navbar from "../components/Navbar";
import MobileMenu from "../components/MobileMenu";
import Footer from "../components/Footer";
import { fetchProducts } from "../api/ProductApi";
import { getParamValue } from "../tools/urlParams";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NewArrival = () => {
  const [open, setOpen] = useState(false);

  const [arrproducts, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [count, setCount] = useState(0);
  const baseurl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    getProducts(null);
  }, []);

  const getProducts = async (page) => {
    try {
      const productsData = await fetchProducts(page);
      console.log(productsData);
      setProducts(productsData.results);
      setNextPage(getParamValue("page", productsData.next));
      setPrevPage(getParamValue("page", productsData.previous));
      setCount(productsData.count);

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  return (
    <div className="bg-white">
      {/* Navbar */}
      <Navbar/>
      <main>
        <div className="bg-white pt-[130px] lg:pt-[86px]">
          <div className="mx-auto max-w-2xl px-4 pt-16  sm:px-6 sm:pt-24 lg:max-w-7xl lg:px-8">
            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {
                (arrproducts.map((product) => (
                  <div key={product.id}>
                    <Link to={`/products/${product.slug}`}>
                      <div className="relative">
                        <div className="relative h-72 w-full overflow-hidden rounded-lg">
                          <img
                            src={`${product.cover}`}
                            alt={product.name}
                            onError={(e) => (e.target.src = nbDefaultImage)}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="relative mt-4">
                          <p className="text-sm font-medium text-gray-900 font-bold">
                            {product.name}
                          </p>
                          {/* <p className="mt-1 text-sm text-gray-500">Discount: {product.discount}</p> */}
                          {
                            product.min_price == product.max_price ? <h4 className=" text-sm">
                              Rp.{priceFormatter(product.min_price)}
                            </h4> :
                              <h4 className="text-sm">Rp.{priceFormatter(product.min_price)} - Rp.{priceFormatter(product.max_price)} </h4>
                          }
                        </div>

                      </div>
                    </Link>
                  </div>
                )))}
            </div>

            {/* <!-- component --> */}
            {
              (arrproducts.length === 0) ?
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
            }
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NewArrival;
