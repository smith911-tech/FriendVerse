import { AiOutlineClose } from "react-icons/ai";
import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Props {
  data: any;
  handleCloseModal: () => void;
  showCmodal: boolean;
}
export function OtherUserCover({ data, handleCloseModal, showCmodal }: Props) {
  useEffect(() => {
    if (showCmodal) {
      // Add the 'overflow-hidden' class to the body when the modal is shown
      document.body.style.overflow = "hidden";
    } else {
      // Remove the 'overflow-hidden' class from the body when the modal is hidden
      document.body.style.overflow = "auto";
    }
  }, [showCmodal]);
  return (
    <>
      {showCmodal && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        >
          <div
            className="fixed w-full top-20 z-[40] left-0 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <LazyLoadImage
              effect="blur"
              src={data.coverImage}
              alt="Cover"
              className="object-contain top-0 h-[60vh] w-screen"
            />

            <span className="absolute top-2 right-[10%] text-white text-[40px] cursor-pointer smm500:top-0">
              <AiOutlineClose onClick={handleCloseModal} />
            </span>
          </div>
        </div>
      )}
    </>
  );
}

interface Props2 {
  data: any;
  handleCloseModal: () => void;
  showPmodal: boolean;
}
export function OtherUsersProfile({
  showPmodal,
  handleCloseModal,
  data,
}: Props2) {
  useEffect(() => {
    if (showPmodal) {
      // Add the 'overflow-hidden' class to the body when the modal is shown
      document.body.style.overflow = "hidden";
    } else {
      // Remove the 'overflow-hidden' class from the body when the modal is hidden
      document.body.style.overflow = "auto";
    }
  }, [showPmodal]);
  return (
    <>
      {showPmodal && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        >
          <div className="flex items-center select-none">
            <LazyLoadImage
              effect="blur"
              src={data.profileImage}
              alt="Profile"
              className="w-60 h-60 rounded-full object-cover bg-white sm:h-20 sm:w-20"
            />
            <span className="absolute top-20 right-[10%] text-white text-[40px] cursor-pointer smm500:top-20">
              <AiOutlineClose onClick={handleCloseModal} />
            </span>
          </div>
        </div>
      )}
    </>
  );
}
