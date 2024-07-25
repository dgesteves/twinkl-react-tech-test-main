export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Page = {
  data: Post[];
  nextPage: number | undefined;
  totalPages: number;
};

export type PaginatedPosts = {
  pages: Page[];
  pageParams: number[];
};
