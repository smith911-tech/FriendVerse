interface Props {
  comment: any;
  post: any;
}
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Popover } from "@headlessui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useThemeStore } from "../../Zustand";
import { FiShare2 } from "react-icons/fi";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function DeleteCommentPop({ comment, post }: Props) {
  let userid = sessionStorage.getItem("UserId");
  //! Theme Mode
  const theme = useThemeStore((state: any) => state.theme);
  const handleShare = async (id: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          text: "Check out this awesome content!",
          url: `/Post/${id}`,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes("chrome")) {
        alert(
          "Sharing is not supported on this browser. Please use the share menu in Chrome."
        );
      } else if (userAgent.includes("firefox")) {
        alert(
          "Sharing is not supported on this browser. Please use the share menu in Firefox."
        );
      } else {
        alert("Sharing is not supported on this browser.");
      }
    }
  };

  const handleDeleteComment = async () => {
    try {
      const DeleteDocRef = doc(db, "Comment", comment.id);
      deleteDoc(DeleteDocRef);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  console.log(post);

  return (
    <Popover className="relative">
      <Popover.Button className=" outline-none">
        <BiDotsHorizontalRounded className=" text-2xl -mt-1 cursor-pointer" />
      </Popover.Button>
      <Popover.Panel
        className={`absolute top-7 right-2 shadow-2xl z-20 w-56 py-2  rounded ${
          theme ? "bg-[#51515b] text-[#ffff]" : "bg-[white] text-[#000000]"
        }`}
      >
        {(comment.author.id === userid || post.author === userid) && (
          <Popover.Button
            onClick={handleDeleteComment}
            className="flex gap-1 w-full py-2 pl-3 hover:bg-[#00000076] cursor-pointer text-red-700"
          >
            <RiDeleteBin6Line className="text-2xl px-1" /> <p>Delete Comment</p>
          </Popover.Button>
        )}
        <Popover.Button
          onClick={() => handleShare(post.id)}
          className="flex gap-1 w-full py-2 pl-3 hover:bg-[#00000076] cursor-pointer"
        >
          <FiShare2 className="text-2xl px-1" /> <p>Share</p>
        </Popover.Button>
      </Popover.Panel>
    </Popover>
  );
}
