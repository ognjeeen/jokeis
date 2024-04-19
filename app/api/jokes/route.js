import connectDB from '@/config/database';
import Joke from '@/models/Joke';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

// GET /api/jokes
export const GET = async (request) => {
  try {
    await connectDB();

    const jokes = await Joke.find({});

    const totalLikes = await Joke.aggregate([
      {
        $group: {
          _id: null,
          totalLikes: { $sum: '$likes' },
        },
      },
    ]);

    const totalUsers = await User.countDocuments();

    const responseData = {
      jokes: jokes,
      totalLikes: totalLikes.length > 0 ? totalLikes[0].totalLikes : 0,
      totalUsers: totalUsers,
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId, ownerImage } = sessionUser;

    const formData = await request.formData();

    // Create jokeData object from database
    const jokeData = {
      category: formData.get('category'),
      description: formData.get('description'),
      author:
        formData.get('author') === '' ? 'Anonymous' : formData.get('author'),
      likes: 0,
      owner: userId,
      ownerImage,
    };

    const newJoke = new Joke(jokeData);
    await newJoke.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/jokes/${newJoke._id}`
    );
  } catch (error) {
    console.log(error);
    return new Response('Failed to add joke', { status: 500 });
  }
};
