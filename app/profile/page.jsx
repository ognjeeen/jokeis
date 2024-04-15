'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import profileDefault from '@/assets/images/profile.png';
import { FaRegCommentDots } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserJokes = async (userId) => {
      if (!userId) {
        return;
      }

      try {
        const res = await fetch(`/api/jokes/user/${userId}`);

        if (res.status === 200) {
          const data = await res.json();
          setJokes(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch user jokes when session is available
    if (session?.user?.id) {
      fetchUserJokes(session.user.id);
    }
  }, [session]);

  const handleDeleteJoke = async (jokeId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this joke?'
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/jokes/${jokeId}`, {
        method: 'DELETE',
      });

      if (res.status === 200) {
        const updatedJokes = jokes.filter((joke) => joke._id !== jokeId);

        setJokes(updatedJokes);
        toast.success('Joke Deleted');
      } else {
        toast.error('Failed to delete joke');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete joke');
    }
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="container mx-auto py-6 px-2">
          <div className="bg-white px-6 py-8 mb-4 rounded-md">
            <h1 className="text-3xl font-bold mb-4 text-center md:text-left">
              Your Profile
            </h1>
            <div className="md:flex md:flex-col md:items-center">
              {/* Slika i informacije o korisniku */}
              <div className="md:w-1/3 flex-shrink-0 mb-6">
                <div className="mb-4 flex justify-center">
                  <Image
                    className="rounded-full"
                    src={profileImage || profileDefault}
                    width={150}
                    height={150}
                    alt="User"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-xl md:text-2xl mb-4 rounded-xl p-3 shadow-md">
                    <span className="font-bold block">Name</span> {profileName}
                  </h2>
                  <h2 className="text-xl md:text-2xl mb-4 rounded-xl p-3 shadow-md ">
                    <span className="font-bold block">Email</span>
                    {profileEmail}
                  </h2>
                </div>
              </div>

              {/* Lista viceva */}
              <div className="md:w-2/3 md:pl-4">
                <h2 className="text-2xl font-semibold mb-6">Your Jokes</h2>
                {!loading && jokes.length === 0 && (
                  <p>You have no jokes posted</p>
                )}
                {loading ? (
                  <Spinner loading={loading} />
                ) : (
                  jokes.map((joke) => (
                    <div key={joke._id} className="flex flex-col">
                      {/* Joke Card */}
                      <div className="rounded-xl shadow-md mb-10 border">
                        <div className="p-4 relative">
                          <div className="text-gray-300 absolute hidden md:block md:right-3 md:top-3 text-lg">
                            {new Date(joke.createdAt).toLocaleString()}
                          </div>
                          {/* Joke categories */}
                          <div className="text-left mb-6">
                            <div className="text-gray-600">
                              Joke Category
                              <span> #{joke.category}</span>
                            </div>
                          </div>

                          {/* Joke Description */}
                          <div className="text-left lg:text-left mb-12 overflow-hidden">
                            <div className="text-gray-600 text-lg break-all">
                              {joke.description}
                            </div>
                          </div>

                          {/* Like and comment section */}
                          <div className="lg:flex gap-4 text-gray-500 mb-4 text-lg">
                            <p className="flex items-center">
                              <FcLike className="inline mr-1" /> {joke.likes}
                              <span className="lg:inline ml-1">Likes</span>
                            </p>
                            <p className="flex items-center">
                              <FaRegCommentDots className="inline mr-1" />
                              {joke.comments.length}
                              <span className="lg:inline ml-1">Comments</span>
                            </p>
                          </div>
                          <div className="border border-gray-100 mb-5"></div>
                          <div className="mb-4 flex flex-col md:inline-block gap-2">
                            <Link
                              href={`/jokes/${joke._id}`}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center md:text-lg inline-block md:mr-2"
                            >
                              See comments
                            </Link>
                            <Link
                              href={`/jokes/${joke._id}/edit`}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-center md:text-lg inline-block md:mr-2"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDeleteJoke(joke._id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-center md:text-lg inline-block md:mr-2"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
