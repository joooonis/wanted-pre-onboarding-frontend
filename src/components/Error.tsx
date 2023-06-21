interface ErrorProps {
  error: string;
}

export default function Error({ error }: ErrorProps): JSX.Element {
  return <p className='text-red-500 my-2 text-xs text-center'>{error}</p>;
}
