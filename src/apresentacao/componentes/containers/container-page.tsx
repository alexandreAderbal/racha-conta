import { SafeAreaView } from "react-native-safe-area-context";
import { ReactNode } from "react";
import { Theme } from "@Theme";

interface IProps {
  children: ReactNode;
  bg?: string;
}

export default function ContainerPage({ children, bg }: IProps) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: bg ? bg : Theme.colors.background,
      }}
      edges={["bottom"]}
    >
      {children}
    </SafeAreaView>
  );
}
