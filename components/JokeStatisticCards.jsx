import { CiViewList, CiHeart, CiUser } from 'react-icons/ci';

const HomePageCategories = ({
  jokes,
  totalUsers,
  totalLikes,
  totalItems,
  totalComments,
}) => {
  return (
    <div className="flex flex-wrap">
      <div className="md:flex-nowrap md:inline-flex justify-center items-center m-auto flex flex-wrap">
        <div className="md:flex w-1/2 px-2 md:p-6 mt-4">
          <div className="p-2 text-center md:px-8 border-2 rounded-2xl border-gray-400 shadow-lg">
            <CiViewList size={40} />
            <span className="text-blue-600 font-bold text-2xl">
              {totalItems}
            </span>
          </div>
        </div>

        <div className="md:flex w-1/2 px-2 md:p-6 mt-4">
          <div className="p-2 text-center md:px-8 border-2 rounded-2xl border-gray-400 shadow-lg">
            <CiHeart size={40} />
            <span className="text-blue-600 font-bold text-2xl flex justify-center">
              {totalLikes}
            </span>
          </div>
        </div>

        <div className="md:flex w-1/2 px-2 md:p-6 mt-4">
          <div className="p-2 text-center md:px-8 border-2 rounded-2xl border-gray-400 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width={40}
              height={40}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />
            </svg>
            <span className="text-blue-600 font-bold text-2xl flex justify-center">
              {totalComments}
            </span>
          </div>
        </div>

        <div className="md:flex w-1/2 px-2 md:p-6 mt-4">
          <div className="p-2 text-center md:px-8 border-2 rounded-2xl border-gray-400 shadow-lg">
            <CiUser size={40} />
            <span className="text-blue-600 font-bold text-2xl flex justify-center">
              {totalUsers}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageCategories;
