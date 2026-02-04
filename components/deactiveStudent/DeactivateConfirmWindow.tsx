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
    <>
      <p className="my-4">
        Are you sure you want to <strong>remove</strong> this student from your
        active students? <br />
        This will <strong>cancel</strong> all upcoming lessons.
      </p>
      <div className="flex gap-4">
        <button
          onClick={onSubmit}
          className="px-4 cursor-pointer border rounded-md"
        >
          {isSubmitting ? "Saving..." : "Confirm"}
        </button>
        <button
          onClick={onClose}
          className="px-4 cursor-pointer border rounded-md"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default DeactivateConfirmWindow;
