import { RestyleContainer, RestyleContainerProps } from "@/components/restyle";
import { ContainerHeader, ContainerHeaderProps } from "../ContainerHeader";

export type ContainerProps = RestyleContainerProps & {
  hideHeader?: boolean;
  containerHeaderProps?: ContainerHeaderProps;
  containerHeaderChildren?: React.ReactNode;
};

export const Container = ({
  children,
  hideHeader,
  containerHeaderProps,
  containerHeaderChildren,
  ...props
}: ContainerProps) => {
  return (
    <RestyleContainer {...props}>
      {!hideHeader && (
        <ContainerHeader
          title="Seus dados"
          children={containerHeaderChildren}
          {...containerHeaderProps}
        />
      )}
      {children}
    </RestyleContainer>
  );
};
