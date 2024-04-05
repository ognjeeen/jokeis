import connectDB from '@/config/database';
import Joke from '@/models/Joke';

// GET /api/jokes:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const joke = await Joke.findById(params.id);

    if (!joke) return new Response('Joke Not Found', { status: 404 });

    return new Response(JSON.stringify(joke), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
