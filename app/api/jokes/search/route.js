import connectDB from '@/config/database';
import Joke from '@/models/Joke';

export const dynamic = 'force-dynamic';

// GET /api/jokes/search
export const GET = async (request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const jokeCategory = searchParams.get('jokeCategory');

    let query = {};

    if (jokeCategory && jokeCategory !== 'All') {
      const categoryPattern = new RegExp(jokeCategory, 'i');
      query.category = categoryPattern;
    }

    const jokes = await Joke.find(query);

    return new Response(JSON.stringify(jokes), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', {
      status: 500,
    });
  }
};
