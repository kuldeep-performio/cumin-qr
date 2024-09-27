"use client";

import { useService } from "@/context/ServiceContext";
import {
  browser as browserData,
  deviceType,
  operatingSystem,
  userLanguage,
} from "@/utils/getDeviceInfo";
import { usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function RedirectLink() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { getLink, editLink } = useService();

  const pathname = usePathname();

  const getLocationOrigin = async () => {
    try {
      const data = await fetch(
        // "https://ipinfo.io/122.161.53.51?token=98ab016c542642"
        // "https://ipinfo.io/json?token=98ab016c542642"
        "https://ipinfo.io/?callback=callback&token=98ab016c542642"
      );
      const responseText = await data.text();
    //   const res = await data.json();
      const jsonStartIndex = responseText.indexOf('{');
        const jsonEndIndex = responseText.lastIndexOf('}');
        const jsonResponse = responseText.substring(jsonStartIndex, jsonEndIndex + 1);

        // Parsing the JSON
        const res = JSON.parse(jsonResponse);
      return res;
    } catch (error) {
      return {};
    }
  };

const getStats = async () => {
    const currentTime = new Date().toISOString();
    const language = userLanguage;
    const browser = browserData;
    const os = operatingSystem;
    const device = deviceType;
    const data = await getLocationOrigin();

    return {
      currentTime,
      language,
      browser,
      os,
      device,
      country: data?.country || '',
      city: data?.city || '',
      state: data?.region || '',
      timezone: data?.timezone || '',
      ip : data?.ip || '',
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getLink(pathname.replace("/", ""));
        if (response.length === 0) {
          setError("Link not found");
          return;
        } else {
          const currentDoc = response[0];
          await editLink(currentDoc.docId, {
            views: currentDoc.views ? currentDoc.views + 1 : 1,
            stats: [...currentDoc.stats, await getStats()],
          });
        //   console.log("linkRes: ", linkRes);
          //   window.location.href = currentDoc.destinationUrl;
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return <div>Redirecting...</div>;
}

function redirectUrl(oldUrl: string, newUrl: string): void {
  // Check if the old URL matches the current URL
  if (window.location.href === oldUrl) {
    // Get the current time
    const currentTime = new Date().toLocaleString();

    // Increment redirect count by 1
    const redirectCount = localStorage.getItem("redirectCount");
    const newRedirectCount = redirectCount ? parseInt(redirectCount) + 1 : 1;
    localStorage.setItem("redirectCount", newRedirectCount.toString());

    // Store redirection time and count in local storage
    localStorage.setItem("lastRedirectTime", currentTime);
    localStorage.setItem("lastRedirectionUrl", newUrl);

    // Redirect to the new URL
    window.location.href = newUrl;
  } else {
    console.error(
      `Current URL (${window.location.href}) does not match the provided old URL (${oldUrl}).`
    );
  }
}
