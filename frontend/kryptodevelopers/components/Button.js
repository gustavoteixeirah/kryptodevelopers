import Link from 'next/link';

const Button = (props) => {
  const { size, href, classes, children, onClick, as: As } = props;
  const btnClasses = `inline-block rounded-full border-2  bg-gray-900 hover:bg-gray-800 focus:bg-gray-700 border border-teal-light ${
    size === 'lg' ? 'px-16 py-4 text-xl' : 'px-6 py-1 text-lg'
  } ${classes || ''}`;

  return As === 'a' ? (
    <Link href={href}>
      <a className={btnClasses}>{children}</a>
    </Link>
  ) : (
    <button className={btnClasses} onClick={onClick}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  size: 'sm',
  as: 'button',
};

export default Button;
