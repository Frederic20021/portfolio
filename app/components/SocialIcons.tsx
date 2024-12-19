import React from 'react';
import {
    Facebook,
    //Twitter,
    Instagram,
    //Linkedin,
    Github,
    //Dribbble,
    LucideIcon
} from 'lucide-react';

// Define the shape of a social platform
interface SocialPlatform {
    name: string;
    icon: LucideIcon;
    url: string;
    color: string;
}

// Define variant types
type IconVariant = 'outline' | 'solid' | 'simple';
type IconSize = 'sm' | 'md' | 'lg';

// Social platforms configuration
const socialPlatforms: SocialPlatform[] = [
    {
        name: 'Facebook',
        icon: Facebook,
        url: 'https://facebook.com/sithu.lin.39501',
        color: 'text-white hover:bg-blue-800'
    },
    {
        name: 'Instagram',
        icon: Instagram,
        url: 'https://instagram.com/si_thu_lin_',
        color: 'text-white hover:bg-purple-400'
    },
    {
        name: 'GitHub',
        icon: Github,
        url: 'https://github.com/yourusername',
        color: 'text-white hover:bg-black'
    },
];

// Props interface
interface SocialIconsProps {
    variant?: IconVariant;
    size?: IconSize;
    platforms?: SocialPlatform[];
    iconSize?: number;
    className?: string;
}

const SocialIcons: React.FC<SocialIconsProps> = ({
                                                     variant = 'outline',
                                                     size = 'md',
                                                     platforms = socialPlatforms,
                                                     className = 'm-5'
                                                 }) => {
    // Size mappings
    const sizeMap = {
        sm: 'p-1',
        md: 'p-2',
        lg: 'p-3'
    };

    // Variant styles with type-safe color manipulation
    const variantStyles = {
        outline: (color: string) => `
      ${color} 
      border border-current 
      rounded-full 
      hover:text-white 
      transition-colors
    `,
        solid: (color: string) => `
      ${color.replace('text-', 'bg-')} 
      text-white 
      rounded-full
    `,
        simple: (color: string) => `
      ${color} 
      hover:opacity-75 
      transition-opacity
    `
    };

    return (
        <div className={`flex items-center ${className}`}>
            {platforms.map(({ name, icon: Icon, url, color }) => (
                <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} profile`}
                    className={`
            flex items-center justify-center
            ${sizeMap[size]}
            ${variantStyles[variant](color)}
            hover:animate-bounce
            transform
            transition-transform
          `}
                >
                    <Icon
                        size={18}
                        strokeWidth={2}
                        aria-hidden="true"
                    />
                </a>
            ))}
        </div>
    );
};

export default SocialIcons;