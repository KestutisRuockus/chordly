type MainProps = {
  children: React.ReactNode;
};

const Main = ({ children }: MainProps) => {
  return (
    <main className="w-4/5 mx-auto my-8 flex flex-col gap-8">{children}</main>
  );
};

export default Main;
