interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'lg';
  testId?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export default function Button({
  size = 'lg',
  testId,
  onClick,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      data-testid={testId}
      onClick={onClick}
      className={`${
        size === 'lg' ? 'w-full py-3' : 'px-2 py-2 text-sm'
      } ${className} bg-system-black disabled:opacity-50 border-none font-light text-white shadow-md  rounded-full`}>
      {children}
    </button>
  );
}
