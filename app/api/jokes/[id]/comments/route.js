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

    const { content } = await request.json();

    const jokeCommentData = {
      content,
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

    return new Response('Comment added successfully');
  } catch (error) {
    console.log(error);
    return new Response('Failed to add comment', { status: 500 });
  }
};

export const DELETE = async (request) => {
  try {
    const { jokeId, commentId } = await request.json();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const userId = sessionUser.user.id;

    await connectDB();

    const joke = await Joke.findById(jokeId);

    if (!joke) return new Response('Joke Not Found', { status: 404 });

    const commentToDelete = joke.comments.find(
      (comment) => comment._id.toString() === commentId
    );

    if (!commentToDelete) {
      return new Response('Comment Not Found', { status: 404 });
    }

    if (userId !== commentToDelete.owner.toString()) {
      return new Response('Unauthorized', { status: 401 });
    }

    joke.comments = joke.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );

    await joke.save();

    return new Response('Comment deleted', {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
