import { useState, useEffect } from 'react';
import Link from 'next/link';

const RandomJoke = () => {
  const [randomJokeId, setRandomJokeId] = useState(null);

  useEffect(() => {
    const RandomJoke = async () => {
      try {
        const res = await fetch('/api/jokes/random');

        if (res.status === 200) {
          const data = await res.json();
          setRandomJokeId(data._id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    RandomJoke();
  }, []);

  return (
    <Link href={`/jokes/${randomJokeId}`}>
      <button className="md:ml-2 mt-2 md:mt-0 w-full md:w-auto p-2 md:px-6 md:py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">
        Random Joke
      </button>
    </Link>
  );
};

export default RandomJoke;
