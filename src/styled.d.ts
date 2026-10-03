import "styled-components";

import { Theme } from "./core/theme";

type AppTheme = typeof Theme;

declare module "styled-components" {
  export interface DefaultTheme extends AppTheme {}
}
