// Desc: This file contains the main component that is responsible for rendering the QR content based on the selected type
import QRText from "./QRText";
import QRvCard from "./QRvCard";
import QRUrl from "./QRUrl";
import QREmail from "./QREmail";
import QREvent from "./QREvent";
import QRPayments from "./QRPayments";
import QRAppStore from "./QRAppStore";
import QRSocial from "./QRSocial";
import QRWifi from "./QRWifi";
import QRLocation from "./QRLocation";
import QRPhone from "./QRPhone";
import QRSms from "./QRSms";
import QRWhatsApp from "./QRWhatsApp";
import QRRating from "./QRRating";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export function TypeComponent({
  type,
  handleQrData,
  formData,
  admin = false,
  styles = false,
  name = "",
}: {
  type: string | undefined;
  handleQrData: (data: any) => void;
  formData: any;
  admin?: boolean;
  styles?: boolean;
  name?: string;
}) {
  const handleEneryting = (data: any) => {
    console.log(data);
  };

  return (
    <>
      {admin && (
        <FormControl>
          <FormLabel htmlFor="qr-text" fontWeight={"semibold"}>
            Name
          </FormLabel>
          <Input
            id="name"
            placeholder="unique name to identify the QR code"
            value={name}
            onChange={(e) => handleQrData({ name: e.target.value })}
          />
        </FormControl>
      )}
      {type === "text" && (
        <QRText styles={styles} value={formData} setValue={handleEneryting} />
      )}
      {type === "url" && (
        <QRUrl admin={admin} value={formData} setValue={handleEneryting} />
      )}
      {type === "email" && <QREmail value={formData} setValue={handleEneryting} />}
      {type === "vcard" && <QRvCard value={formData} setValue={handleEneryting} />}
      {type === "location" && (
        <QRLocation value={formData} setValue={handleEneryting} />
      )}
      {type === "wifi" && <QRWifi value={formData} setValue={handleEneryting} />}
      {type === "phone" && <QRPhone value={formData} setValue={handleEneryting} />}
      {type === "sms" && <QRSms value={formData} setValue={handleEneryting} />}
      {type === "social" && (
        <QRSocial value={formData} setValue={handleEneryting} />
      )}
      {type === "event" && <QREvent value={formData} setValue={handleEneryting} />}
      {type === "appstore" && (
        <QRAppStore value={formData} setValue={handleEneryting} />
      )}
      {/* {type === "payments" && <QRPayments value={value} setValue={handleEneryting} />} */}
      {type === "whatsapp" && (
        <QRWhatsApp value={formData} setValue={handleEneryting} />
      )}
      {type === "rating" && (
        <QRRating value={formData.value} setValue={handleEneryting} />
      )}
    </>
  );
}
