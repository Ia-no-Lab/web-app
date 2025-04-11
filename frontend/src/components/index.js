// Main components
import BigLogo from "./BigLogo";
import Footer from "./Footer";
import Header from "./Header";
import SmallLogo from "./SmallLogo";
import About from "./About";
import Terms from "./Terms";

// UI components
import { Button } from "./ui/button";
import { ColorModeProvider, useColorMode } from "./ui/color-mode";
import { Provider } from "./ui/provider";
import { Tooltip } from "./ui/tooltip";

// Export all components as a single object
const Components = {
  // Main components
  BigLogo,
  Footer,
  Header,
  SmallLogo,
  About,
  Terms,

  // UI components
  Button,
  ColorModeProvider,
  useColorMode,
  Provider,
  Tooltip,
};

export default Components;

// Also export individual components for direct imports
export {
  BigLogo,
  Footer,
  Header,
  SmallLogo,
  About,
  Terms,
  Button,
  ColorModeProvider,
  useColorMode,
  Provider,
  Tooltip,
};
