import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="flex items-center justify-center">
      <div>
        <h1 className="text-3xl">Welcome</h1>
        <Link href="/jokes">Show Jokes</Link>
      </div>
    </div>
  );
};

export default HomePage;
