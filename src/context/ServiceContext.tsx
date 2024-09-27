import { app } from "@/config/firebase";
import { QRConfigData } from "@/types/qrTypes";
import { uid } from "@/utils/common";
import { useUser } from "@/utils/useUser";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useContext } from "react";

const ServiceContext = createContext({});

export const useService = () => useContext<any>(ServiceContext);

const firestore = getFirestore(app);

export const ServiceContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = useUser();
  const linkCollection = collection(firestore, "links");
  const qrCollection = collection(firestore, "qrcode");
  const stylesCollection = collection(firestore, "qr-designs");

  // links CRUD
  const getAllLinks = async () => {
    if (user !== false) {
      const q = query(linkCollection, where("userId", "==", user?.uid));
      const links = await getDocs(q);
      return links.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
    }
    return [];
  };

  const createNewLink = async ({
    name,
    destinationUrl,
    alias,
  }: {
    name: string;
    destinationUrl: string;
    alias: string;
  }) => {
    if (user !== false) {
      await addDoc(linkCollection, {
        name,
        destinationUrl,
        alias,
        id: uid(),
        views: 0,
        stats: [],
        userEmail: user?.email,
        userId: user?.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const getLink = async (link: string) => {
    const q = query(linkCollection, where("alias", "==", link));
    const links = await getDocs(q);
    return links.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
  };

  const getLinkById = async (id: string) => {
    const docRef = doc(linkCollection, id);
    const result = await getDoc(docRef);
    return result;
  };

  const editLink = async (docId: string, data: any) => {
    const linkDoc = doc(linkCollection, docId);
    await updateDoc(linkDoc, data);
  };

  const deleteLink = async (docId: string) => {
    const linkDoc = doc(linkCollection, docId);
    await deleteDoc(linkDoc);
  };

  // QR codes CRUD

  const getAllQRcodes = async () => {
    if (user !== false) {
      const q = query(qrCollection, where("userId", "==", user?.uid));
      const qrCodes = await getDocs(q);
      return qrCodes.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
    }
    return [];
  };

  const createNewQRCode = async ({
    name,
    value,
    type,
    dynamic = false,
    qrData,
  }: {
    name: string;
    value: string;
    type: string;
    dynamic: boolean;
    qrData: QRConfigData;
  }) => {
    if (user !== false) {
      await addDoc(qrCollection, {
        name,
        value,
        type,
        dynamic,
        qrData,
        id: uid(),
        views: dynamic ? 0 : null,
        stats: [],
        userEmail: user?.email,
        userId: user?.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const editQrCode = async (docId: string, data: any) => {
    const qrDoc = doc(qrCollection, docId);
    await updateDoc(qrDoc, data);
  };

  const deleteQrCode = async (docId: string) => {
    const linkDoc = doc(qrCollection, docId);
    await deleteDoc(linkDoc);
  };

  // QR styles CRUD

  const getAllQRstyles = async () => {
    if (user !== false) {
      const q = query(stylesCollection, where("userId", "==", user?.uid));
      const qrCodes = await getDocs(q);
      return qrCodes.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
    }
    return [];
  };

  const createNewQRStyle = async ({
    name,
    style,
  }: {
    name: string;
    style: QRConfigData;
  }) => {
    if (user !== false) {
      await addDoc(stylesCollection, {
        name,
        style,
        id: uid(),
        userEmail: user?.email,
        userId: user?.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const editQrStyle = async (docId: string, data: any) => {
    const styleDoc = doc(stylesCollection, docId);
    await updateDoc(styleDoc, data);
  };

  const deleteQrStyle = async (docId: string) => {
    const styleDoc = doc(stylesCollection, docId);
    await deleteDoc(styleDoc);
  };

  return (
    <ServiceContext.Provider
      value={{
        getAllLinks,
        createNewLink,
        getLink,
        editLink,
        deleteLink,
        getAllQRcodes,
        createNewQRCode,
        getLinkById,
        editQrCode,
        deleteQrCode,
        getAllQRstyles,
        createNewQRStyle,
        editQrStyle,
        deleteQrStyle
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
