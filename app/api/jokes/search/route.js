import connectDB from '@/config/database';
import Joke from '@/models/Joke';

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
    console.log(jokeCategory);

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
