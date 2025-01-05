import React from 'react'
import NewsLetterForm from "@/app/components/NewsLetterForm";
import SocialLinks from "@/app/components/SocialLinks";
import FooterLinks from "@/app/components/FooterLinks";

const Footer = () => {
    return (
        <div className={"grid sm:flex p-8 justify-center text-center gap-20"}>
            <div className={"flex-col"}>
                <span>Get Updates on Student Life in Japan!</span>
                <NewsLetterForm />
                <SocialLinks />
            </div>
            <FooterLinks />
        </div>
    )
}
export default Footer
