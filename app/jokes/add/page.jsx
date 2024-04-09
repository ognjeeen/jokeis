import JokeAddForm from '@/components/JokeAddForm';

const JokeAddPage = () => {
  return (
    <section>
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <JokeAddForm />
        </div>
      </div>
    </section>
  );
};

export default JokeAddPage;
