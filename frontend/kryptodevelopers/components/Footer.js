import React from 'react';
import { SocialIcon } from 'react-social-icons';

const Footer = () => {
    return (
        <div className="w-full py-10" style={{ backgroundColor: '#0d121e ' }}>
            <div className="max-w-4xl mx-auto px-8 shadow-inner">
                <div className="text-sm text-gray-400 text-center">
                    Copyright &copy; {new Date().getFullYear()}{' '}
                    KryptoDevelopers. All Rights Reserved.
                </div>
                <div className="flex gap-4 justify-center mt-4">
                    <SocialIcon
                        url="https://www.instagram.com/kryptodevelopers/"
                        style={{ width: 32, height: 32 }}
                    />
                    <SocialIcon
                        url="https://twitter.com/_kryptodevs/"
                        style={{ width: 32, height: 32 }}
                    />
                    <SocialIcon
                        url="https://discord.gg/HcAXxVreXe"
                        style={{ width: 32, height: 32 }}
                    />
                    <SocialIcon
                        url="https://www.facebook.com/people/KryptoDevelopers/100074972386339/"
                        style={{ width: 32, height: 32 }}
                        bgColor="#1877f2"
                    />
                </div>
                {process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' && (
                    <div className="flex mt-4 flex-col sm:flex-row gap-4 text-xs items-center justify-center">
                        <div>ENV {process.env.NEXT_PUBLIC_VERCEL_ENV}</div>
                        <div>
                            REF {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF}
                        </div>
                        <div>
                            Commit{' '}
                            {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Footer;
