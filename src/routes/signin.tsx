import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { AuthApi } from '../apis/auth/authApi';

export default function Signin(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isEmailValid = email.includes('@');
  const isPasswordValid = password.length >= 8;

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const authApi = new AuthApi();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!isEmailValid || !isPasswordValid) {
      setError('Invalid email or password.');
      return;
    }

    try {
      const { data } = await authApi.signin({ email, password });
      localStorage.setItem('token', data.access_token);
      navigate('/todo');
    } catch (error: any) {
      const data = error.response.data as Error;
      setError(data.message || 'An error occurred. Please try again.');
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
    if (isLoggedIn) {
      navigate('/todo');
    } else {
      // Redirect to /signin if not logged in and trying to access /todo
      if (window.location.pathname === '/todo') {
        navigate('/signin');
      }
    }
  }, [isLoggedIn, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <h1 className='font-bold text-xl mb-12'>Log in</h1>
      <div>
        <label className='font-light text-sm' htmlFor='email'>
          your email
        </label>
        <input
          className='w-full bg-transparent py-2 placeholder:font-light appearance-none border-b border-system-black focus:outline-none'
          id='email'
          placeholder='wanted@email.com'
          type='text'
          data-testid='email-input'
          onChange={handleEmail}
        />
        {isSubmitted && !isEmailValid && (
          <p className='text-red-500 my-2 text-xs'>
            email should include '@' character
          </p>
        )}
      </div>
      <div>
        <input
          className='w-full bg-transparent py-2 placeholder:font-light appearance-none border-b border-system-black focus:outline-none'
          id='password'
          placeholder='password'
          type='password'
          data-testid='password-input'
          onChange={handlePassword}
        />
        {isSubmitted && !isPasswordValid && (
          <p className='text-red-500 my-2 text-xs'>
            password should be longer than 8 characters
          </p>
        )}
      </div>
      <div className='mt-12'>
        <Button
          size='lg'
          testId='signin-button'
          disabled={!isEmailValid || !isPasswordValid}
          type='submit'>
          Log in
        </Button>
        {error && (
          <p className='text-red-500 my-2 text-xs text-center'>{error}</p>
        )}
      </div>
    </form>
  );
}
