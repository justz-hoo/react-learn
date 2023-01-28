import { useState } from 'react';

// interface: a wat to describe the shape of the object
interface Props {
  name: string;
  email: string;
  age: number;
  married: boolean;
  friends: string[];

  country?: Country;  // country在传参进来的时候可以省略by putting a "?"
}

// create some options that this will represent
export enum Country {
  America = "America",
  Canada = "Canada",
  China = "China",
}

export const Person = (props: Props) => {
  // const name: string = "piggy";

  // TypeScript of using states in react
  const [name, setName] = useState<string>("");

  return (
    <div>
      <h1>{props.name}</h1>
      <h1>{props.age}</h1>
      <h1>{props.email}</h1>
      <h1>This  person {props.married ? 'is' : 'is not'} married</h1>
      {props.friends.map((friend: string) => (
        <h1>{friend}</h1>
      ))}
      <h1>{props.country}</h1>
    </div>
  );
}
