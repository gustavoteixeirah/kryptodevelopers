import React from 'react';
import Button from './Button';
import StarAnimation from './StarAnimation';

const Title = () => {
  return (
    <StarAnimation>
      <div className="flex justify-center items-center h-full">
        <div className="container mx-auto text-center">
          <div className="flex-1 items-center justify-center">
            <h1 className="text-2xl md:text-4xl lg:text-6xl leading-relaxed">
              Welcome to
              <span className="block">KryptoDevelopers!</span>
            </h1>
            <h2 className="text-gray-400 text-md md:text-lg font-semibold mt-8 px-10">
              <div className="inline md:block">Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;</div>
              <div className="inline md:block">Nullam aliquam quam viverra purus tellus purus. Convallis fusce</div>
            </h2>
          </div>
          <Button as="a" href="/mint" size="lg" classes="mt-12">
            Mint NFT
          </Button>
        </div>
      </div>
    </StarAnimation>
  );
};

export default Title;
