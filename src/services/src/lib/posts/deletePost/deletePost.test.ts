import { deletePost } from './index';
import { axiosInstance } from '../../axiosInstance.ts';
import {
  ErrorLogMessages,
  ErrorMessages,
  POSTS,
} from '@twinkl-react-tech-test-main/constants';
import { vi, describe, it, expect, Mock } from 'vitest';

vi.mock('../../axiosInstance.ts');

describe('deletePost', () => {
  it('deletes a post successfully when given a valid postId', async () => {
    (axiosInstance.delete as Mock).mockResolvedValueOnce({});
    const postId = 1;
    const result = await deletePost(postId);
    expect(result).toBe(postId);
    expect(axiosInstance.delete).toHaveBeenCalledWith(`${POSTS}/${postId}`);
  });

  it('throws an error when postId is not a valid integer', async () => {
    await expect(deletePost('invalid' as any)).rejects.toThrow(
      ErrorMessages.INVALID_POST_ID
    );
    await expect(deletePost(-1)).rejects.toThrow(ErrorMessages.INVALID_POST_ID);
    await expect(deletePost(0)).rejects.toThrow(ErrorMessages.INVALID_POST_ID);
  });

  it('throws an error when delete request fails', async () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => ({} as object));
    (axiosInstance.delete as Mock).mockRejectedValueOnce(
      new Error('Network Error')
    );
    const postId = 1;
    await expect(deletePost(postId)).rejects.toThrow(
      ErrorMessages.DELETE_POST_ERROR
    );
    expect(console.error).toHaveBeenCalledWith(
      ErrorLogMessages.DELETE_POST,
      expect.any(Error)
    );
    consoleErrorMock.mockRestore();
  });

  it('throws an error when postId is a floating point number', async () => {
    await expect(deletePost(1.5)).rejects.toThrow(
      ErrorMessages.INVALID_POST_ID
    );
  });

  it('throws an error when postId is a string representation of a number', async () => {
    await expect(deletePost('1' as any)).rejects.toThrow(
      ErrorMessages.INVALID_POST_ID
    );
  });
});
