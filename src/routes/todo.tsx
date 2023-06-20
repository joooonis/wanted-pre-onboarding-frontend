import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export default function Todo(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
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
          body: JSON.stringify({ todo: newTodo }),
        }
      );

      if (response.status === 201) {
        const data = await response.json();

        // Update todos with the new todo
        setTodos([...todos, data]);
        setNewTodo('');
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

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Unauthorized');
          return;
        }

        const response = await fetch(
          'https://www.pre-onboarding-selection-task.shop/todos',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTodos(data);
        } else {
          setError('Failed to fetch todos');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
      }
    };
    fetchTodos();
  }, []);

  return (
    <div>
      <h1 className='font-light text-center text-xl mb-12'>Todo List</h1>
      <ul className='space-y-2'>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className='p-2 flex w-full justify-between items-center bg-primary rounded-3xl'>
            <label>
              <input
                type='checkbox'
                defaultChecked={todo.isCompleted}
                className='mr-2 mt-1 w-4 h-4 rounded-full'
              />
              <span>{todo.todo}</span>
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
        ))}
      </ul>
      <div className='border-b border-black mt-12' />
      <form className='space-y-4 mt-12' onSubmit={handleFormSubmit}>
        <h1 className='font-light text-center'>할일 추가하기</h1>
        <input
          data-testid='new-todo-input'
          value={newTodo}
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
