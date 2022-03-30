import React from "react";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";

const NewCampaignLink = ({router}) => {
  return (
    <>
      <Link href="/fund/new-campaign">
        <Nav.Item>
          <Nav.Link
            className={`ps-2 ${
              router.pathname === "/fund/new-campaign"
                ? "text-light bg-primary"
                : "bg-light text-primary"
            }`}
            href="/fund/new-campaign"
            eventKey="2"
          >
            Raise Funds
          </Nav.Link>
        </Nav.Item>
      </Link>
    </>
  );
};

export default NewCampaignLink;
