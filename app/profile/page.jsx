'use client';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import profileDefault from '@/assets/images/profile.png';
import { FaRegCommentDots } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

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
                  <h2 className="text-xl md:text-2xl mb-4 rounded-xl p-4 shadow-md">
                    <span className="font-bold block">Name: </span>{' '}
                    {profileName}
                  </h2>
                  <h2 className="text-xl md:text-2xl mb-4 rounded-xl p-6 shadow-md">
                    <span className="font-bold block">Email: </span>{' '}
                    {profileEmail}
                  </h2>
                </div>
              </div>

              {/* Lista viceva */}
              <div className="md:w-2/3 md:pl-4">
                <h2 className="text-2xl font-semibold mb-6">Your Jokes</h2>
                <div className="flex flex-col">
                  {/* Joke Card */}
                  <div className="rounded-xl shadow-md mb-10 border">
                    <div className="p-4 relative">
                      <div className="text-gray-300 absolute right-3 top-3 text-lg">
                        24.21.2
                      </div>
                      {/* Joke categories */}
                      <div className="text-left mb-6">
                        <div className="text-gray-600">
                          Joke Category
                          <span> #IT</span>
                        </div>
                      </div>

                      {/* Joke Description */}
                      <div className="text-left lg:text-left mb-12 overflow-hidden">
                        <div className="text-gray-600 text-lg break-all">
                          Jgggggggggggggggggggggggggfdfgdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffg
                        </div>
                      </div>

                      {/* Like and comment section */}
                      <div className="lg:flex gap-4 text-gray-500 mb-4 text-lg">
                        <p className="flex items-center">
                          <FcLike className="inline mr-1" /> 20
                          <span className="lg:inline ml-1">Likes</span>
                        </p>
                        <p className="flex items-center">
                          <FaRegCommentDots className="inline mr-1" />
                          20
                          <span className="lg:inline ml-1">Comments</span>
                        </p>
                      </div>
                      <div className="border border-gray-100 mb-5"></div>
                      <div className="mb-4">
                        <Link
                          href={`/jokes/`}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-lg block"
                        >
                          See comments
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
