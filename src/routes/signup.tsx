import { useState } from 'react';

export default function Signup(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isEmailValid = email.includes('@');
  const isPasswordValid = password.length >= 8;

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignup = () => {
    console.log(email, password);
  };

  return (
    <div>
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
      </div>
      <div className='mt-12'>
        <button
          className='bg-system-black disabled:opacity-50 border-none font-light text-white w-full shadow-md py-3 rounded-full'
          data-testid='signup-button'
          disabled={!isEmailValid || !isPasswordValid}
          onClick={handleSignup}>
          Sign up
        </button>
      </div>
    </div>
  );
}
