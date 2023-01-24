import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export const Home = () => {
  const {
    data: catData,
    isLoading,
    isError,
    refetch,
  } = useQuery(["cat"], () => {
    return Axios.get("https://catfact.ninja/fact").then((res) => res.data);
  });

  if (isLoading) {
    return <h1>Data is Loading...</h1>;
  }
  if (isError) {
    return <h1>Fetch Data Error</h1>;
  }
  return (
    <div>
      <h1>THIS IS THE HOME PAGE</h1>
      <h1>{catData?.fact}</h1>
      <h1>{catData?.length}</h1>
      <button onClick={refetch}>Update Data</button>
    </div>
  );
};
