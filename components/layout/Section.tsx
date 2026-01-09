type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

const Section = ({ children, className }: SectionProps) => {
  return (
    <section className={`border mx-auto w-fit p-6 ${className}`}>
      {children}
    </section>
  );
};

export default Section;
