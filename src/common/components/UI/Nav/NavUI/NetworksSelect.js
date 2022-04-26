import React from "react";
import { Dropdown } from "react-bootstrap";
import PolygonRender from "./selectNetwork/PolygonRender";
import FantomRender from "./selectNetwork/FantomRender";
import useMetaMask from "../../../../hooks/Web3Connect/GetConnection";
import LocalhostRender from "./selectNetwork/LocalhostRender";
import {
  POLYGON_TESTNET_CHAIN_ID,
  FANTOM_TESTNET_CHAIN_ID,
  LOCALHOST_TESTNET_CHAIN_ID,
} from "../../../../hooks/chainDetails/testnetDetails";

const NetworksSelect = () => {
  const { currentNetwork, isConnected, switchNetwork } = useMetaMask();

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          variant="outline text-nowrap"
          id="dropdown-basic-button"
          className="me-2 border border-secondary"
        >
          {/* currentNetwork === POLYGON_TESTNET_CHAIN_ID &&
          isConnected === true ? (
            <PolygonRender />
          ) 
		  : currentNetwork === FANTOM_TESTNET_CHAIN_ID &&
            isConnected === true ? (
            <FantomRender />
          ) 
		  :  */}
          {currentNetwork === POLYGON_TESTNET_CHAIN_ID &&
          isConnected === true ? (
            <PolygonRender />
          ) : (
            <span>Not Supported</span>
          )}
        </Dropdown.Toggle>
        {/* <Dropdown.Menu bg="light" variant="light">
          <Dropdown.Item
            className="d-flex"
            onClick={() => {
              console.log("polygon");
              switchNetwork(POLYGON_TESTNET_CHAIN_ID);
            }}
          >
            <PolygonRender />
          </Dropdown.Item>

          <Dropdown.Item
            className="d-flex"
            onClick={() => {
              console.log("fantom");
              switchNetwork(FANTOM_TESTNET_CHAIN_ID);
            }}
          >
            <FantomRender />
          </Dropdown.Item>

          <Dropdown.Item
            className="d-flex"
            onClick={() => {
              console.log("localhost");
              switchNetwork(LOCALHOST_TESTNET_CHAIN_ID);
            }}
          >
            <LocalhostRender />
          </Dropdown.Item>
        </Dropdown.Menu> */}
      </Dropdown>
    </>
  );
};

export default NetworksSelect;
