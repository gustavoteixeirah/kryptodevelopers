import React from 'react';
import { SocialIcon } from 'react-social-icons';

const TeamMember = (props) => {
  const { data } = props;

  return (
    <div className="bg-gray-800 w-full rounded-xl border border-gray-700 shadow-xl">
      <div className="flex flex-col items-center justify-center gap-6 py-8 px-4">
        {data.picture && <img src={data.picture} className="w-32 h-auto rounded-full border-2 border-gray-600" />}
        {!data.picture && <div className="bg-gray-600 w-32 h-32 rounded-full"></div>}
        <div className="text-center">
          <div className="text-2xl font-semibold">{data.name}</div>
          <div className="text-lg  text-gray-400">{data.role}</div>
        </div>
        <div className="text-md text-center text-gray-300">{data.description}</div>
        <div className="flex gap-4">
          {data.social.map((url) =>
            typeof url === 'object' ? (
              <SocialIcon url={url.url} key={url.url} style={{ width: 42, height: 42 }} bgColor={url.bgColor} />
            ) : (
              <SocialIcon url={url} key={url} style={{ width: 42, height: 42 }} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
