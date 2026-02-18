type Props = {
  subHeading: string;
};

const SubHeading = ({ subHeading }: Props) => {
  return (
    <h3 className="font-medium text-xl text-center text-foreground">
      {subHeading}
    </h3>
  );
};

export default SubHeading;
