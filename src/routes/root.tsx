import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Root(): JSX.Element {
  const location = useLocation();
  return (
    <>
      <div
        className={`${
          location.pathname === '/signin' ? 'bg-primary' : 'bg-secondary'
        } min-h-screen h-full`}>
        <nav className='flex font-light bg-system-black p-4 items-center justify-between'>
          <h1 className='text-xl text-white'>Todo's</h1>
          {location.pathname === '/signin' && (
            <Link
              className='appearance-none no-underline text-white'
              to={`/signup`}>
              Sign up
            </Link>
          )}
          {location.pathname === '/signup' && (
            <Link
              className='appearance-none no-underline text-white'
              to={`/signin`}>
              Log in
            </Link>
          )}
        </nav>

        <div className='px-4 py-4'>
          <Outlet />
        </div>
      </div>
      <div id='detail'></div>
    </>
  );
}
