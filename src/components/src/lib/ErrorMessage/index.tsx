type ErrorMessageProps = {
  message: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={'text-center p-5 bg-red-500 text-white'}>{message}</div>
  );
}
