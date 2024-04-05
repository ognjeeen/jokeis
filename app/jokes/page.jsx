import jokes from '@/jokes.json';
import JokeCard from '@/components/JokeCard';
import Navbar from '@/components/Navbar';

const JokesPage = () => {
  return (
    <>
      <Navbar />
      <section className="px-4 py-4">
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
