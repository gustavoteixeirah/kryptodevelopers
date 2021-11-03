const Base = (props) => {
  const { children } = props;

  return (
    <div className="min-w-screen min-h-screen text-white font-poppins" style={{ backgroundColor: '#111827' }}>
      {children}
    </div>
  );
};

export default Base;
