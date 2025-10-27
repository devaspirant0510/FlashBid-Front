import React from 'react';
import { HomeIcon, MessageSquareMoreIcon, StoreIcon, UserIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router';

const Footer = () => {
    const location = useLocation();
    const pathname = location?.pathname || '';

    const isHomeActive = pathname === '/' || pathname.startsWith('/auction');
    const isCommunityActive = pathname.startsWith('/community');
    const isShopActive = pathname.startsWith('/shop');
    const isProfileActive = pathname.startsWith('/profile');

    const defaultColorClass = 'text-[#626262]';
    const activeColorClass = 'text-uprimary';
    const iconBaseClass = 'transition-colors';

    return (
        <div className={'flex bg-[#262626] rounded-full shadow-sm md:hidden! justify-around py-6'}>
            <Link
                to='/'
                aria-label='home'
                className={`${iconBaseClass} ${isHomeActive ? activeColorClass : defaultColorClass}`}
            >
                <HomeIcon size={50} />
            </Link>

            <Link
                to='/community'
                aria-label='community'
                className={`${iconBaseClass} ${isCommunityActive ? activeColorClass : defaultColorClass}`}
            >
                <MessageSquareMoreIcon size={50} />
            </Link>

            <Link
                to='/shop'
                aria-label='shop'
                className={`${iconBaseClass} ${isShopActive ? activeColorClass : defaultColorClass}`}
            >
                <StoreIcon size={50} />
            </Link>

            <Link
                to='/profile'
                aria-label='profile'
                className={`${iconBaseClass} ${isProfileActive ? activeColorClass : defaultColorClass}`}
            >
                <UserIcon size={50} />
            </Link>
        </div>
    );
};

export default Footer;
