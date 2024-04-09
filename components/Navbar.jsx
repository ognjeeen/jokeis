// 'use client';
// import { useState, useEffect } from 'react';
// import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

// const Navbar = () => {
//   const { data: session } = useSession();
//   const [providers, setProviders] = useState();

//   useEffect(() => {
//     const setAuthProviders = async () => {
//       const res = await getProviders();
//       setProviders(res);
//     };

//     setAuthProviders();
//   }, []);

//   return (
//     <div className="px-5 py-5 flex md:flex-grow flex-row justify-between mb-10">
//       <span className="hidden md:block text-gray-500 text-4xl font-bold">
//         Jokeis
//       </span>
//       <div>
//         <button className="ml-3">Random Joke</button>
//         {session && (
//           <div>
//             <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-center text-sm ml-3">
//               Post A Joke
//             </button>
//             <img />
//           </div>
//         )}
//         {providers &&
//           Object.values(providers).map((provider, index) => (
//             <button
//               onClick={() => signIn(provider.id)}
//               key={index}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm ml-3"
//             >
//               Login/Register
//             </button>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setAuthProviders();
  }, []);

  return (
    <nav className="p-5">
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
            <Link href="/" className="text-lg">
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
                      src={profileImage || profileDefault}
                      alt=""
                      width={40}
                      height={40}
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
        <div id="mobile-menu">
          <div className="space-y-1 px-2 pb-3">
            <Link href="/" className="flex p-1">
              Home
            </Link>
            <Link href="/jokes" className="flex p-1">
              Jokes
            </Link>
            <Link href="/jokes/random" className="flex p-1">
              Random Joke
            </Link>

            {session && (
              <Link href="/jokes/add" className="flex p-1">
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
