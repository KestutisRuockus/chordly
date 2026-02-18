type Props = {
  title: string;
  description?: string;
};

const SectionTitle = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
      {description && (
        <p className="font-medium text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default SectionTitle;
