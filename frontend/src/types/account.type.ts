export interface Account {
  _id: string;
  user_name: string;
  password: string;
  email: string;
  role: string;
  created_at: string;
}

export interface inputData {
  user_name: string;
  password: string;
  email: string;
}
