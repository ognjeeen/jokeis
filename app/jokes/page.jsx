'use client';
import JokeCard from '@/components/JokeCard';
import Navbar from '@/components/Navbar';
import Spinner from '@/components/Spinner';
import { useEffect, useState } from 'react';

const JokesPage = () => {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const res = await fetch(`${apiDomain}/jokes`, { cache: 'no-store' });

        if (res.status === 200) {
          const data = await res.json();
          setJokes(data);
        }
      } catch (error) {
        console.log(error);
        return [];
      } finally {
        setLoading(false);
      }
    };

    fetchJokes();
  }, []);

  // Sort jokes by date
  jokes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Navbar />
          <section className="px-4 py-4 mt-6">
            {jokes.length === 0 ? (
              <p className="justify-center items-center flex p-10 text-xl">
                No jokes found
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
      )}
    </>
  );
};

export default JokesPage;
