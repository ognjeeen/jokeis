import Link from 'next/link';
import { fetchJokes } from '@/utils/request';

const HomePage = async () => {
  const data = await fetchJokes();
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
