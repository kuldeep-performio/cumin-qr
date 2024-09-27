export type QRConfigData = {
  value: string;
  ecLevel: "L" | "M" | "Q" | "H";
  size: number;
  quietZone: number;
  bgColor: string;
  fgColor: string;
  qrStyle: "squares" | "dots";
  eyeRadius: any;
  eyeColor: any;
  logoPaddingStyle: "square" | "circle";
  logoPadding: number;
  logoWidth: number;
  logoHeight: number;
  logoImage: string;
  formData: any;
};

export type QRConfigDataAdmin = {
  name?: string;
  dynamic?: boolean;
  qrData?: any;
  linkDocId?: string;
} & QRConfigData;

 
export type QROptions = {
  name: string;
  dynamic: boolean;
  qrData: QRConfigData;
};