import React from 'react';
import RoadmapItem from './RoadmapItem';
import roadmap from '../roadmap.json';

const Roadmap = () => {
    return (
        <div className="max-w-4xl mx-auto mt-16">
            <h2
                id="roadmap"
                className="text-4xl text-center font-semibold mb-12"
            >
                Roadmap
            </h2>
            <div className="grid lg:grid-cols-2 gap-16 mt-12 px-8 relative">
                {roadmap.map((item, index) => (
                    <React.Fragment key={item.phase}>
                        {index % 2 !== 0 && <div className="hidden lg:block" />}
                        <RoadmapItem item={item} odd={index % 2 !== 0} />
                        {index % 2 === 0 && <div className="hidden lg:block" />}
                    </React.Fragment>
                ))}
                <div className="absolute h-full w-1 bg-gray-800 left-1/2 hidden lg:block"></div>
            </div>
        </div>
    );
};

export default Roadmap;
