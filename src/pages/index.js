import styles from "../styles/Home.module.css";
import Link from "next/link";
import { Button, Stack, Form } from "react-bootstrap";
import HTMLHead from "../common/components/HTMLHead";

export default function Home() {
  return (
    <>
      <HTMLHead title="Crowdfund" />
      <Stack gap={3} className="col-md-5 m-2">
        <Link href="/fund/campaigns">
          <Button variant="outline-primary">Show All Campaigns</Button>
        </Link>

        <Link href="/fund/new-campaign">
          <Button variant="outline-primary">Start Fundraiser</Button>
        </Link>
      </Stack>
    </>
  );
}
