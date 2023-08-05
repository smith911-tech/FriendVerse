import Logo from "../assets/Logo2.png";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import BackGroundImg from "../assets/privacy policy/privacypolicyBGimg.jpg";

export default function Privacy() {
    const [LightdarkM, setLightdarkM] = useState<boolean>(
        localStorage.getItem('LightDarkMode') === 'true')
    const handlemode = () => {
        setLightdarkM(!LightdarkM);
    }
    useEffect(() => {
        localStorage.setItem('LightDarkMode', String(LightdarkM));
    }, [LightdarkM]);
    return (
        <main
            className={` ${LightdarkM
                ? "bg-white text-black color-Toggle"
                : "bg-black text-white  color-Toggle"
                } font-Inter`}
        >
            <nav
                className={` ${LightdarkM
                    ? "bg-[white]  color-Toggle"
                    : "bg-[black]  color-Toggle"
                    } flex fixed w-full shadow-2xl md734:pt-6 py-4 px-3 md734:px-6 justify-between`}
            >
                <div
                    className={`flex gap-1  font-serif ${LightdarkM
                        ? "text-black color-Toggle"
                        : "text-white color-Toggle"
                        }`}
                >
                    <img
                        src={Logo}
                        alt=""
                        className="w-[40px] md734:w-[50px]  select-none"
                    />
                    <h2 className="font-semibold  md734:inline-block md734:text-2xl mt-2">
                        Privacy Policy
                    </h2>
                </div>
                <div>
                    {LightdarkM ? (
                        <span
                            className="text-3xl cursor-pointer color-Toggle"
                            onClick={handlemode}
                        >
                            <BsMoonStarsFill />
                        </span>
                    ) : (
                        <span
                            className="text-3xl cursor-pointer color-Toggle"
                            onClick={handlemode}
                        >
                            <BsFillSunFill />
                        </span>
                    )}
                </div>
            </nav>
            <section className="pb-7">
                <img
                    src={BackGroundImg}
                    alt=""
                    className="pt-[70px] w-full select-none"
                />
            </section>
            <section className="px-2 md734:px-[10%]">
                <h2 className="font-bold text-xl md734:text-2xl text-[#067ad1] ">
                    Before you scroll, read this
                </h2>
                <br />
                <p className={`${LightdarkM
                    ? "text-[#00000099]"
                    : "text-[#ffffffc9]"}`}>
                    It’s really hard to make everyone happy with a Privacy Policy. Most
                    people who use Friend Verse want something short and easy to
                    understand. While we wish we could fit everything you need to know
                    into a Tweet, our regulators ask us to meet our legal obligations by
                    describing them all in a lot of detail.
                    <br />
                    <br />
                    With that in mind, we’ve written our Privacy Policy as simply as
                    possible to empower you to make informed decisions when you use
                    Twitter by making sure you understand and have control over the
                    information we collect, how it’s used, and when it’s shared.
                    <br />
                    <br />
                    So if you skip reading every word of the Privacy Policy, at least know
                    this:
                </p>
                <br />
                <div className="flex justify-between ">
                    <p className="text-[3vw] md734:text-lg border-b-[3px] border-solid border-[#067ad1]">
                        Friend Verse is a public platform
                    </p>
                    <p className="text-[3vw] md734:text-lg border-b-[3px] border-solid border-[#067ad1]">
                        {" "}
                        We collect some data about you
                    </p>
                </div>
                <br />
                <div className="flex bg-[#f3f7fa] w-full gap-3">
                    <div className="bg-[#067acc] w-8"></div>
                    <div className="w-full p-3 select-none">
                        <h2 className="font-Inter font-bold text-2xl  text-black">
                            What data do you collect about me?
                        </h2>
                    </div>
                </div>
                <br /><br />
                <span className="text-xl font-semibold">
                    1. Information We Collect <br />
                </span>
                <br />
                <p className={`${LightdarkM ? "text-[#000000cb]" : "text-[#ffffffc9]"}`}>
                    As the user of Friend Verse, we collect the following data about you:
                    <br /><br />
                    1. User ID: We collect your unique user identification number or username to ensure your account is properly identified and distinguishable from other users.
                    <br /><br />
                    Additionally, in order to verify the authenticity and identity of our users, we may request the submission of an ID card. However, please note that we do not store or retain any personal information from your ID card beyond the verification process. We prioritize the privacy and security of our users, and we strictly adhere to data protection regulations.
                    <br /><br />
                    We understand the sensitivity of personal information and make every effort to ensure its security. Our data handling practices are outlined in detail in our privacy policy, which can be found on our website. If you have any further questions or concerns regarding data collection and usage, please do not hesitate to contact our support team.
                </p>
                <br /><br />
                <div className="flex bg-[#f3f7fa] w-full gap-3">
                    <div className="bg-[#067acc] w-8"></div>
                    <div className="w-full p-3 select-none">
                        <h2 className="font-Inter font-bold text-2xl  text-black">
                            How do you use my information?
                        </h2>
                    </div>
                </div>
                <br /><br />
                <p className={`${LightdarkM ? "text-[#000000cb]" : "text-[#ffffffc9]"}`}>
                    At Friend Verse, we use your information for two primary purposes: safety and security, as well as to improve our services. Here's how we handle your data:
                    <br /><br />
                    1. Safety and Security: We prioritize the safety and security of our users. Your user ID and any submitted ID card information are collected to verify your identity, ensure the authenticity of your account, and protect against fraudulent or malicious activities. This helps us maintain a secure environment for all users and prevent unauthorized access to your account.
                    <br /><br />
                    2. Service Improvement: We analyze aggregated and anonymized data to gain insights into user behavior and preferences. This information is used to improve our services, enhance user experience, and develop new features. By understanding how users interact with our platform, we can tailor our services to better meet your needs and preferences.
                    <br /><br />
                    It's important to note that we handle your information with utmost care and in compliance with applicable data protection laws. We do not sell or share your personal information with third parties without your explicit consent, unless required by law or for legal purposes.
                    <br /><br />
                    For a detailed overview of how we handle and protect your data, please refer to our privacy policy. We continually review and update our practices to ensure the highest level of data privacy and security for our users. If you have any concerns or questions, our support team is available to assist you.
                </p>
                <br /><br />
                <div className="flex bg-[#f3f7fa] w-full gap-3">
                    <div className="bg-[#067acc] w-8"></div>
                    <div className="w-full p-3 select-none">     
                        <h2 className="font-Inter font-bold text-2xl  text-black">
                            Is FriendVerse for kids?
                        </h2>
                    </div>
                </div>
                <br /><br />
                <p className={`${LightdarkM ? "text-[#000000cb]" : "text-[#ffffffc9]"}`}>
                    1. Friend Verse Age Restriction
                    <br /><br />
                    Our services are not directed to children, and you may not use our services if you are under the age of 13. You must also be old enough to consent to the processing of your personal data in your country (in some countries we may allow your parent or guardian to do so on your behalf).
                </p>
            </section>
            <br />
            <footer className="py-9 bg-[#14171a] text-[#ffffffb0] text-center font-serif font-bold">
                Friend Verse
            </footer>
        </main>
    );
}
