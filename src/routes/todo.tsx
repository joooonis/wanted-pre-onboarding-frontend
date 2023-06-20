import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Todo(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    // Check if token exists in local storage
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <h1 className='font-light text-center text-xl mb-12'>Todo List</h1>
      <ul>
        <li className='p-2 flex w-full justify-between items-center bg-primary rounded-3xl'>
          <label>
            <input type='checkbox' className='mr-2 mt-1 w-4 h-4 rounded-full' />
            <span>TODO 1</span>
          </label>
          <div className='space-x-2'>
            <button
              className='bg-system-black disabled:opacity-50 border-none font-light text-white text-sm shadow-md px-6 py-2 rounded-full'
              data-testid='modify-button'>
              수정
            </button>
            <button
              className='bg-system-black disabled:opacity-50 border-none font-light text-white text-sm shadow-md px-6 py-2 rounded-full'
              data-testid='delete-button'>
              삭제
            </button>
          </div>
        </li>
      </ul>
      <form className='space-y-4 mt-12'>
        <h1 className='font-light text-center'>할일 추가하기</h1>

        <input
          data-testid='new-todo-input'
          className='w-full rounded-full px-4 py-3 placeholder:font-light appearance-none focus:outline-none'
          type='text'
        />
        <button
          data-testid='new-todo-add-button'
          className='bg-system-black disabled:opacity-50 border-none font-light text-white w-full shadow-md py-3 rounded-full'
          type='submit'>
          추가
        </button>
      </form>
    </div>
  );
}
