'use client';
import Navbar from '@/components/Navbar';
import Spinner from '@/components/Spinner';
import { fetchJoke } from '@/utils/request';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import { FcLikePlaceholder } from 'react-icons/fc';

const JokePage = () => {
  const { id } = useParams();
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileDefault = '';

  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJokeData = async () => {
      if (!id) return;
      try {
        const joke = await fetchJoke(id);
        setJoke(joke);
      } catch (error) {
        console.error('Error fetching joke:', error);
      } finally {
        setLoading(false);
      }
    };

    if (joke === null) {
      fetchJokeData();
    }
  }, [id, joke]);

  if (!joke && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">Joke Not Found</h1>
    );
  }

  return (
    <>
      <Navbar />
      {loading && <Spinner loading={loading} />}
      {!loading && joke && (
        <>
          <section>
            <div className="py-6 px-6 items-center flex">
              <Link
                href="/jokes"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back To All Jokes
              </Link>
            </div>
          </section>

          <div className="relative flex justify-center ">
            {/* Joke Card */}
            <div className="rounded-xl shadow-md xl:w-3/5 lg:w-4/5 md:w-5/6 sm:w-5/6 mb-5 border relative">
              <div className="text-gray-300 absolute right-3 top-2">
                {new Date(joke.createdAt).toLocaleString()}
              </div>
              <div className="p-6">
                {/* Joke categories */}
                <div className="text-left mb-6">
                  <div className="text-gray-600 flex items-center">
                    <Image
                      src={profileImage || profileDefault}
                      width={40}
                      height={40}
                      className="h-8 w-8 rounded-full mr-2"
                      alt=""
                    />
                    <span className="text-lg">Ognjen</span>
                  </div>

                  {/* <div className="text-gray-600 mt-2 ">
                    <span> #{joke.category}</span>
                  </div> */}
                </div>

                {/* Joke Description */}
                <div className="text-left md:text-center lg:text-left mb-6">
                  <div className="text-lg">{joke.description}</div>
                </div>

                {/* Like and comment section */}
                <div className="gap-4 text-gray-500 mb-4">
                  <p className="flex items-center">
                    <FcLikePlaceholder size="24" className="flex mr-1" />
                    <span className="ml-1 text-lg">{joke.likes} Likes</span>
                  </p>
                </div>

                <div className="border border-gray-100 mb-5"></div>

                {/* Add your comment */}
                <div className="mb-6 flex justify-center items-center">
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 mr-3 text-gray-700 max-h-44 min-h-16 focus:outline-none focus:shadow-outline"
                    id="message"
                    placeholder="Enter your comment"
                  ></textarea>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center h-full"
                    type="submit"
                  >
                    <FaPaperPlane className="mr-2" />
                  </button>
                </div>

                {/* Comment section */}
                <ul>
                  {joke.comments.map((comment, index) => (
                    <li
                      key={index}
                      className="mb-6 shadow appearance-none rounded-xl py-2 px-3 relative"
                    >
                      <div className="flex items-center">
                        <Image
                          src={profileImage || profileDefault}
                          width={40}
                          height={40}
                          className="h-8 w-8 rounded-full mr-2"
                          alt=""
                        />
                        <div>
                          <p className="mb-1">
                            <strong>Ognjen</strong>
                          </p>
                        </div>
                      </div>
                      <p className="mt-4">{comment.comment_text}</p>
                      <p className="mt-6 text-gray-300">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JokePage;
