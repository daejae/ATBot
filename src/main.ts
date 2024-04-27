import { buyStock, getAccount } from "./api/index.js";

(async () => {
  const account = await getAccount();
  console.log(account);
});


(async () => {
  console.log(await buyStock());
})();


