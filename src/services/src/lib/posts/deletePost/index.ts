import { axiosInstance } from '../../axiosInstance.ts';
import {
  ErrorLogMessages,
  ErrorMessages,
  POSTS,
} from '@twinkl-react-tech-test-main/constants';

export async function deletePost(postId: number): Promise<number> {
  if (!Number.isInteger(postId) || postId <= 0) {
    throw new Error(ErrorMessages.INVALID_POST_ID);
  }

  try {
    await axiosInstance.delete(`${POSTS}/${postId}`);
    return postId;
  } catch (error) {
    console.error(ErrorLogMessages.DELETE_POST, error);
    throw new Error(ErrorMessages.DELETE_POST_ERROR);
  }
}
