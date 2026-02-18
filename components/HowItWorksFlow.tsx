type Props = {
  label: string;
  items: { title: string; description: string }[];
};

const HowItWorksFlow = ({ label, items }: Props) => {
  return (
    <article className="flex flex-col gap-4 my-4 border-b bg-card rounded-md py-12 px-8 md:px-16">
      <div>
        <h3 className="font-medium italic text-foreground text-xl text-center">
          {label}
        </h3>
        <div className="w-full h-1 bg-muted-foreground"></div>
      </div>
      {items.map((item, index) => (
        <div key={`${label}-${index}`}>
          <h4 className="font-medium text-foreground">• {item.title}</h4>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
      ))}
    </article>
  );
};

export default HowItWorksFlow;
