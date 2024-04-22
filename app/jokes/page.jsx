'use client';
import JokeStatisticCards from '@/components/JokeStatisticCards';
import JokeCard from '@/components/JokeCard';
import Navbar from '@/components/Navbar';
import Spinner from '@/components/Spinner';
import { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination';

const JokesPage = () => {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const res = await fetch(
          `${apiDomain}/jokes?page=${page}&pageSize=${pageSize}`,
          { cache: 'no-store' }
        );

        if (res.status === 200) {
          const data = await res.json();
          setJokes(data.jokes);
          setTotalLikes(data.totalLikes);
          setTotalItems(data.total);
          setTotalComments(data.totalComments);
          setTotalUsers(data.totalUsers);
        }
      } catch (error) {
        console.log(error);
        return [];
      } finally {
        setLoading(false);
      }
    };

    fetchJokes();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  console.log(totalItems);

  // Sort jokes by date
  jokes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Navbar />
          <JokeStatisticCards
            jokes={jokes}
            totalUsers={totalUsers}
            totalLikes={totalLikes}
            totalItems={totalItems}
            totalComments={totalComments}
          />
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
            <Pagination
              page={page}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={handlePageChange}
            />
          </section>
        </>
      )}
    </>
  );
};

export default JokesPage;
