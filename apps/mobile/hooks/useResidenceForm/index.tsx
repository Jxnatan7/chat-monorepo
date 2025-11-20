import { useMemo, useCallback } from "react";
import { useAppStore } from "@/stores/appStore";
import { useFocusEffect } from "expo-router";

export type ResidenceFormValues = {
  providerName: string;
  providerDescription: string;
  residenceName: string;
  residenceAddress: string;
  residenceDescription: string;
};

export function useResidenceForm() {
  const provider = useAppStore((state) => state.provider);
  const house = useAppStore((state) => state.house);
  const setupResidence = useAppStore((state) => state.setupResidence);
  const fetchUserResidence = useAppStore((state) => state.fetchUserResidence);
  const isLoading = useAppStore((state) => state.isLoading);

  useFocusEffect(
    useCallback(() => {
      fetchUserResidence();
    }, [fetchUserResidence])
  );

  const initialValues: ResidenceFormValues = useMemo(
    () => ({
      providerName: provider?.name ?? "",
      providerDescription: provider?.description ?? "",
      residenceName: house?.name ?? "",
      residenceAddress: house?.address ?? "",
      residenceDescription: house?.description ?? "",
    }),
    [provider, house]
  );

  const handleSubmit = async (values: ResidenceFormValues) => {
    await setupResidence({
      provider: {
        name: values.providerName,
        description: values.providerDescription,
      },
      house: {
        name: values.residenceName,
        address: values.residenceAddress,
        description: values.residenceDescription,
      },
    });
  };

  return {
    initialValues,
    handleSubmit,
    isEditing: !!provider?.id,
    isLoading,
  };
}
