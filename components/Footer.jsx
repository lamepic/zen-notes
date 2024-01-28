import React from "react";

function Footer() {
  return (
    <div className="py-5 px-8 text-sm flex justify-between items-center w-full border-t dark:border-gray-500/10">
      <p>Made with ❤️ &copy; {new Date().getFullYear()}</p>
      <p className="font-bold">Zen Notes</p>
    </div>
  );
}

export default Footer;
