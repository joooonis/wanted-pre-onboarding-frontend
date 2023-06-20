import { useRouteError } from 'react-router-dom';

export default function ErrorPage(): JSX.Element {
  const error = useRouteError();

  if (typeof error === 'object' && error !== null) {
    console.error(error);

    return (
      <div id='error-page'>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{(error as Error).message}</i>
        </p>
      </div>
    );
  }

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>Unknown error occurred.</i>
      </p>
    </div>
  );
}
