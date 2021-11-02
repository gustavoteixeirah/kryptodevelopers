import Link from 'next/link';

const NavBarLink = (props) => {
  const { href, children, onClick } = props;

  return (
    <Link href={href}>
      <a className="hover:text-teal-light" onClick={onClick}>
        {children}
      </a>
    </Link>
  );
};

export default NavBarLink;
