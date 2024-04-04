import { FcLike } from 'react-icons/fc';
import { FaRegCommentDots } from 'react-icons/fa';
import Link from 'next/link';

const JokeCard = ({ joke }) => {
  return (
    <div className="relative flex justify-center">
      {/* Joke Card */}
      <div className="rounded-xl shadow-md xl:w-3/5 lg:w-3/5 md:w-5/6 sm:w-5/6  mb-5">
        <div className="p-4">
          {/* Joke categories */}
          <div className="text-left mb-6">
            <div className="text-gray-600">
              Joke Category
              <span> #{joke.category}</span>
            </div>
          </div>
          {/* Joke Description */}
          <div className="text-left md:text-center lg:text-left mb-6">
            <div className="text-gray-600">{joke.description}</div>
          </div>

          {/* Like and comment section */}
          <div className="lg:flex justify-center gap-4 text-gray-500 mb-4 ">
            <p className="flex items-center">
              <FcLike className="inline mr-1" /> {joke.likes}
              <span className="lg:inline ml-1">Likes</span>
            </p>
            <p className="flex items-center">
              <FaRegCommentDots className="inline mr-1" />
              {joke.comments.length}
              <span className="lg:inline ml-1">Comments</span>
            </p>
          </div>

          <div className="border border-gray-100 mb-5"></div>

          <div className="mb-4">
            <Link
              href="/jokes"
              className=" bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JokeCard;
