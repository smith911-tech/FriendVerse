interface Props {
  post: any;
}
import { useThemeStore } from "../../../Zustand";
import { TbMessage } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
export default function Commentbutton({ post }: Props) {
  const theme = useThemeStore((state: any) => state.theme);
  const navigate = useNavigate();
  const handleViewPost = (id: string) => {
    if (window.location.pathname === `/Post/${id}`) {
      return null;
    } else {
      navigate(`/Post/${id}`);
    }
  };
  return (
    <button
      onClick={() => handleViewPost(post && post.id)}
      className={`flex mt-1 w-[33%] justify-center py-[7px] rounded gap-1  outline-none
                ${theme ? "hover:bg-[#ffffff3c]" : "hover:bg-[#0000004f]"}`}
    >
      <span
        className={`text-2xl  ${
          theme ? "text-[#ffffffd3]" : "text-[#00000087]"
        } `}
      >
        <TbMessage />
      </span>
      <span
        className={`text-[15px] smm500:text-[12px]  ${
          theme ? "text-[#ffffffd3]" : "text-[#000000b7]"
        }`}
      >
        Comment
      </span>
    </button>
  );
}
