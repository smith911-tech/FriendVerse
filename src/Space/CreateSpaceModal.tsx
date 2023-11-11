interface Props {
  handleClose: () => void;
  isMinimizing: boolean 
}
import "animate.css/animate.min.css";
export default function CreateSpace({ handleClose, isMinimizing }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="bg-black bg-opacity-50 h-screen w-screen fixed top-0 left-0">
        <section
          className={`absolute w-full bottom-[50px] pb-5 bg-white ${
            isMinimizing
              ? "animate__animated animate__slideOutDown"
              : "animate__animated animate__slideInUp"
          }`}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
          fuga enim! Quam, quis pariatur tempora corrupti molestiae non
          perspiciatis nisi, qui minima, reiciendis in impedit. Consequuntur
          voluptate sit aspernatur nisi! 
          <button onClick={handleClose} className=" bg-white ">
            close
          </button>
        </section>
      </div>
    </div>
  );
}