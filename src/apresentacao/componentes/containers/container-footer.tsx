import { Theme } from "@Theme";
import { ReactNode } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface IProps {
  children: ReactNode;
}

export default function ContainerFooter({ children }: IProps) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Theme.colors.background,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: 14,
        paddingEnd: 14,
        paddingLeft: 16,
        paddingRight: 16,
      }}
      edges={["bottom"]}
    >
      {children}
    </SafeAreaView>
  );
}
