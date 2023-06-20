import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!isEmailValid || !isPasswordValid) {
      setError('Invalid email or password.');
      return;
    }

    try {
      const response = await fetch(
        'https://www.pre-onboarding-selection-task.shop/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        navigate('/signin');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to register.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className='font-bold text-xl mb-12'>Sign up</h1>
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
        <button
          className='bg-system-black disabled:opacity-50 border-none font-light text-white w-full shadow-md py-3 rounded-full'
          type='submit'
          data-testid='signup-button'
          disabled={!isEmailValid || !isPasswordValid}>
          Sign up
        </button>
        {error && (
          <p className='text-red-500 my-2 text-xs text-center'>{error}</p>
        )}
      </div>
    </form>
  );
}
