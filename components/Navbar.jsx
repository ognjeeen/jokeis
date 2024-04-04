const Navbar = () => {
  return (
    <div className="px-5 py-5 flex md:flex-grow flex-row justify-end mb-15">
      <button>Random Joke</button>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm ml-3">
        Login/Register
      </button>
    </div>
  );
};

export default Navbar;
