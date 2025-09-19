export interface User {
  id: number;
  createdAt: string;
  username: string;
}

export type SignUpFormType = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type SignInFormType = {
  username: string;
  password: string;
};
