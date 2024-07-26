import React from "react";
import { PlugLogin } from "ic-auth";
import { canisterId } from "../../declarations/icp_ledger_canister";
import { canisterId as IndexId } from "../../declarations/icp_index_canister";
import { IndexCanister } from "@dfinity/ledger-icp";

const App = () => {
  const whitelist = [canisterId, IndexId];

  const handleLogin = async () => {
    try {
      const userObject = await PlugLogin(whitelist);

      console.log("user object :", userObject);
      let IndexCan = IndexCanister.create({
        canisterId: IndexId,
        agent: userObject?.agent,
      });
      console.log("index :", IndexCan);

      const results = await IndexCan?.getTransactions({
        certified: false,
        start: undefined,
        maxResults: 10,
        accountIdentifier:
          "c534cb97073c30f897c8dfdd50c86406b297ae9028299f4592ac4a0cb6692f06",
      });

      console.log("transactions results :", results);
    } catch (error) {
      console.log("error in getting set :", error);
    }
  };
  return (
    <button style={{ color: "blue", padding: "20px" }} onClick={handleLogin}>
      Login
    </button>
  );
};

export default App;
