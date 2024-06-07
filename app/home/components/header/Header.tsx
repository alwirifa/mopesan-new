import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import Download from "./Download";

const Header = () => {
  return (
    <div className="border-b shadow-md bg-white/90 z-50 sticky top-0 left-0 w-full "> {/* Changed sticky to fixed */}
      <Container>
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:py-8">
          <Logo />
          <Download />
        </div>
      </Container>
    </div>
  );
};

export default Header;
