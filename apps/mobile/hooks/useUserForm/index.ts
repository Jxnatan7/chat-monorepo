import { useMemo } from "react";
import { useAppStore } from "@/stores/appStore";
import { useAuthStore } from "@/stores/authStore";

export type UserFormValues = {
  name: string;
  email: string;
  phone: string;
};

export function useUserForm() {
  const user = useAuthStore((state) => state.user);
  const setupUser = useAppStore((state) => state.setupUser);
  const isLoading = useAppStore((state) => state.isLoading);

  const initialValues: UserFormValues = useMemo(
    () => ({
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
    }),
    [user]
  );

  const handleSubmit = async (values: UserFormValues) => {
    await setupUser({
      name: values.name,
      email: values.email,
      phone: values.phone,
    });
  };

  return {
    initialValues,
    handleSubmit,
    isEditing: !!user?.id,
    isLoading,
  };
}
