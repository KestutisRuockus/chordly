import type { TeacherRow } from "@/db/types";
import ProfileImagePicker from "@/components/ProfileImagePicker";
import { useProfileAvatarUpload } from "@/hooks/useProfileAvatarUpload/useProfileAvatarUpload";
import InstrumentsSelection from "./InstrumentsSelection";
import Heading from "@/components/ui/Heading";

type Props = {
  initialData: TeacherRow;
  formAction: (formData: FormData) => void | Promise<void>;
  isPending: boolean;
  error?: string;
};

const lessonTypeList = ["online", "in-person", "hybrid"];

const TeacherProfileForm = ({
  initialData,
  formAction,
  isPending,
  error,
}: Props) => {
  const { profileImage, setProfileImage, uploadProfileAvatar } =
    useProfileAvatarUpload();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const avatarUrl = await uploadProfileAvatar();
    if (avatarUrl) {
      formData.append("avatarUrl", avatarUrl);
    } else if (initialData.avatarUrl) {
      formData.append("avatarUrl", initialData.avatarUrl);
    }

    await formAction(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
      <Heading heading="Edit Teacher Profile" />
      <div className="flex flex-col sm:flex-row gap-2 bg-card p-4 rounded-md">
        <InstrumentsSelection defaultSelected={initialData.instruments ?? []} />
        <div className="flex flex-col gap-2 w-full sm:w-3/5 2xl:w-2/3">
          <label htmlFor="experience">
            Experience<span className="text-red-500">*</span>
          </label>
          <select
            id="experience"
            name="experience"
            className="border outline-ring"
            defaultValue={initialData.experience ?? ""}
          >
            <option value="">Teaching experience</option>
            <option value="0-1">0-1 years</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">5+ years</option>
          </select>

          <fieldset>
            <legend>
              Lesson Type<span className="text-red-500">*</span>
            </legend>
            <div className="flex gap-4">
              {lessonTypeList.map((type) => (
                <label htmlFor={`lessonType-${type}`} key={type}>
                  <input
                    id={`lessonType-${type}`}
                    type="radio"
                    name="lessonType"
                    value={type}
                    defaultChecked={
                      (initialData.lessonType ?? "hybrid") === type
                    }
                    className="accent-primary"
                  />
                  {type}
                </label>
              ))}
            </div>
          </fieldset>

          <label htmlFor="hourlyRate">
            Hourly rate<span className="text-red-500">*</span>
          </label>
          <input
            id="hourlyRate"
            name="hourlyRate"
            type="number"
            placeholder="Hourly rate (€)"
            className="border outline-ring"
            defaultValue={initialData.hourlyRate ?? ""}
          />

          <label htmlFor="bio">
            Bio<span className="text-red-500">*</span>
          </label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Tell us about yourself"
            className="border p-2 outline-ring"
            defaultValue={initialData.bio ?? ""}
            rows={4}
          />

          <label htmlFor="location">
            Location
            <span className="text-red-500">*</span>
          </label>
          <input
            id="location"
            name="location"
            placeholder="Your city/area"
            className="border p-2 outline-ring"
            defaultValue={initialData.location ?? ""}
          />

          <label htmlFor="lessonLocation">Lesson location</label>
          <input
            id="lessonLocation"
            name="lessonLocation"
            placeholder="Address where you teach"
            className="border p-2 outline-ring"
            defaultValue={initialData.lessonLocation ?? ""}
          />

          <label htmlFor="meetingUrl">Online lessons link</label>
          <input
            id="meetingUrl"
            name="meetingUrl"
            placeholder="Meeting link"
            className="border p-2 outline-ring"
            defaultValue={initialData.meetingUrl ?? ""}
          />
        </div>
      </div>

      <ProfileImagePicker
        value={profileImage}
        onChange={setProfileImage}
        currentImageUrl={initialData.avatarUrl ?? undefined}
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="border p-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 hover:bg-primary/70 max-w-80 mx-auto"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default TeacherProfileForm;
