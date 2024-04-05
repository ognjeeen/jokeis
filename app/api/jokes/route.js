import connectDB from '@/config/database';
import Joke from '@/models/Joke';
// GET /api/jokes
export const GET = async (request) => {
  try {
    await connectDB();

    const jokes = await Joke.find({});

    return new Response(JSON.stringify(jokes), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
