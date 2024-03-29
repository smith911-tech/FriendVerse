import { ChangeEvent, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
interface Props {
  fullName: string;
  setFullName: any;
  email: string;
  setEmail: any;
  password: string;
  setPassword: any;
}
export default function FirstSection({
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
}: Props): JSX.Element {
  // ! show password
  const [showPassword, setShowpassword] = useState<boolean>(false);
  const HandleShowpassword = () => {
    setShowpassword(!showPassword);
  };
  return (
    <section className="flex flex-col mt-8 ">
      <input
        type="text"
        className="bg-transparent border border-solid border-[#ffffffd5] h-10 px-4 w-full block mx-auto my-0 md734:w-[450px]  lg1280:h-11 mb-1"
        value={fullName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFullName(e.target.value)
        }
        placeholder="Full name"
        maxLength={35}
      />
      <br />

      <input
        type="email"
        className="bg-transparent border border-solid border-[#ffffffd5] h-10 px-4 w-full block mx-auto my-0 md734:w-[450px]  lg1280:h-11 mb-1"
        value={email}
        placeholder="Email address"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <br />
      <div className="flex relative md734:w-[450px]  left-1/2 transform -translate-x-1/2 ">
        <input
          type={showPassword ? "text" : "password"}
          name=""
          placeholder="Create Password"
          className="w-full bg-transparent border border-solid border-[#ffffffd5] h-10 px-4 mb-8 lg1280:h-11 "
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        {showPassword ? (
          <div
            className="absolute right-3 mt-3 cursor-pointer"
            onClick={HandleShowpassword}
          >
            <FaEyeSlash />
          </div>
        ) : (
          <div
            className="absolute right-3 mt-3 cursor-pointer"
            onClick={HandleShowpassword}
          >
            <FaEye />
          </div>
        )}
      </div>
    </section>
  );
}
