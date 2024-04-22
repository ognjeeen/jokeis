import Link from 'next/link';
import { FaRegCommentDots } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';

const JokeCard = ({ joke }) => {
  return (
    <div className="relative flex justify-center">
      {/* Joke Card */}
      <div className="rounded-xl shadow-lg xl:w-3/5 lg:w-3/5 md:w-5/6 w-full mb-10 p-2 border-l-2  border-gray-300">
        <div className="p-4 relative">
          <div className="text-gray-300 absolute md:right-3 md:top-3 right-15 top-9 md:text-lg text-sm">
            {new Date(joke.createdAt).toLocaleString()}
          </div>
          {/* Joke categories */}
          <div className="text-left mb-6">
            <div className="text-gray-600">
              Joke Category
              <span> #{joke.category}</span>
            </div>
          </div>

          {/* Joke Description */}
          <div className="text-left lg:text-left mb-12">
            <div className="text-gray-600 text-lg text-wrap">
              {joke.description}
            </div>
          </div>

          {/* Like and comment section */}
          <div className="lg:flex gap-4 text-gray-500 mb-4 text-lg">
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
              href={`/jokes/${joke._id}`}
              className=" bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-lg"
            >
              See comments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JokeCard;
