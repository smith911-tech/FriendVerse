import BackGroundImg from '../assets/T&C/terms and conditions.jpg'
import Logo from "../assets/Logo2.png";
import { Link } from 'react-router-dom';
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs'
import { useState } from "react";


export default function TermsandCondition() {
    const [LightdarkM, setLightdarkM] = useState<boolean>(true)
    const handlemode = () => {
        setLightdarkM(!LightdarkM)
    } 
    return (
        <main className={` ${LightdarkM ? "bg-white text-black color-Toggle" : "bg-black text-white  color-Toggle"} `}>
            <nav className={` ${LightdarkM ? "bg-[white]  color-Toggle" : "bg-[black]  color-Toggle"} flex fixed w-full shadow-2xl md734:pt-6 py-4 px-3 md734:px-6 justify-between`}>
                <div className={`flex gap-1  font-serif ${LightdarkM ? "text-black color-Toggle" : "text-white color-Toggle"}`}>
                    <img src={Logo} alt="" className='w-[40px] md734:w-[50px]  select-none' />
                    <h2 className='font-bold  mt-2 md734:hidden'>T&C</h2>
                    <h2 className='font-semibold mt-2 hidden md734:inline-block md734:text-2xl'>
                        Terms and Conditions
                    </h2>
                </div>
                <div>
                    {LightdarkM ? (
                        <span className='text-3xl cursor-pointer color-Toggle' onClick={handlemode}>
                            <BsMoonStarsFill />
                        </span>
                    ) : (
                            <span className='text-3xl cursor-pointer color-Toggle' onClick={handlemode}>
                                <BsFillSunFill />
                        </span>
                    )}
                </div>
            </nav>
            <section className='pb-7'>
                <img src={BackGroundImg} alt="" className='pt-[70px] w-full select-none' />
                <h2 className={`text-center py-10 font-bold font-serif ${LightdarkM ? "bg-black text-white  color-Toggle" : "bg-white text-black  color-Toggle"}`}>Effective: July 11, 2023 </h2>
            </section>
            <section className='px-2 md734:px-[10%]'>
                <h2 className='font-bold text-3xl font-serif border-b-2 pb-4'>
                    Terms of service
                </h2>
                <span >
                    <h2 className='font-bold text-xl'>1. Who May Use the Services</h2>
                    <p className='font-serif'>You may use the Services only if you agree to form a binding contract with us and are not a person barred from receiving services under the laws of the applicable jurisdiction. In any case, you must be at least 4 years old, to use the Services. If you are accepting these Terms and using the Services on behalf of a company, organization, government, or other legal entity, you represent and warrant that you are authorized to do so and have the authority to bind such entity to these Terms, in which case the words “you” and “your” as used in these Terms shall refer to such entity.</p>
                </span>
                <br />
                <span >
                    <h2 className='font-bold text-xl'>2. Privacy</h2>
                    <p className='font-serif'>Our <Link className='text-[#117DD5]' to='/PrivacyPolicy'> Privacy Policy </Link>describes how we handle the information you provide to us when you use our Services. You understand that through your use of the Services you consent to the collection and use (as set forth in the Privacy Policy) of this information, including the transfer of this information to the United States, Ireland, and/or other countries for storage, processing and use by us and our affiliates.</p>
                </span>
                <br />
                <span >
                    <h2 className='font-bold text-xl'>3. Content on the Services</h2>
                    <p className='font-serif'>You are responsible for your use of the Services and for any Content you provide, including compliance with applicable laws, rules, and regulations. You should only provide Content that you are comfortable sharing with others.
                        <br /><br />
                        Any use or reliance on any Content or materials posted via the Services or obtained by you through the Services is at your own risk. We do not endorse, support, represent or guarantee the completeness, truthfulness, accuracy, or reliability of any Content or communications posted via the Services or endorse any opinions expressed via the Services. You understand that by using the Services, you may be exposed to Content that might be offensive, harmful, inaccurate or otherwise inappropriate, or in some cases, postings that have been mislabeled or are otherwise deceptive. All Content is the sole responsibility of the person who originated such Content. We may not monitor or control the Content posted via the Services and, we cannot take responsibility for such Content.</p>
                </span>
                <br />
                <span >
                    <h2 className='font-bold text-xl'>Your Rights and Grant of Rights in the Content</h2>
                    <p className='font-serif'>
                    <br />
                        By submitting, posting or displaying Content on or through the Services, you grant us a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such Content in any and all media or distribution methods now known or later developed (for clarity, these rights include, for example, curating, transforming, and translating). This license authorizes us to make your Content available to the rest of the world and to let others do the same. You agree that this license includes the right for us to provide, promote, and improve the Services and to make Content submitted to or through the Services available to other companies, organizations or individuals for the syndication, broadcast, distribution, Retweet, promotion or publication of such Content on other media and services, subject to our terms and conditions for such Content use. Such additional uses by us, or other companies, organizations or individuals, is made with no compensation paid to you with respect to the Content that you submit, post, transmit or otherwise make available through the Services as the use of the Services by you is hereby agreed as being sufficient compensation for the Content and grant of rights herein.
                        <br /><br />
                        By submitting, posting or displaying Content on or through the Services, you grant us a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such Content in any and all media or distribution methods now known or later developed (for clarity, these rights include, for example, curating, transforming, and translating). This license authorizes us to make your Content available to the rest of the world and to let others do the same. You agree that this license includes the right for us to provide, promote, and improve the Services and to make Content submitted to or through the Services available to other companies, organizations or individuals for the syndication, broadcast, distribution, Retweet, promotion or publication of such Content on other media and services, subject to our terms and conditions for such Content use. Such additional uses by us, or other companies, organizations or individuals, is made with no compensation paid to you with respect to the Content that you submit, post, transmit or otherwise make available through the Services as the use of the Services by you is hereby agreed as being sufficient compensation for the Content and grant of rights herein.
                        <br /><br />
                        We have an evolving set of rules for how ecosystem partners can interact with your Content on the Services. These rules exist to enable an open ecosystem with your rights in mind. You understand that we may modify or adapt your Content as it is distributed, syndicated, published, or broadcast by us and our partners and/or make changes to your Content in order to adapt the Content to different media
                    </p>
                </span>
                <br />
                <span >
                    <h2 className='font-bold text-xl'>Your Account</h2>
                    <p className='font-serif'>You may need to create an account to use some of our Services. You are responsible for safeguarding your account, so use a strong password and limit its use to this account. We cannot and will not be liable for any loss or damage arising from your failure to comply with the above.
                    <br /><br />
                        You can control most communications from the Services. We may need to provide you with certain communications, such as service announcements and administrative messages. These communications are considered part of the Services and your account, and you may not be able to opt-out from receiving them. If you added your phone number to your account and you later change or deactivate that phone number, you must update your account information to help prevent us from communicating with anyone who acquires your old number.
                    </p>
                </span>
                <br />
                <span >
                    <h2 className='font-bold text-xl'>4. Limitations of Liability</h2>
                    <p className='font-serif'>By using the Services you agree that Manifest Tech, its parents, affiliates, related companies, officers, directors, employees, agents representatives, partners and licensors, liability is limited to the maximum extent permissible in your country of residence.</p>
                </span>
            </section>
            <br /><br />
            <footer className='py-9 bg-[#14171a] text-[#ffffffb0] text-center font-serif font-bold'>
                Friend Verse
            </footer>
        </main>
    )
}