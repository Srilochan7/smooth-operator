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

      <div className="flex flex-col gap-10 justify-center items-center px-5 md:px-10 bg-[#0f1015]">
        <h1 className="text-4xl md:text-6xl font-bricolage font-semibold text-white text-center">
          Smooth Operator
        </h1>
        <p className="text-lg md:text-xl font-popins text-center text-zinc-300">
        Your Personal AI Wingman, Crafting the Perfect Pickup Line to Help You Impress Your Crush Every Time! 💬💖
        </p>
      </div>
    </div>
  );
};

export default Header;
  