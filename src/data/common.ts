export const defaultQrData = {
  value: "",
  ecLevel: "M",
  size: 350,
  quietZone: 30,
  bgColor: "#FFFFFF",
  fgColor: "#000000",
  qrStyle: "squares",
  eyeRadius: [
    {
      outer: [0, 0, 0, 0],
      inner: [0, 0, 0, 0],
    },
    {
      outer: [0, 0, 0, 0],
      inner: [0, 0, 0, 0],
    },
    {
      outer: [0, 0, 0, 0],
      inner: [0, 0, 0, 0],
    },
  ],
  eyeColor: [
    {
      outer: "#000000",
      inner: "#000000",
    },
    {
      outer: "#000000",
      inner: "#000000",
    },
    {
      outer: "#000000",
      inner: "#000000",
    },
  ],
  logoPaddingStyle: "square",
  logoPadding: 5,
  logoWidth: 30,
  logoHeight: 30,
  logoImage: "",
  formData : {}
};

export const defaultQRDataAdmin = {
  ...defaultQrData,
  name: "",
  dynamic: false,
  qrData: {},
};

export const defaultEmailData = {
  email: "",
  subject: "",
  message: "",
};

export const defaultLocationData = {
  latitude: "",
  longitude: "",
};

export const defaultSmsData = {
  phone: "",
  message: "",
};

export const defaultSocialData = {
  social: "",
};

export const defaultUrlData = {
  url: "",
};

export const defaultWifiData = {
  name: "",
  encryption: "WEP",
  password: "",
};

export const defaultVCardData = {
  firstName: "",
  lastName: "",
  organization: "",
  phone: "",
  email: "",
  address: "",
  title: "",
  website: "",
  birthday: "",
};

export const defaultEventData = {
  summary: "",
  startDate: "",
  endDate: "",
  location: "",
  url: "",
  description: "",
  timezone: "Africa/Abidjan",
};

export const defaultAppStoreData = {
  appStore: "",
};

export const defaultRatingData = {
  rating: "",
};

export const defaultWhatsAppData = {
  phone: "",
  message: "",
};
