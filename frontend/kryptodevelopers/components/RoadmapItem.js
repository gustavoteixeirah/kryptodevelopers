import React from 'react';

const RoadmapItem = (props) => {
    const { item, odd } = props;

    return (
        <div className="py-6 px-8 rounded-2xl bg-gray-800 w-96 shadow-lg relative">
            <div className="flex">
                <div className="flex items-center justify-center rounded-2xl bg-gray-700 w-16 h-16 font-semibold text-2xl shadow-xl">
                    {item.phase}
                </div>
                <div className="flex items-center font-semibold text-lg ml-8">
                    {item.date.line1}
                    <br />
                    {item.date.line2}
                </div>
            </div>

            {item.descriptionItems.map((description) => (
                <React.Fragment key={description.title}>
                    <div className="text-xl text-white mt-8 font-semibold">
                        {description.title}
                    </div>
                    <div className="text-gray-400 mt-2">{description.text}</div>
                </React.Fragment>
            ))}
            {odd && (
                <div className="absolute bottom-1/2 right-full z-10 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-gray-300"></div>
                    <div className="w-5 h-1 bg-gray-300"></div>
                </div>
            )}
            {!odd && (
                <div className="absolute bottom-1/2 left-full z-10 flex items-center justify-center">
                    <div className="w-6 h-1 bg-gray-300"></div>
                    <div className="w-5 h-5 rounded-full bg-gray-300"></div>
                </div>
            )}
        </div>
    );
};

export default RoadmapItem;
