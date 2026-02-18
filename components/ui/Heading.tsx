type Props = {
  heading: string;
};

const Heading = ({ heading }: Props) => {
  return (
    <h2 className="font-bold text-2xl text-center text-foreground">
      {heading}
    </h2>
  );
};

export default Heading;
