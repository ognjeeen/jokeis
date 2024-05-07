'use client';
import Spinner from '@/app/loading';
import JokeCard from '@/components/JokeCard';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const LikedJokesPage = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedJokes = async () => {
      try {
        const res = await fetch('/api/jokes/user/likedJokes');

        if (res.status === 200) {
          const data = await res.json();
          setJokes(data);
        } else {
          console.log(res.statusText);
          toast.error('Failed to fetch liked jokes');
        }
      } catch (error) {
        console.log(error);
        toast('Failed to fetch liked jokes');
      } finally {
        setLoading(false);
      }
    };

    fetchLikedJokes();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <>
      <Navbar />
      <section className="px-4 py-4 mt-6">
        <h1 className="text-3xl mb-4 text-center">Jokes Liked By You</h1>
        {jokes.length === 0 ? (
          <p className="justify-center items-center flex p-10 text-xl">
            No liked jokes
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

export default LikedJokesPage;
