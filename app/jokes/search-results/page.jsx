'use client';
import Spinner from '@/app/loading';
import JokeCard from '@/components/JokeCard';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);

  const jokeCategory = searchParams.get('jokeCategory');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/jokes/search?jokeCategory=${jokeCategory}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setJokes(data);
        } else {
          setJokes([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [jokeCategory]);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <>
      <Navbar />
      <section className="px-4 py-4 mt-6">
        <Link
          href="/jokes"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Back To All Jokes
        </Link>
        <h1 className="md:text-2xl md:mt-0 mb-6 text-center text-xl mt-4">
          Search results for{' '}
          <span className="font-semibold">#{jokeCategory}</span> category
        </h1>
        {jokes.length === 0 ? (
          <p className="justify-center items-center flex p-10 text-xl text-nowrap">
            No search results found
          </p>
        ) : (
          <div>
            {jokes.map((joke) => (
              <JokeCard joke={joke} key={joke._id} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default SearchResultsPage;
