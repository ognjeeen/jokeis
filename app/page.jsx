import Link from 'next/link';

const HomePage = async () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-3xl">Welcome to Jokeis, my personal project!</h1>
        <Link href="/jokes">Show Jokes</Link>
      </div>
    </div>
  );
};

export default HomePage;
