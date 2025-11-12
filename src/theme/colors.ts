// Centralized color exports (mirror CSS variables). Useful for JS/TS theming or MUI integration.
export const colors = {
  primary: "#FF5F24",
  primaryHover: "#FA5318",
  primaryActive: "#E34A0F",
  primaryFocus: "#FA5318",
  secondaryBg: "#F0E8E5",
  secondaryBgAlt: "#EEECEA",
  secondaryBorder: "#D6D3D2",
  secondaryBorderStrong: "#CCC8C7",
  secondaryGray: "#5C5856",
  secondaryBlack: "#0E0603",
};

export type ColorToken = keyof typeof colors;

export default colors;
