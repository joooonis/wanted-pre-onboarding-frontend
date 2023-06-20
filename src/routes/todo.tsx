import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Todo(): JSX.Element {
  const [todo, setTodo] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Unauthorized');
        return;
      }

      const response = await fetch(
        'https://www.pre-onboarding-selection-task.shop/todos',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ todo }),
        }
      );

      if (response.status === 201) {
        const data = await response.json();
        // Handle the created todo data
        console.log('Created Todo:', data);
        setTodo('');
      } else {
        setError('Failed to add todo');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

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
      <form className='space-y-4 mt-12' onSubmit={handleFormSubmit}>
        <h1 className='font-light text-center'>할일 추가하기</h1>
        <input
          data-testid='new-todo-input'
          value={todo}
          onChange={handleTodoChange}
          placeholder='할 일을 입력하세요'
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
