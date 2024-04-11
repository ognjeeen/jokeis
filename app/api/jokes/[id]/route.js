import connectDB from '@/config/database';
import Joke from '@/models/Joke';
import { getSessionUser } from '@/utils/getSessionUser';

// GET /api/joke/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const joke = await Joke.findById(params.id);

    if (!joke) return new Response('Joke Not Found', { status: 404 });

    return new Response(JSON.stringify(joke), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};

// DELETE /api/joke/:id
export const DELETE = async (request, { params }) => {
  try {
    const jokeId = params.id;

    const sessionUser = await getSessionUser();

    // Check for session
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    await connectDB();

    const joke = await Joke.findById(jokeId);

    if (!joke) return new Response('Joke Not Found', { status: 404 });

    // Verify ownership
    if (joke.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    await joke.deleteOne();

    return new Response('Joke Deleted', {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
