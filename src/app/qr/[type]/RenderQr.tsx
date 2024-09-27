"use client";

import HeroQR from "@/app/components/Banner/HeroQRGenerate";
import { QRCodes } from "@/data/QRTypes";
import { defaultQrData } from "@/data/common";
import { QRConfigData } from "@/types/qrTypes";
import { useState } from "react";

export function QRRenderComponent({ type }: { type: string }) {
  const [qrData, setQrData] = useState<QRConfigData>(
    defaultQrData as QRConfigData
  );

  const handleQrData = (data: QRConfigData) => {
    setQrData({ ...qrData, ...data });
  };

  return (
    <HeroQR
      qrTypesMain={QRCodes}
      hero={false}
      type={type}
      handleQrData={handleQrData}
      qrData={qrData}
    />
  );
}

export function QRRenderComponentHero() {
  const [qrData, setQrData] = useState<QRConfigData>(
    defaultQrData as QRConfigData
  );

  const handleQrData = (data: QRConfigData) => {
    setQrData({ ...qrData, ...data });
  };
  return (
    <HeroQR
      qrTypesMain={QRCodes}
      hero={true}
      handleQrData={handleQrData}
      qrData={qrData}
    />
  );
}
