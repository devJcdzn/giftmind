// import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPage } from "../actions/create-page-action";
// import { toast } from "sonner";

export const useCreatePage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await createPage(data);

      console.log(response);

      return response;
    },
    onSuccess: () => {},
    onError: () => {},
  });

  return mutation;
};
