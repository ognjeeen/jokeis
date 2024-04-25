'use client';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

const Navbar = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);
  const [randomJokeId, setRandomJokeId] = useState(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setAuthProviders();
  }, []);

  useEffect(() => {
    const RandomJoke = async () => {
      try {
        const res = await fetch('/api/jokes/random');

        if (res.status === 200) {
          const data = await res.json();
          setRandomJokeId(data._id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    RandomJoke();
  }, [randomJokeId]);

  return (
    <nav className="p-2 md:p-5 shadow-md">
      <div>
        <div className="relative flex h-20 items-center">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* <!-- Desktop Menu Hidden below md screens --> */}
            <div className="hidden md:ml-6 md:block text-gray-500">
              <div className="flex space-x-2 ">
                <Link
                  href="/"
                  className="text-5xhidden md:block text-5xl font-bold"
                >
                  Jokeis
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <Link href={`/jokes`} className="text-lg m-10">
              All Jokes
            </Link>
            <Link href={`/jokes/${randomJokeId}`} className="text-lg">
              Random Joke
            </Link>
            {session && (
              <Link href="/jokes/add" className="m-10 text-lg">
                Post New Joke
              </Link>
            )}
          </div>

          {/* <!-- Right Side Menu (Logged Out) --> */}
          {!session && (
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                {providers &&
                  Object.values(providers).map((provider, index) => (
                    <button
                      onClick={() => signIn(provider.id)}
                      key={index}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center flex items-center mr-2"
                    >
                      <FaGoogle className="text-white mr-2" />
                      Login/Register
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* <!-- Right Side Menu (Logged In) --> */}
          {session && (
            <div className="absolute right-0 flex items-center pr-2 md:static md:inset-auto ">
              {/* <!-- Profile dropdown button --> */}
              <div className="relative">
                <div>
                  <button
                    type="button"
                    className="lg:mr-10 relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={profileImage}
                      alt=""
                      width={40}
                      height={40}
                      priority={true}
                    />
                  </button>
                </div>

                {/* <!-- Profile dropdown --> */}
                {isProfileMenuOpen && (
                  <div
                    id="user-menu"
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </Link>
                    <Link
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                      href="/jokes/liked"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Liked Jokes
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        signOut();
                      }}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="justify-center flex">
          <div className="space-y-1 px-2 pb-3">
            <Link href="/" className="flex p-1 justify-center">
              Home
            </Link>
            <Link href="/jokes" className="flex p-1 justify-center">
              Jokes
            </Link>
            <Link
              href={`/jokes/${randomJokeId}`}
              className="flex p-1 justify-center"
            >
              Random Joke
            </Link>

            {session && (
              <Link href="/jokes/add" className="flex p-1 justify-center">
                Post New Joke
              </Link>
            )}

            {!session &&
              providers &&
              Object.values(providers).map((provider, index) => (
                <button
                  onClick={() => signIn(provider.id)}
                  key={index}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
                >
                  Login/Register
                </button>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
