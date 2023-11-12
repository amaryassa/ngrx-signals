export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  phone: string;
  age: number;
  address: {
    address: string;
    city: string;
    postalCode: string;
    state: string;
  };
};
