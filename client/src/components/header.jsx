import React from 'react';

const Header = () => {
  return (
    <div>
      {/* Image section (if needed, you can uncomment it) */}
      {/* <div className="p-3">
        <img
          src="/images/so.gif"
          alt="header"
          className="w-full md:h-[250px] rounded-xl object-cover"
        />
      </div> */}

      <div className="flex flex-col gap-5 justify-center items-center px-5 md:px-10">
        <h1 className="text-4xl md:text-6xl font-bricolage font-semibold text-neon text-center">
          Brain-Rot Language Converter
        </h1>
        <p className="text-lg md:text-xl font-popins text-center text-zinc-300">
          Turn your text into trendy Gen Z slang with a click. Add memes,
          slang, and cool vibes instantly!👀 Stay on top of the latest trends
          and speak like a pro! 💯
        </p>
      </div>
    </div>
  );
};

export default Header;
  