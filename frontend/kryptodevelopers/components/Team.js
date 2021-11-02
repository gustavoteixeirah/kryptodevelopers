import React from 'react';
import TeamMember from './TeamMember';
import team from '../team.json';

const Team = () => {
  return (
    <div className="max-w-4xl mx-auto pt-16 pb-32">
      <h2 id="team" className="text-4xl text-center font-semibold">
        Team
      </h2>
      <div className="grid lg:grid-cols-2 gap-16 mt-12 px-8">
        {team.map((data) => (
          <TeamMember data={data} key={data.name} />
        ))}
      </div>
    </div>
  );
};

export default Team;
