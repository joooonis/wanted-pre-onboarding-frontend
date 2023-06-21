import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export default function TodoList(): JSX.Element {
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

  const handleTodoToggle = async (todoId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Unauthorized');
        return;
      }

      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      });

      setTodos(updatedTodos);

      // Update the todo completion status on the server
      await fetch(
        `https://www.pre-onboarding-selection-task.shop/todos/${todoId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            todo: updatedTodos.find((todo) => todo.id === todoId)?.todo,
            isCompleted: updatedTodos.find((todo) => todo.id === todoId)
              ?.isCompleted,
          }),
        }
      );
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

  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTodo, setEditedTodo] = useState('');
  const handleEditTodo = (todoId: number, todo: string) => {
    setEditingTodoId(todoId);
    setEditedTodo(todo);
  };

  const handleSaveTodo = async (todoId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Unauthorized');
        return;
      }

      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            todo: editedTodo,
          };
        }
        return todo;
      });

      setTodos(updatedTodos);

      await fetch(
        `https://www.pre-onboarding-selection-task.shop/todos/${todoId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            todo: editedTodo,
            isCompleted: updatedTodos.find((todo) => todo.id === todoId)
              ?.isCompleted,
          }),
        }
      );

      setEditingTodoId(null);
      setEditedTodo('');
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Unauthorized');
        return;
      }

      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(updatedTodos);

      await fetch(
        `https://www.pre-onboarding-selection-task.shop/todos/${todoId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1 className='font-light text-center text-xl mb-12'>Todo List</h1>
      <ul className='space-y-2'>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className=' p-2 flex w-full justify-between items-center bg-primary rounded-3xl'>
            <label className='flex w-[calc(100%-102px)]'>
              <input
                type='checkbox'
                defaultChecked={todo.isCompleted}
                onChange={() => handleTodoToggle(todo.id)}
                className='mr-2 mt-1 w-4 h-4 rounded-full'
              />
              {editingTodoId === todo.id ? (
                <input
                  className='grow bg-gray-200 rounded-md px-2 py-1'
                  type='text'
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                />
              ) : (
                <span>{todo.todo}</span>
              )}
            </label>
            <div className='space-x-2'>
              {editingTodoId === todo.id ? (
                <Button
                  size='sm'
                  testId='modify-button'
                  onClick={() => handleSaveTodo(todo.id)}>
                  완료
                </Button>
              ) : (
                <Button
                  size='sm'
                  testId='modify-button'
                  onClick={() => handleEditTodo(todo.id, todo.todo)}>
                  수정
                </Button>
              )}
              {editingTodoId === todo.id ? (
                <Button size='sm' onClick={() => setEditingTodoId(null)}>
                  취소
                </Button>
              ) : (
                <Button
                  size='sm'
                  testId='delete-button'
                  onClick={() => handleDeleteTodo(todo.id)}>
                  삭제
                </Button>
              )}
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
        <Button size='lg' testId='new-todo-add-button' type='submit'>
          추가
        </Button>
      </form>
    </div>
  );
}
