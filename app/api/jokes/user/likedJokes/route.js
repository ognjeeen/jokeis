import connectDB from '@/config/database';
import Joke from '@/models/Joke';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

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

    return new Response(JSON.stringify(likedJokes), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
