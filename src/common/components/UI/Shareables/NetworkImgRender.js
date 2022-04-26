import React from "react";
import Image from "next/image";
import useMetaMask from "../../../hooks/Web3Connect/GetConnection";
import {
	LOCALHOST_TESTNET_CHAIN_ID,
	POLYGON_TESTNET_CHAIN_ID,
	FANTOM_TESTNET_CHAIN_ID,
  }  from "../../../hooks/chainDetails/testnetDetails"

const NetworkImgRender = () => {
  const {currentNetwork, isConnected} = useMetaMask();
  return (
    <>
      <Image
        src={`/${
        //   currentNetwork === POLYGON_TESTNET_CHAIN_ID && isConnected
        //     ? "polygon"
        //     : currentNetwork === FANTOM_TESTNET_CHAIN_ID && isConnected
        //     ? "fantom"
        //     : 
			currentNetwork === LOCALHOST_TESTNET_CHAIN_ID && isConnected
            ? "localhost"
            : "disconnected"
        }-logo.png`}
        alt="Picture of the author"
        width={20}
        height={20}
      />
    </>
  );
};

export default NetworkImgRender;
