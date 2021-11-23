import React from 'react';

const RoadmapItem = (props) => {
    const { item, odd } = props;

    return (
        <div
            className="py-4 px-4 md:py-6 md:px-8 rounded-2xl bg-gray-800 w-full lg:w-96 shadow-lg relative"
            style={{ backgroundColor: '#0d121e ' }}
        >
            <div className="flex">
                <div className="flex items-center justify-center rounded-2xl bg-gray-800 w-12 h-12 md:w-16 md:h-16 font-semibold text-xl md:text-2xl shadow-xl">
                    {item.phase}
                </div>
                <div className="flex items-center font-semibold text-md md:text-lg ml-8">
                    {item.date.line1}
                    <br />
                    {item.date.line2}
                </div>
            </div>

            {item.descriptionItems.map((description) => (
                <React.Fragment key={description.title}>
                    <div className="text-md sm:text-lg md:text-xl text-white mt-8 font-semibold">
                        {description.title}
                    </div>
                    <div
                        className="text-gray-400 mt-2"
                        dangerouslySetInnerHTML={{ __html: description.text }}
                    ></div>
                </React.Fragment>
            ))}
            {odd && (
                <div className="absolute bottom-1/2 right-full z-10 hidden lg:flex items-center justify-center">
                    <div className="w-7 h-1 bg-gray-800"></div>
                </div>
            )}
            {!odd && (
                <div className="absolute bottom-1/2 left-full z-10 hidden lg:flex items-center justify-center">
                    <div className="w-8 h-1 bg-gray-800"></div>
                </div>
            )}
        </div>
    );
};

export default RoadmapItem;
