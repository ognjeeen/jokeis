import Link from 'next/link';
import { FaRegCommentDots } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';

const JokeCard = ({ joke }) => {
  console.log(joke.createdAt);
  return (
    <div className="relative flex justify-center">
      {/* Joke Card */}
      <div className="rounded-xl shadow-md xl:w-3/5 lg:w-3/5 md:w-5/6 sm:w-5/6 mb-10 p-2">
        <div className="p-4 relative">
          <div className="text-gray-300 absolute right-3 top-3 text-lg">
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
            <div className="text-gray-600 text-lg">{joke.description}</div>
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
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JokeCard;
