import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-[#0f1015] py-8 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-4">
        {/* Thanks message */}
        <h2 className="text-white text-xl">Thanks for visiting!</h2>
        
        {/* Credits */}
        <p className="text-gray-400">
          <span className="text-[#c1ff72]">Srilochan</span>
          <span> made this</span>
        </p>
        
        {/* Twitter/X Follow Button */}
        <a
          href="https://github.com/Srilochan7"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors duration-300"
        >
          {/* X/Twitter Icon */}
          <img
  src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
  alt="GitHub Logo"
  className="w-8 h-8 object-cover rounded filter invert"
/>

          <span>Follow Me</span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;