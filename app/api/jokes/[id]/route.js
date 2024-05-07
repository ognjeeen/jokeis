import connectDB from '@/config/database';
import Joke from '@/models/Joke';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

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

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    await connectDB();

    const joke = await Joke.findById(jokeId);

    if (!joke) return new Response('Joke Not Found', { status: 404 });

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

// PUT /api/jokes/:id/edit
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { id } = params;

    const { userId } = sessionUser;

    const formData = await request.formData();

    const existingJoke = await Joke.findById(id);
    if (!existingJoke) {
      return new Response('Joke does not exist', { status: 404 });
    }

    if (existingJoke.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Create jokeData object from database
    const jokeData = {
      category: existingJoke.category,
      description: formData.get('description'),
      author: existingJoke.author,
      owner: userId,
    };

    // Update joke in database
    const updatedJoke = await Joke.findByIdAndUpdate(id, jokeData);

    return new Response(JSON.stringify(updatedJoke), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Failed to add joke', { status: 500 });
  }
};
