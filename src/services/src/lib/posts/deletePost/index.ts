import { axiosInstance } from '../../axiosInstance.ts';
import { POSTS } from '@twinkl-react-tech-test-main/constants';

export async function deletePost(postId: number): Promise<number> {
  if (!Number.isInteger(postId) || postId <= 0) {
    throw new Error('Invalid postId: must be a positive integer');
  }

  try {
    await axiosInstance.delete(`${POSTS}/${postId}`);
    return postId;
  } catch (error) {
    console.error('Failed to delete post:', error);
    throw new Error('Error deleting post');
  }
}
