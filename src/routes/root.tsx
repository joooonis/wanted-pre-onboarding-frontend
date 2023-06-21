import { Link, Outlet, useLocation } from 'react-router-dom';
import Button from '../components/Button/Button';

export default function Root(): JSX.Element {
  const location = useLocation();
  return (
    <div className='bg-gray-100'>
      <div className='max-w-[768px] m-auto'>
        <div
          className={`${
            location.pathname === '/signin' ? 'bg-primary' : 'bg-secondary'
          } min-h-screen h-full`}>
          <nav className='flex font-light bg-system-black p-4 items-center justify-between'>
            <Link to={'/'}>
              <h1 className='text-xl text-white'>Todo's</h1>
            </Link>
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
          <div className='px-4 py-4 '>
            {location.pathname === '/' && (
              <div className='w-full flex-col space-y-4 flex h-[calc(100vh-92px)] justify-center items-center'>
                <Link className='w-full' to={'/signup'}>
                  <Button size='lg'>Sign up</Button>
                </Link>
                <Link className='w-full' to={'/signin'}>
                  <Button size='lg'>Log in</Button>
                </Link>
                <Link className='w-full' to={'/todo'}>
                  <Button size='lg'>To do</Button>
                </Link>
              </div>
            )}
            <Outlet />
          </div>
        </div>
        <div id='detail'></div>
      </div>
    </div>
  );
}
