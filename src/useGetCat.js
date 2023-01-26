import Axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetCat = () => {
  const {
    data,
    refetch,
    isLoading: IsCatLoading,
    error,
  } = useQuery(["cat"], async () => {
    return Axios.get("https://catfact.ninja/fact").then((res) => res.data);
  });

  const refetchData = () => {
    alert("Data refetched");
    refetch();
  };

  if (error) {
    
  }

  return { data, refetchData };
};
