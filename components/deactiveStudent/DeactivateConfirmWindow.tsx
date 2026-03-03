type Props = {
  onSubmit: () => void;
  onClose: () => void;
  isSubmitting: boolean;
};

const DeactivateConfirmWindow = ({
  onSubmit,
  onClose,
  isSubmitting,
}: Props) => {
  return (
    <div className="max-sm:w-11/12">
      <p className="my-4">
        Are you sure you want to <strong>remove</strong> this student from your
        active students? <br />
        This will <strong>cancel</strong> all upcoming lessons.
      </p>
      <div className="flex gap-4">
        <button
          onClick={onSubmit}
          type="button"
          className="px-4 cursor-pointer border rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/70 transition-colors duration-300"
        >
          {isSubmitting ? "Saving..." : "Confirm"}
        </button>
        <button
          onClick={onClose}
          type="button"
          className="px-4 cursor-pointer border rounded-md bg-secondary text-secondbg-secondary-foreground hover:bg-secondary/70 transition-colors duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeactivateConfirmWindow;
