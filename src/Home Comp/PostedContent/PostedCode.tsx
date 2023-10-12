interface Props {
  post: any;
}
import { useState } from "react";
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BsFillClipboardFill } from "react-icons/bs";

export default function PostedCode({ post }: Props) {
  const codes = post.Code.split("\n");
  const codeString = codes.join("\n");

  const [showCopyButton, setShowCopyButton] = useState<boolean>(false);
  const [buttonColor, setButtonColor] = useState<string>("text-white");

  const handleCopyClick = () => {
    const textArea = document.createElement("textarea");
    textArea.value = codeString;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    // Change the button color to green
    setButtonColor("text-green-500");

    // Reset the button color after a delay
    setTimeout(() => {
      setButtonColor("text-white");
    }, 500);
  };

  return (
    <main>
      <article className="py-2">
        <div
          className="h-80 px-1 overflow-auto codescroll w-full relative"
          onMouseEnter={() => setShowCopyButton(true)}
          onMouseLeave={() => setShowCopyButton(false)}
        >
          {showCopyButton && (
            <button
              title="copy"
              className={`fixed right-10  mt-3 mr-2 bg-gray-800 ${buttonColor}  p-2 rounded cursor-pointer`}
              onClick={handleCopyClick}
            >
              <BsFillClipboardFill />
            </button>
          )}
          <SyntaxHighlighter
            className="codescroll"
            showLineNumbers={true}
            language="javascript"
            style={vscDarkPlus}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      </article>
    </main>
  );
}
