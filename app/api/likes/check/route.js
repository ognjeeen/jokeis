import connectDB from '@/config/database';
import User from '@/models/User';
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

    const user = await User.findOne({ _id: userId });

    // Check if user already liked the joke
    let isLiked = user.likedJokes.includes(jokeId);

    return new Response(JSON.stringify({ isLiked }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
