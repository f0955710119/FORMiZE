const size = {
  mobileS: "360px",
  mobileL: "425px",
  tabletS: "584px",
  tablet: "768px",
  deployForm: "801px",
  laptopS: "1024px",
  laptopM: "1240px",
  laptopL: "1440px",
  desktopS: "1537px",
  desktopM: "1746px",
};

const breakpointConfig: {
  [key: string]: string;
} = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tabletS: `(max-width: ${size.tabletS})`,
  tablet: `(max-width: ${size.tablet})`,
  deployForm: `(max-width: ${size.deployForm})`,
  laptopS: `(max-width: ${size.laptopS})`,
  laptopM: `(max-width: ${size.laptopM})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktopS: `(max-width: ${size.desktopS})`,
  desktopM: `(max-width: ${size.desktopM})`,
};

export default breakpointConfig;
