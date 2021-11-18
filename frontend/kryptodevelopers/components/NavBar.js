import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Transition } from '@headlessui/react';
import NavBarLink from './NavBarLink';
import Button from './Button';

const NavBar = () => {
    const [showMobileMenu, setShowMobileMenu] = React.useState(false);

    const toggleMobileMenu = React.useCallback(() => {
        setShowMobileMenu((show) => !show);
    }, [setShowMobileMenu]);

    return (
        <nav
            className={`w-full fixed md:absolute z-10 ${
                showMobileMenu ? 'bg-gray-900' : ''
            }`}
        >
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between px-8 items-center h-24 md:h-36 gap-8">
                    <div className="md:hidden">
                        <button
                            className="p-3 active:bg-gray-800 rounded-full"
                            onClick={toggleMobileMenu}
                        >
                            <GiHamburgerMenu />
                        </button>
                    </div>
                    <div className="text-lg lg:text-2xl font-semibold">
                        KDEV
                    </div>
                    <div className="hidden md:flex gap-5 lg:gap-8 items-center text-md lg:text-xl">
                        <NavBarLink href="#home">Home</NavBarLink>
                        <NavBarLink href="#description">Description</NavBarLink>
                        {/* <NavBarLink href="#roadmap">Roadmap</NavBarLink> */}
                        <NavBarLink href="#team">Team</NavBarLink>
                        {/* <NavBarLink href="#social_links">Social Links</NavBarLink> */}
                    </div>
                    {/* TODO ENABLE WHEN MINTING IS ACTIVE */}
                    {/* <Button disabled={true} as="a" href="/mint" size="sm">
                    Mint NFT
                    </Button> */}
                    {/* TODO REMOVE THIS DIV WHEN MINTING IS ACTIVE */}
                    <div />
                </div>

                <Transition
                    as={React.Fragment}
                    show={showMobileMenu}
                    enter="transform transition duration-[400ms] ease-in origin-top"
                    enterFrom="scale-y-0"
                    enterTo="scale-y-100"
                    leave="transform duration-200 transition ease-out origin-top"
                    leaveFrom="scale-y-100"
                    leaveTo="scale-y-0"
                >
                    <div className="flex flex-col gap-2 justify-center text-md px-8 pb-8">
                        <NavBarLink href="#home" onClick={toggleMobileMenu}>
                            Home
                        </NavBarLink>
                        <NavBarLink
                            href="#description"
                            onClick={toggleMobileMenu}
                        >
                            Description
                        </NavBarLink>
                        {/* <NavBarLink href="#roadmap" onClick={toggleMobileMenu}>
              Roadmap
            </NavBarLink> */}
                        <NavBarLink href="#team" onClick={toggleMobileMenu}>
                            Team
                        </NavBarLink>
                        {/* <NavBarLink href="#social_links" onClick={toggleMobileMenu}>
              Social Links
            </NavBarLink> */}
                    </div>
                </Transition>
            </div>
        </nav>
    );
};

export default NavBar;
