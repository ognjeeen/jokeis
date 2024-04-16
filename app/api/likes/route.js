import connectDB from '@/config/database';
import User from '@/models/User';
import Joke from '@/models/Joke';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

export const POST = async (request) => {
  try {
    await connectDB();

    const { jokeId } = await request.json();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    // Find user in database
    const user = await User.findOne({ _id: userId });

    // Check if user already liked the joke
    let isLiked = user.likedJokes.includes(jokeId);
    let message;

    if (isLiked) {
      // If already liked, remove it
      user.likedJokes.pull(jokeId);
      message = 'Like removed';
      isLiked = false;
    } else {
      // If not liked, add it
      user.likedJokes.push(jokeId);
      message = 'Joke liked';
      isLiked = true;
    }

    const joke = await Joke.findById(jokeId);

    if (isLiked) {
      joke.likes += 1;
    } else {
      joke.likes -= 1;
    }

    await joke.save();
    await user.save();

    return new Response(JSON.stringify({ message, isLiked }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
