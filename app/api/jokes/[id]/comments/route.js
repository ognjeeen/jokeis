import connectDB from '@/config/database';
import Joke from '@/models/Joke';
import { getSessionUser } from '@/utils/getSessionUser';

export const POST = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId, ownerImage, ownerName } = sessionUser;

    const formData = await request.formData();

    // Create jokeData object from database
    const jokeCommentData = {
      content: formData.get('content'),
      owner: userId,
      ownerName,
      ownerImage,
    };

    const jokeId = params.id;

    const updatedJoke = await Joke.findByIdAndUpdate(
      jokeId,
      { $push: { comments: jokeCommentData } },
      { new: true }
    );

    if (!updatedJoke) {
      return new Response('Joke not found', { status: 404 });
    }

    return Response.redirect(`${process.env.NEXTAUTH_URL}/jokes/${jokeId}`);
  } catch (error) {
    console.log(error);
    return new Response('Failed to add comment', { status: 500 });
  }
};
