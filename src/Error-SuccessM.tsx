import { VscVerifiedFilled } from "react-icons/vsc";
import { VscCircleSlash } from "react-icons/vsc";
interface Error {
  error: string | boolean;
}
export function FilldetailsError({ error }: Error): JSX.Element {
  return (
    <article className="absolute bg-[#19212b] top-6 right-3 flex py-2 px-4 shadow-2xl rounded-lg   ErrorContainer z-[60]">
      <div className="text-[#d70101] text-xl mr-3 mt-1">
        <VscCircleSlash />
      </div>
      <h2 className="text-white font-semibold select-none text-center">
        {error}
      </h2>
    </article>
  );
}
interface Success {
  successFul: string | boolean;
}
export function SuccessLoginM({ successFul }: Success): JSX.Element {
  return (
    <article className="absolute bg-[#19212b] top-6 right-3 flex py-2 px-4 shadow-2xl rounded-lg ErrorContainer  z-[60]">
      <div className=" text-[#00bfa5] text-xl mr-3 mt-1">
        <VscVerifiedFilled />
      </div>
      <h2 className="text-white font-semibold select-none text-center">
        {successFul}
      </h2>
    </article>
  );
}
