import connectDB from '@/config/database';
import Joke from '@/models/Joke';
import { getSessionUser } from '@/utils/getSessionUser';

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const userId = params.userId;

    if (!userId) {
      return new Response('User ID is required', { status: 400 });
    }

    if (sessionUser.userId !== userId) {
      return new Response('Unauthorized', { status: 403 });
    }

    const jokes = await Joke.find({ owner: userId });

    return new Response(JSON.stringify(jokes), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
