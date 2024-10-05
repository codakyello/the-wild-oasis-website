import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export const metadata = {
  title: "Update profile",
};

export default async function Page() {
  // CHANGE
  const countryFlag = "pt.jpg";
  const session = await auth();
  const guest = await getGuest(session.user.email);
  console.log("nationality", guest.nationality);
  return (
    <div className="max-w-[130rem] mx-auto px-[3.2rem]">
      <h2 className="font-semibold text-[2.4rem] text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-[1.8rem] mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm
        guest={guest}
        token={session.token}
        countryFlag={countryFlag}
      >
        <SelectCountry
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
