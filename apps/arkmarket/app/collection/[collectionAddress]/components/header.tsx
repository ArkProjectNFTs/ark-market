import React from "react";

interface HeaderProps {
  collectionMetadata: unknown;
}

const Header = ({ collectionMetadata }: HeaderProps) => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">Header</div>
    </div>
  );
};

export default Header;
