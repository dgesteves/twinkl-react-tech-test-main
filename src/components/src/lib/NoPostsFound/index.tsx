type NoPostsFoundProps = {
  message: string;
};

export function NoPostsFound({ message }: NoPostsFoundProps) {
  return (
    <div className="flex items-center justify-center h-full w-full text-2xl font-bold">
      {message}
    </div>
  );
}
