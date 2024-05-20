'use client';
import ProfileAnonymous from '@/assets/images/incognito.png';
import LikeButton from '@/components/LikeButton';
import Navbar from '@/components/Navbar';
import Spinner from '@/components/Spinner';
import { fetchJoke } from '@/utils/request';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';

const JokePage = () => {
  const { id } = useParams();

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);

  const [jokeCommentData, setJokeCommentData] = useState({
    content: '',
  });
  const [commentPosted, setCommentPosted] = useState(false);

  const handleChange = (e) => {
    setJokeCommentData((prevComments) => ({
      ...prevComments,
      content: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error('You must be logged in to post a comment');
      return;
    }

    try {
      const response = await fetch(`/api/jokes/${joke._id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: jokeCommentData.content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      toast.success('Comment posted successfully');
      setCommentPosted(true);
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Error posting comment');
    }

    setJokeCommentData({ content: '' });
  };

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

    if (joke === null || commentPosted) {
      fetchJokeData();
      setCommentPosted(false);
    }
  }, [id, joke, commentPosted]);

  const handleDeleteComment = async (jokeId, commentId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this comment?'
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/jokes/${jokeId}/comments`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentId,
          jokeId,
        }),
      });

      if (res.ok) {
        setJoke((prevJoke) => ({
          ...prevJoke,
          comments: prevJoke.comments.filter((c) => c._id !== commentId),
        }));

        toast.success('Comment deleted');
      } else {
        toast.error('You are not author of this comment');
      }
    } catch (error) {
      console.error('Error deleting comment');
      toast.error('Failed to delete comment');
    }
  };

  if (!joke && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">Joke Not Found</h1>
    );
  }

  let sortedComments = [];
  if (joke && joke.comments) {
    sortedComments = joke.comments.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
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

          <div className="relative flex justify-center p-4 lg:p-2">
            {/* Joke Card */}
            <div className="rounded-xl w-full lg:w-4/6 xl:w-3/6 shadow-md mb-5 border relative">
              <div className="text-gray-300 absolute top-2 right-1/2 transform translate-x-1/2 whitespace-nowrap">
                {new Date(joke.createdAt).toLocaleString()}
              </div>
              <div className="p-6">
                {/* Joke categories */}
                <div className="text-left mb-6 mt-2">
                  <div className="text-gray-600 flex items-center">
                    <Image
                      src={
                        joke.author === 'Anonymous'
                          ? ProfileAnonymous
                          : joke.ownerImage
                      }
                      width={40}
                      height={40}
                      className="h-8 w-8 rounded-full mr-2"
                      alt=""
                      priority={true}
                    />
                    <span className="text-lg">{joke.author}</span>
                  </div>
                </div>

                {/* Joke Description */}
                <div className="text-left lg:text-left mb-6">
                  <div className="text-lg text-wrap">{joke.description}</div>
                </div>

                <LikeButton joke={joke} setJoke={setJoke} />
                <div className="border border-gray-100 mb-5"></div>

                {/* Add your comment */}
                <div>
                  <form
                    className="mb-6 flex justify-center items-center"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <textarea
                      value={jokeCommentData.content}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 mr-3 text-gray-700 max-h-44 min-h-16 focus:outline-none focus:shadow-outline"
                      id="content"
                      name="content"
                      placeholder="Enter your comment"
                      required
                    ></textarea>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center h-full"
                      type="submit"
                    >
                      <FaPaperPlane className="mr-2" />
                    </button>
                  </form>
                </div>

                {/* Comment section */}
                <ul>
                  {sortedComments.map((comment, index) => (
                    <li
                      key={index}
                      className="mb-6 shadow appearance-none rounded-xl py-2 px-3 relative"
                    >
                      <div className="flex items-center">
                        <Image
                          src={comment.ownerImage}
                          width={40}
                          height={40}
                          className="h-8 w-8 rounded-full mr-2"
                          alt=""
                          priority={true}
                        />
                        <div>
                          <p>
                            <strong>{comment.ownerName}</strong>
                          </p>
                        </div>
                      </div>
                      <p className="mt-4">{comment.content}</p>
                      <p className="mt-4 text-gray-300">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                      {userId && userId === comment.owner && (
                        <button
                          onClick={() =>
                            handleDeleteComment(joke._id, comment._id)
                          }
                          className="absolute right-4 top-4"
                          title="Delete comment"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-700 hover:text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </button>
                      )}
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
