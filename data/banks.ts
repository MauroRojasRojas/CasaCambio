import { BANK_ACCOUNTS_JSON } from './../lib/utils/constants';
export type BankAccount = {
  bank: string;
  type: string;
  money: string;
  account: string;
  cci: string;
};

export const BANK_ACCOUNTS: BankAccount[] = (() => {
  try {
    const parsed = JSON.parse(BANK_ACCOUNTS_JSON);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((x: BankAccount) => ({
      bank: String(x?.bank ?? ''),
      type: String(x?.type ?? ''),
      money: String(x?.money ?? ''),
      account: String(x?.account ?? ''), // ✅ nuevo
      cci: String(x?.cci ?? ''),
    }));
  } catch {
    return [];
  }
})();