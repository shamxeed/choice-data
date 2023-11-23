export const getBalances = (data, user) => {
  const { balance } = user || {};

  const { /* jonet, */ payscribe, datastation, dancity, kvdata } = data || {};

  //const { walletBalance, user: jonnetAccount } = jonet || {};

  // const jonetAccounts = jonnetAccount?.Accounts?.BackupAccountDetails || {};

  // const { bankName: jonetAccountNum } = jonetAccounts || {};

  const { Account_Balance, bank_accounts } = datastation?.user || {};

  const { Account_Balance: danAccBal, bank_accounts: danAccs } =
    dancity?.user || {};

  const { Account_Balance: kvAccBal, bank_accounts: kvAccs } =
    kvdata?.user || {};

  const datastationAccountNum = bank_accounts?.accounts[2]?.accountNumber;

  const dancityAccountNum = danAccs?.accounts[2]?.accountNumber;

  const kvAccountNum = kvAccs?.accounts[2]?.accountNumber;

  const balanceText = `₦${balance?.toLocaleString()}`;

  /*  const jonetBalance = `₦${Number(walletBalance)?.toLocaleString()}`; */

  const datastationBalance = `₦${Account_Balance?.toLocaleString()}`;

  const dancityBalance = `₦${danAccBal?.toLocaleString()}`;

  const kvBalance = `₦${kvAccBal?.toLocaleString()}`;

  return {
    balanceText,
    payscribe: `₦${payscribe}`,
    datastationAccountNum,
    dancityAccountNum,
    kvAccountNum,
    datastationBalance,
    dancityBalance,
    kvBalance,
  };
};
