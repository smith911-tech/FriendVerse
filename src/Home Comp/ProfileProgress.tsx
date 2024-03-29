interface Props {
  userData: any;
}
import { Progress } from "antd";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useThemeStore } from "../Zustand";
export default function ProfileProgress({ userData }: Props): JSX.Element {
  const theme = useThemeStore((state: any) => state.theme);
  let percentage = 0;
  if (userData) {
    if (userData.profileImage) {
      percentage += 25;
    }

    if (userData.coverImage) {
      percentage += 25;
    }

    if (userData.Location) {
      percentage += 25;
    }

    if (userData.bio) {
      percentage += 25;
    }
  }

  return (
    <div
      className={` rounded-lg shadow p-4 select-none mb-8  ${
        theme ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h2 className=" text-lg font-semibold mb-2">Complete your Profile</h2>
      <Progress
        className="HomeProgress flex justify-center items-center "
        type="circle"
        percent={percentage}
        strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
      />
      <section className="flex flex-col gap-2 font-bold text-[#000000b6] mt-3">
        <div className="flex justify-between">
          <section className="flex gap-1">
            <span
              className={`font-bold text-xl ${
                theme
                  ? userData && userData.profileImage
                    ? "text-[#117dd5]"
                    : "text-white"
                  : userData && userData.profileImage
                  ? "text-[#117dd5]"
                  : "text-[#000000b6]"
              }`}
            >
              <MdOutlineVerifiedUser />
            </span>
            <p className={`${theme ? "text-[#ffffffe2]" : "text-[#000000b6]"}`}>
              Profile Photo
            </p>
          </section>
          <p
            className={`${
              theme
                ? userData && userData.profileImage
                  ? "text-[#117dd5]"
                  : "text-white"
                : userData && userData.profileImage
                ? "text-[#117dd5]"
                : "text-[#000000b6]"
            }`}
          >
            {userData && userData.profileImage ? "1/1" : "0/1"}
          </p>
        </div>

        <div className="flex  justify-between">
          <section className="flex gap-1">
            <span
              className={`font-bold text-xl ${
                theme
                  ? userData && userData.coverImage
                    ? "text-[#117dd5]"
                    : "text-white"
                  : userData && userData.coverImage
                  ? "text-[#117dd5]"
                  : "text-[#000000b6]"
              }`}
            >
              <MdOutlineVerifiedUser />
            </span>
            <p className={`${theme ? "text-[#ffffffe2]" : "text-[#000000b6]"}`}>
              Cover Photo
            </p>
          </section>
          <p
            className={`${
              theme
                ? userData && userData.coverImage
                  ? "text-[#117dd5]"
                  : "text-white"
                : userData && userData.coverImage
                ? "text-[#117dd5]"
                : "text-[#000000b6]"
            }`}
          >
            {userData && userData.coverImage ? "1/1" : "0/1"}
          </p>
        </div>

        <div className="flex  justify-between">
          <section className="flex gap-1">
            <span
              className={`font-bold text-xl ${
                theme
                  ? userData && userData.Location
                    ? "text-[#117dd5]"
                    : "text-white"
                  : userData && userData.Location
                  ? "text-[#117dd5]"
                  : "text-[#000000b6]"
              }`}
            >
              <MdOutlineVerifiedUser />
            </span>
            <p className={`${theme ? "text-[#ffffffe2]" : "text-[#000000b6]"}`}>
              Location
            </p>
          </section>
          <p
            className={`${
              theme
                ? userData && userData.Location
                  ? "text-[#117dd5]"
                  : "text-white"
                : userData && userData.Location
                ? "text-[#117dd5]"
                : "text-[#000000b6]"
            }`}
          >
            {userData && userData.Location ? "1/1" : "0/1"}
          </p>
        </div>

        <div className="flex justify-between">
          <section className="flex gap-1">
            <span
              className={`font-bold text-xl  ${
                theme
                  ? userData && userData.bio
                    ? "text-[#117dd5]"
                    : "text-white"
                  : userData && userData.bio
                  ? "text-[#117dd5]"
                  : "text-[#000000b6]"
              }`}
            >
              <MdOutlineVerifiedUser />
            </span>

            <p className={`${theme ? "text-[#ffffffe2]" : "text-[#000000b6]"}`}>
              Bio
            </p>
          </section>
          <p
            className={`${
              theme
                ? userData && userData.bio
                  ? "text-[#117dd5]"
                  : "text-white"
                : userData && userData.bio
                ? "text-[#117dd5]"
                : "text-[#000000b6]"
            }`}
          >
            {userData && userData.bio ? "1/1" : "0/1"}
          </p>
        </div>
      </section>
    </div>
  );
}
