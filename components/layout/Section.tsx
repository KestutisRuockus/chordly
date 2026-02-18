type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

const Section = ({ children, className }: SectionProps) => {
  return (
    <section
      className={`bg-surface border rounded-md shadow-sm mx-auto w-full p-4 sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;
