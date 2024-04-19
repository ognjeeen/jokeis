const HomePageCategories = ({ jokes, totalUsers }) => {
  return (
    <div className="block justify-center md:mt-12 md:flex">
      <div className="px-2 md:p-6 mt-4">
        <div className="p-2 text-center md:p-6 border-2 rounded-2xl border-gray-400 shadow-xl">
          <p className="font-semibold text-gray-500 text-lg">TOTAL JOKES</p>
          <span className="text-blue-600 font-bold text-2xl flex justify-center">
            {jokes.length}
          </span>
        </div>
      </div>

      <div className="px-2 md:p-6 mt-4">
        <div className="p-2 text-center md:p-6 border-2 rounded-2xl border-gray-400 shadow-xl">
          <p className="font-semibold text-gray-500 text-lg">TOTAL LIKES</p>
          <span className="text-blue-600 font-bold text-2xl flex justify-center">
            {jokes.reduce((total, joke) => total + joke.likes, 0)}
          </span>
        </div>
      </div>

      <div className="px-2 md:p-6 mt-4">
        <div className="p-2 text-center md:p-6 border-2 rounded-2xl border-gray-400 shadow-xl">
          <p className="font-semibold text-gray-500 text-lg">TOTAL COMMENTS</p>
          <span className="text-blue-600 font-bold text-2xl flex justify-center">
            {jokes.reduce((total, joke) => total + joke.comments.length, 0)}
          </span>
        </div>
      </div>

      <div className="px-2 md:p-6 mt-4">
        <div className="p-2 text-center md:p-6 border-2 rounded-2xl border-gray-400 shadow-xl">
          <p className="font-semibold text-gray-500 text-lg">TOTAL USERS</p>
          <span className="text-blue-600 font-bold text-2xl flex justify-center">
            {totalUsers}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePageCategories;
