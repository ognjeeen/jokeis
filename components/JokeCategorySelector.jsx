'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import RandomJoke from './RandomJoke';

const JokeCategorySelector = () => {
  const [jokeCategory, setJokeCategory] = useState('All');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (jokeCategory === 'All') {
      router.push('/jokes');
    } else {
      const query = `?jokeCategory=${jokeCategory}`;
      router.push(`/jokes/search-results${query}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-4/6 flex-col m-auto mt-6">
      <h1 className="text-lg md:text-2xl mb-2 md:mb-4 justify-center flex">
        Search joke by category
      </h1>
      <div className="m-auto justify-center items-center md:flex">
        <div className="justify-center">
          <label htmlFor="joke-type" className="sr-only">
            Joke Category
          </label>
          <select
            id="joke-type"
            className="w-full md:w-60 p-2 md:px-4 md:py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500 border shadow-md"
            value={jokeCategory}
            onChange={(e) => setJokeCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="IT">IT/Programming</option>
            <option value="School">School/Education</option>
            <option value="Family">Family</option>
            <option value="Work">Work/Office</option>
            <option value="Life">Life Situations</option>
            <option value="Other">Other</option>
          </select>
          <button
            type="submit"
            className="md:ml-4 mt-2 md:mt-0 w-full md:w-auto p-2 md:px-6 md:py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Search
          </button>

          <RandomJoke />
        </div>
      </div>
    </form>
  );
};

export default JokeCategorySelector;
