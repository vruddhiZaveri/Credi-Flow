export type LoanForm = {
  name: string;
  email: string;
  phone: string;
  income: string;
  employment: string;
  existingEmi: string;
  requested: string;
  tenure: string;
  consent: boolean;
};

export type InputField = Exclude<keyof LoanForm, 'consent' | 'employment' | 'tenure'>;
