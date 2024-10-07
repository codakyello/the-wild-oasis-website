import { updateProfile } from "../_lib/actions";
import SelectCountry from "./SelectCountry";
import SubmitButton from "./SubmitButton";

function UpdateProfileForm({
  guest: { fullName, email, nationality, nationalID, countryFlag },
}) {
  return (
    <form
      action={updateProfile}
      className="bg-primary-900 py-8 px-12 text-[1.8rem] flex gap-[2.4rem] flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          defaultValue={fullName}
          disabled
          className="px-[2rem] py-[1.2rem] bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          defaultValue={email}
          disabled
          className="px-[2rem] py-[1.2rem] bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="h-[2rem] rounded-sm"
          />
        </div>

        <SelectCountry
          className="px-[2rem] py-[1.2rem] bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          type="number"
          className="px-[2rem] py-[1.2rem] bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-[2.4rem]">
        <SubmitButton label="Update Profile" pendingLabel="Updating Profile" />
      </div>
    </form>
  );
}

export default UpdateProfileForm;
