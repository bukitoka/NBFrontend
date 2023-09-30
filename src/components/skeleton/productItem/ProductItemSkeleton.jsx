import React from 'react';
import Skeleton from 'react-loading-skeleton'

const ProductSkeleton = () => {
  return (
    <div>
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden rounded-lg">
          <Skeleton height={288} width={288} /> {/* Adjust height and width as needed */}
        </div>
        <div className="relative mt-4">
          <h3 className="text-sm font-medium text-gray-900">
            <Skeleton width={120} /> {/* Adjust width as needed */}
          </h3>
        </div>
        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
          />
          <p className="relative text-lg font-semibold text-white">
            <Skeleton width={60} /> {/* Adjust width as needed */}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <div className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900">
          <Skeleton width={80} /> {/* Adjust width as needed */}
          <span className="sr-only">, <Skeleton width={120} /></span> {/* Adjust width as needed */}
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
