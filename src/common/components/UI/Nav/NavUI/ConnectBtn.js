import React from "react";
import { Button } from "react-bootstrap";
import useMetaMask from "../../../../hooks/Web3Connect/GetConnection";
import { POLYGON_TESTNET_CHAIN_ID } from "../../../../hooks/chainDetails/testnetDetails";
const CONNECT_LABEL = "Connect Wallet";
const WRONG_NETWORK_LABEL = "Change Network";

const ConnectBtn = () => {
  const { address, isSupportedNetwork, getAddressAsync, switchNetwork } =
    useMetaMask();
  let renderAddress = address;
  if (renderAddress !== "" && isSupportedNetwork === true) {
    renderAddress = `${renderAddress.slice(0, 8)}...${renderAddress.slice(-4)}`;
  } else if (renderAddress !== "" && isSupportedNetwork === false) {
    renderAddress = WRONG_NETWORK_LABEL;
  } else {
    renderAddress = CONNECT_LABEL;
  }

  return (
    <>
      <Button
        variant="text-nowrap"
        className={
          renderAddress === CONNECT_LABEL
            ? "btn-outline-primary"
            : renderAddress === WRONG_NETWORK_LABEL
            ? "btn-danger"
            : "btn-primary"
        }
        onClick={
          renderAddress === CONNECT_LABEL
            ? getAddressAsync
            : () => {
                switchNetwork(POLYGON_TESTNET_CHAIN_ID);
              }
        }
      >
        {renderAddress === CONNECT_LABEL ? (
          <>{renderAddress}</>
        ) : renderAddress === WRONG_NETWORK_LABEL ? (
          <>{renderAddress}</>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-wallet2 me-2 mb-1"
              viewBox="0 0 16 16"
            >
              <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"></path>
            </svg>
            <span>{renderAddress}</span>
          </>
        )}
      </Button>
    </>
  );
};

export default ConnectBtn;
