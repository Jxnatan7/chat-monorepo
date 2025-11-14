import ProviderService from "@/services/ProviderService";
import { useMutation } from "@tanstack/react-query";

export default function useFindProvider() {
  return useMutation({
    mutationFn: (code: string) => ProviderService.findByCode(code),
    mutationKey: ["find-provider"],
  });
}
