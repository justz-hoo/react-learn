import Axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const Cat = () => {
  const {data: catData} = useQuery(["cat"], async () => {
    return Axios.get('https://catfact.ninja/fact').then((res) => res.data);
  });
  console.log(catData);
  return (
    <div>
      <h1>{catData?.fact}</h1>
    </div>
  );
}