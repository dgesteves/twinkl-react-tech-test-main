type NoPostsFoundProps = {
  message: string;
};

export function NoPostsFound({ message }: NoPostsFoundProps) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
      }}
    >
      {message}
    </div>
  );
}
