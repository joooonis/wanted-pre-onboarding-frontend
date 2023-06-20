import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Root(): JSX.Element {
  const location = useLocation();
  return (
    <>
      <div className='bg-primary h-screen'>
        <nav className='flex bg-system-black p-4 items-center justify-between'>
          <h1 className='font-bold text-xl  text-white'>Todo's</h1>
          {location.pathname === '/login' && (
            <Link
              className='appearance-none no-underline text-white'
              to={`/signup`}>
              Sign up
            </Link>
          )}
          {location.pathname === '/signup' && (
            <Link
              className='appearance-none no-underline text-white'
              to={`/login`}>
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
