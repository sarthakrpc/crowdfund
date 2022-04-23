import React from "react";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";

const AllCampaignLink = ({router}) => {
  return (
    <>
      <Link href="/fund/campaigns">
        <Nav.Item>
          <Nav.Link
            className={`ps-2 ${
              router.pathname.includes("/fund/campaigns")
                ? "text-light bg-primary"
                : "bg-light text-primary"
            }`}
            href="/fund/campaigns"
            eventKey="1"
          >
            Campaigns
          </Nav.Link>
        </Nav.Item>
      </Link>
    </>
  );
};

export default AllCampaignLink;
