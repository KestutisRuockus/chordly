type MainProps = {
  children: React.ReactNode;
  className?: string;
};

const Main = ({ children, className }: MainProps) => {
  return (
    <main className={`w-4/5 mx-auto my-8 flex flex-col gap-8 ${className}`}>
      {children}
    </main>
  );
};

export default Main;
