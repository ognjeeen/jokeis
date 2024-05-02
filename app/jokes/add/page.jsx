import JokeAddForm from '@/components/JokeAddForm';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const JokeAddPage = () => {
  return (
    <section>
      <div className="container m-auto max-w-2xl py-24">
        <div className="items-center flex justify-center md:justify-start md:mb-2">
          <Link
            href="/jokes"
            className="text-blue-500 hover:text-blue-600 flex items-center "
          >
            <FaArrowLeft className="mr-2" /> Back To All Jokes
          </Link>
        </div>
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <JokeAddForm />
        </div>
      </div>
    </section>
  );
};

export default JokeAddPage;
