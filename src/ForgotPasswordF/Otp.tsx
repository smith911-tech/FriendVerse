import { KeyboardEvent, useRef } from "react";
import Logo from "../assets/Logo.png";
export default function OTP() {
    const inputsRef = useRef<HTMLInputElement[]>([]);

    const moveToNext = (currentInputIndex: number): void => {
        if (
            inputsRef.current[currentInputIndex - 1]?.value.length ===
            inputsRef.current[currentInputIndex - 1]?.maxLength
        ) {
            if (currentInputIndex < inputsRef.current.length) {
                inputsRef.current[currentInputIndex]?.focus();
            }
        }
    };

    const moveToPrevious = (
        event: KeyboardEvent<HTMLInputElement>,
        currentInputIndex: number
    ): void => {
        if (event.key === "Backspace") {
            const previousInputIndex = currentInputIndex - 2;
            if (
                inputsRef.current[currentInputIndex - 1]?.value.length === 0 &&
                previousInputIndex >= 0
            ) {
                inputsRef.current[previousInputIndex]?.focus();
            }
        }
    };

    const handleInput = (
        event: React.ChangeEvent<HTMLInputElement>,
        currentInputIndex: number
    ): void => {
        const { value } = event.target;
        const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters

        event.target.value = numericValue; // Update the input value

        if (numericValue.length === 1) {
            moveToNext(currentInputIndex);
        }
    };
    return (
        <main className="bg-[#1B1D21] h-[100vh] px-[29px] py-[61px] relative  w-full">
            <section className="bg-[black]  px-4 pb-28 sm500:w-[450px] block mx-auto my-0 md734:w-[600px] md734:pb-30 ">
                {/* Logo  */}
                <div className="select-none">
                    <img
                        className="w-[100px] block mx-auto my-0 md734:w-[130px] lg1280:w-[150px]"
                        src={Logo}
                        alt=""
                    />
                    <h2 className="text-center font-bold font-sans pb-9 mt-[-20px] md734:text-2xl text-white">
                        OTP Verfication
                    </h2>
                </div>
                <h2 className="text-white text-center mb-3 md734:text-lg font-normal font-sans select-none">
                    Enter OTP:
                </h2>
                <div className="flex justify-center items-center">
                    <input
                        ref={(el: any) => (inputsRef.current[0] = el)}
                        type="text"
                        maxLength={1}
                        className="w-10 h-10 mx-1 text-center text-lg border border-gray-300 rounded"
                        onInput={(event: any) => handleInput(event, 1)}
                        onKeyDown={(event: any) => moveToPrevious(event, 1)}
                    />
                    <input
                        ref={(el: any) => (inputsRef.current[1] = el)}
                        type="text"
                        maxLength={1}
                        className="w-10 h-10 mx-1 text-center text-lg border border-gray-300 rounded"
                        onInput={(event: any) => handleInput(event, 2)}
                        onKeyDown={(event: any) => moveToPrevious(event, 2)}
                    />
                    <input
                        ref={(el: any) => (inputsRef.current[2] = el)}
                        type="text"
                        maxLength={1}
                        className="w-10 h-10 mx-1 text-center text-lg border border-gray-300 rounded"
                        onInput={(event: any) => handleInput(event, 3)}
                        onKeyDown={(event: any) => moveToPrevious(event, 3)}
                    />
                    <input
                        ref={(el: any) => (inputsRef.current[3] = el)}
                        type="text"
                        maxLength={1}
                        className="w-10 h-10 mx-1 text-center text-lg border border-gray-300 rounded"
                        onInput={(event: any) => handleInput(event, 4)}
                        onKeyDown={(event: any) => moveToPrevious(event, 4)}
                    />
                    <input
                        ref={(el: any) => (inputsRef.current[4] = el)}
                        type="text"
                        maxLength={1}
                        className="w-10 h-10 mx-1 text-center text-lg border border-gray-300 rounded"
                        onInput={(event: any) => handleInput(event, 5)}
                        onKeyDown={(event: any) => moveToPrevious(event, 5)}
                    />
                    <input
                        ref={(el: any) => (inputsRef.current[5] = el)}
                        type="text"
                        maxLength={1}
                        className="w-10 h-10 mx-1 text-center text-lg border border-gray-300 rounded"
                        onInput={(event: any) => handleInput(event, 6)}
                        onKeyDown={(event: any) => moveToPrevious(event, 6)}
                    />
                </div>
                <button className="block mx-auto my-0 mt-10 py-2 px-10  text-black bg-[#D9D9D9] rounded-[10px] font-sans font-bold select-none hover:bg-[#117DD5]  hover:text-white hover:transition">
                    Verify
                </button>
            </section>
        </main>
    );
}
