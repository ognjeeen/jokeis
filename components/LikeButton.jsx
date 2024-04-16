import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';

const LikeButton = ({ joke, setJoke }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isLiked, setIsLiked] = useState(false);

  const handleClick = async () => {
    if (!userId) {
      toast.error('You need to sign in to like jokes');
      return;
    }

    try {
      const res = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jokeId: joke._id,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        setIsLiked(data.isLiked);

        setJoke((prevJoke) => ({
          ...prevJoke,
          likes: data.isLiked ? prevJoke.likes + 1 : prevJoke.likes - 1,
        }));

        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    if (!userId) return;

    const checkLikedStatus = async () => {
      try {
        const res = await fetch('/api/likes/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jokeId: joke._id,
          }),
        });

        if (res.status === 200) {
          const data = await res.json();
          setIsLiked(data.isLiked);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkLikedStatus();
  }, [joke._id, userId]);

  return (
    <div className="gap-4 text-gray-500 mb-4">
      <p className="flex items-center">
        {isLiked ? (
          <FcLike
            size="24"
            className="flex mr-1 cursor-pointer"
            onClick={handleClick}
          />
        ) : (
          <FcLikePlaceholder
            size="24"
            className="flex mr-1 cursor-pointer"
            onClick={handleClick}
          />
        )}
        <span className="ml-1 text-lg">{joke.likes} Likes</span>
      </p>
    </div>
  );
};

export default LikeButton;
