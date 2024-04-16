import JokeCard from '@/components/JokeCard';
import Navbar from '@/components/Navbar';
import { fetchJokes } from '@/utils/request';

const JokesPage = async () => {
  const jokes = await fetchJokes();

  // Sort jokes by date
  jokes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <Navbar />
      <section className="px-4 py-4 mt-6">
        {jokes.length === 0 ? (
          <p>No jokes found</p>
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

export default JokesPage;
