import PostComposer from "./PostComposer";
import PostSection from "./Postsection";

interface Props {
  userData: any;
  isInputClicked: boolean;
  handleInputClick: () => void;
  handleBodyClick: () => void;
  SuggestData: any;
}

export default function Content({
  userData,
  isInputClicked,
  handleInputClick,
  handleBodyClick,
  SuggestData,
}: Props) {
  return (
    <main className="relative">
      <PostComposer
        userData={userData}
        isInputClicked={isInputClicked}
        handleInputClick={handleInputClick}
        handleBodyClick={handleBodyClick}
      />
      <section
        className={`smm500:pb-20 ${
          isInputClicked ? " brightness-[0.2]" : " brightness-100"
        }`}
        onClick={handleBodyClick}
      >
        <PostSection SuggestData={SuggestData} />
      </section>
    </main>
  );
}
