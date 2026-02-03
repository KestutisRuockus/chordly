const TeacherLimitReachedNotice = () => {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <p>
        This teacher has reached the maximum number of students allowed by their
        current plan.
      </p>

      <p className="text-muted-foreground">
        To continue, please contact the teacher directly to discuss
        availability.
      </p>
    </div>
  );
};

export default TeacherLimitReachedNotice;
