import connectDB from '@/config/database';
import User from '@/models/User';
import Joke from '@/models/Joke';
import { getSessionUser } from '@/utils/getSessionUser';

// GET /api/liked
export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;
    const user = await User.findOne({ _id: userId });

    const likedJokes = await Joke.find({ _id: { $in: user.likedJokes } });

    console.log(likedJokes);

    return new Response(JSON.stringify(likedJokes), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
