import Link from 'next/link';

const LinkButton = (props) => {
  const { size, href, classes, children } = props;

  return (
    <Link href={href}>
      <a
        className={`inline-block rounded-full border-2  bg-gray-900 hover:bg-gray-800 focus:bg-gray-700 border border-teal-light ${
          size === 'lg' ? 'px-16 py-4 text-xl' : 'px-6 py-1 text-lg'
        } ${classes || ''}`}
      >
        {children}
      </a>
    </Link>
  );
};

LinkButton.defaultProps = {
  size: 'sm',
};

export default LinkButton;
