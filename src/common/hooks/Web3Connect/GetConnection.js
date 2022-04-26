import { useState, createContext, useMemo, useContext, useEffect } from "react";
import { ethers, Signer } from "ethers";
import {
  CHAIN_IDS,
  POLYGON_TESTNET_CHAIN_ID,
} from "../chainDetails/testnetDetails";

export const MetaMaskContext = createContext(null);

export const GetConnection = ({ children }) => {
  const [address, setAddress] = useState("");
  const [isSupportedNetwork, setisSupportedNetwork] = useState(false);
  const [isConnected, setisConnected] = useState(false);
  const [currentNetwork, setcurrentNetwork] = useState("");
  const [webProvider, setWebProvider] = useState("");
  const [signer, setSigner] = useState("");

  useEffect(() => {
    getAddressAsync();
  }, []);

  const getAddressAsync = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      if (provider.connection.url.includes("metamask")) {
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const userAddress = await((await signer.getAddress()).toLowerCase());

        const networkId = await (await provider.getNetwork()).chainId;

        await setWebProvider(provider);
        await setSigner(signer);
        await setAddress(userAddress);
        await setcurrentNetwork(networkId);
        await setisConnected(true);
        await setisSupportedNetwork(true);

		// console.log(signer);

        if (!CHAIN_IDS.includes(networkId)) {
          setisSupportedNetwork(false);
        } else {
          setisSupportedNetwork(true);
        }

        ethereum.on("accountsChanged", (accounts) => {
          if (accounts.length === 0) {
            setAddress("");
            setisConnected(false);
          } else {
            setAddress(accounts[0]);
            setisConnected(true);
          }
        });

        provider.on("network", (newNetwork, oldNetwork) => {
          const newNetworkId = newNetwork.chainId;
          if (!CHAIN_IDS.includes(newNetworkId)) {
            setisSupportedNetwork(false);
          } else {
            setisSupportedNetwork(true);
          }
          setcurrentNetwork(newNetworkId);
          //   window.location.reload()
        });
      } else {
        alert("Please install MetaMask");
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  const switchNetwork = async (chainIdparam) => {
    if (isConnected === false) {
      getAddressAsync();
    }
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.utils.hexValue(chainIdparam) }],
      });
      //   isSupportedNetwork === true ? setcurrentNetwork(chainIdparam) : -1;
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (err.code === 4902) {
        if (chainIdparam === POLYGON_TESTNET_CHAIN_ID) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "Polygon Testnet",
                chainId: ethers.utils.hexValue(chainIdparam),
                nativeCurrency: {
                  name: "MATIC",
                  decimals: 18,
                  symbol: "MATIC",
                },
                rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
                blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
              },
            ],
          });
        }
        // isSupportedNetwork === true ? setcurrentNetwork(chainIdparam) : -1;
      }
    }
  };

  const values = useMemo(
    () => ({
      address,
      webProvider,
      getAddressAsync,
      isSupportedNetwork,
      isConnected,
	  signer,
      currentNetwork,
      switchNetwork,
    }),
    [
      address,
      webProvider,
      getAddressAsync,
      isSupportedNetwork,
      isConnected,
	  signer,
      currentNetwork,
      switchNetwork,
    ]
  );

  return (
    <>
      <MetaMaskContext.Provider value={values}>
        {children}
      </MetaMaskContext.Provider>
      {/* {console.log(values)} */}
    </>
  );
};

export default function useMetaMask() {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error(
      "useMetaMask hook must be used with a MetaMaskProvider component"
    );
  }
  return context;
}
