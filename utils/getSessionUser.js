import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOption';

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return null;
    }

    return {
      user: session.user,
      userId: session.user.id,
      ownerImage: session.user.image,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
