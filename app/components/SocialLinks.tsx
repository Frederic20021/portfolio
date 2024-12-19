import React from 'react'
import SocialIcons from "@/app/components/SocialIcons";

const SocialLinks = () => {
    return (
        <div className="flex justify-center m-2 p-2">
            <SocialIcons
                variant="outline"
                size="md"
                iconSize={18}
                className="space-x-4"
            />
        </div>
    )
}
export default SocialLinks
