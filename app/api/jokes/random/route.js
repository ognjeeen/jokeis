import connectDB from '@/config/database';
import Joke from '@/models/Joke';

// GET /api/jokes
export const GET = async (request) => {
  try {
    await connectDB();

    const jokeCountDocuments = await Joke.countDocuments();
    const randomNumber = Math.floor(Math.random() * jokeCountDocuments);
    const randomJoke = await Joke.findOne().skip(randomNumber);

    return new Response(JSON.stringify(randomJoke), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
