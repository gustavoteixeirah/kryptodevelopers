import React from 'react';

const Description = () => {
    return (
        <div className="max-w-4xl mx-auto mt-16">
            <h2 id="description" className="text-4xl text-center font-semibold">
                Description
            </h2>
            <div className="flex flex-col lg:flex-row gap-8 px-8">
                <div className="flex-1 text-xl text-justify text-gray-400 mt-24">
                    <div className="text-3xl font-semibold text-white mb-8">
                        Why Developers
                    </div>
                    Developers are the key people behind any software that has
                    ever been built. Software programs for simple led switching
                    to space programs. Simple arithmetic to complex calculus.
                    This NFT collection seeks to illustrate these hard-working
                    people that expends their days in front of a computer to
                    solve problems. With different programming languages skills,
                    offices, favorites drinks and so on...there are a plenty
                    variety of developers NFTs to choose. Maybe you identify
                    yourself with one of them?
                </div>
                <div className="flex-1 lg:mt-16">
                    <img
                        src="https://gateway.pinata.cloud/ipfs/QmbWUEHirLBp3ePUQgK5MyCKKES5jHCXJpTHrrAHeFFc39"
                        className="rounded-xl shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Description;
