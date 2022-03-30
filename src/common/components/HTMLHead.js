import React from "react";
import Head from "next/head";

const HTMLHead = ({title}) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default HTMLHead;
