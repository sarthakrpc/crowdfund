import React from "react";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";

const ProfileLink = ({router}) => {
  return (
    <>
      <Link href="/profile">
        <Nav.Item>
          <Nav.Link
            className={`ps-2 ${
              router.pathname === "/profile"
                ? "text-light bg-primary"
                : "bg-light text-primary"
            }`}
            href="/profile"
            eventKey="3"
          >
            Profile
          </Nav.Link>
        </Nav.Item>
      </Link>
    </>
  );
};
export default ProfileLink;