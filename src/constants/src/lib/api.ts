export const REQUEST_TIMEOUT = 1000;
export const REQUEST_HEADERS = {
  'Content-Type': 'application/json',
};
// This should be moved to a .env file
export const BASE_URL = 'https://jsonplaceholder.typicode.com';
export const POSTS = '/posts';
export const TOTAL_COUNT_HEADER = 'x-total-count';

export enum ErrorMessages {
  INVALID_POST_ID = 'Invalid postId: must be a positive integer',
  DELETE_POST_ERROR = 'Error deleting post',
  FETCH_POSTS_ERROR = 'Error fetching paginated posts',
}

export enum ErrorLogMessages {
  DELETE_POST = 'Failed to delete post:',
  FETCH_POSTS = 'Failed to fetch paginated posts:',
}
