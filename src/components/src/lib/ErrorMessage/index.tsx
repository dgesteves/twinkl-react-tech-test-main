type ErrorMessageProps = {
  message: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#ff4d4d',
        color: 'white',
      }}
    >
      {message}
    </div>
  );
}
