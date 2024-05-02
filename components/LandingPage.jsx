import Link from 'next/link';
import FollowButtons from '@/components/FollowButtons';

const LandingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="text-center p-4">
        <h1 className="text-4xl mb-6 md:mb-0 animate-slideInFromBottom [--slideInFromBottom:600ms]">
          Welcome to{' '}
          <span className="text-blue-600 font-bold text-7xl">Jokeis</span>, my
          personal project!
        </h1>
        <div className="w-full md:w-3/5 m-auto mt-2 md:text-lg text-base animate-slideInFromBottom [--slideInFromBottom:700ms] whitespace-normal text-justify">
          <p>
            This project is purely for practicing{' '}
            <span className="text-blue-600 font-bold">Next.js</span>! Full CRUD
            application with several cool features like posting jokes as
            anonymous user, liking and commenting on jokes, viewing the user's
            profile, listing your own jokes (including anonymous ones) as well
            as displaying the jokes you liked.
          </p>
        </div>
        <div className="w-full md:w-3/5 m-auto mt-2 md:text-lg text-base animate-slideInFromBottom [--slideInFromBottom:800ms] whitespace-normal md:text-center">
          <p className="mt-2">
            Of course, feel free to connect with me on social media platforms. I
            always love to meet new people!
          </p>
          <FollowButtons />
        </div>

        <Link href="/jokes">
          <button className="mt-4 animate-slideInFromBottom [--slideInFromBottom:1100ms] inline-block bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-700 font-semibold">
            Show Jokes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
