import { Link } from "@nextui-org/react";

import React from "react";

function NavbarC() {
  return (
    <div className=" mt-2">
      <Link
        isExternal
        className="  text-md md:text-xl font-semibold text-black text-center"
        href="https://github.com/Ayush0054"
      >
        Made with ❤️ by Ayush
      </Link>
    </div>
  );
}

export default NavbarC;
