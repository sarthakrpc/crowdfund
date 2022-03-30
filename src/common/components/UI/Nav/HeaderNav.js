import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Navbar, Nav, Form, Container } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import NetworksSelect from "./NavUI/NetworksSelect";
import ConnectBtn from "./NavUI/ConnectBtn";
import AllCampaignLink from "./NavUI/AllCampaignLink";
import NewCampaignLink from "./NavUI/NewCampaignLink";
import ProfileLink from "./NavUI/ProfileLink";

const HeaderNav = () => {
  const router = useRouter();
  return (
    <header>
      <Navbar bg="light" variant="light" expand="md">
        <Container fluid>
          <Link href="/">
            <Navbar.Brand href="/">
              <img
                src="/favicon.ico"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />{" "}
              Crowdfund
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              variant="pills"
              className="me-auto my-2 my-0"
              style={{ maxHeight: "110px" }}
              navbarScroll
            >
              <AllCampaignLink router={router} />
              <NewCampaignLink router={router} />
              <ProfileLink router={router} />
            </Nav>

            <Form className="d-flex">
                <NetworksSelect />
                <ConnectBtn />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default HeaderNav;
