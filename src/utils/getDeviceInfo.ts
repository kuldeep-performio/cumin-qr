function detectDeviceType() {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  // const screenWidth = window.screen.width;
  // const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  // const isPortrait = window.matchMedia('(orientation: portrait)').matches;

  const isWindows = platform.startsWith("Win");
  const isMacOS = platform.startsWith("Mac");
  const isIOS = /(iPhone|iPad|iPod)/.test(userAgent);
  const isAndroid = /(Android)/.test(userAgent);

  let deviceType = "Unknown";

  if (isIOS) {
    deviceType = "iOS Device";
  } else if (isAndroid) {
    deviceType = "Android Device";
  } else if (isWindows) {
    deviceType = "Windows PC";
  } else if (isMacOS) {
    deviceType = "Mac PC";
  }

  // if (screenWidth < 768) {
  //   deviceType += ' (Mobile)';
  // } else if (screenWidth >= 768 && screenWidth < 1024) {
  //   deviceType += ' (Tablet)';
  // } else {
  //   deviceType += ' (Desktop/Laptop)';
  // }

  // if (isPortrait) {
  //   deviceType += ' (Portrait)';
  // } else {
  //   deviceType += ' (Landscape)';
  // }

  return deviceType;
}

function detectOperatingSystem() {
  const platform = navigator.platform;
  const userAgent = navigator.userAgent;

  if (/Windows/.test(platform)) {
    return "Windows";
  } else if (/Mac/.test(platform)) {
    return "Mac OS";
  } else if (/iPhone|iPad|iPod/.test(userAgent)) {
    return "iOS";
  } else if (/Android/.test(userAgent)) {
    return "Android";
  } else if (/Linux/.test(platform)) {
    return "Linux";
  } else {
    return "Unknown";
  }
}

function detectBrowser() {
  const userAgent = navigator.userAgent;

  if (/Firefox/.test(userAgent)) {
    return "Mozilla Firefox";
  } else if (/Chrome/.test(userAgent)) {
    return "Google Chrome";
  } else if (/Safari/.test(userAgent)) {
    return "Safari";
  } else if (/Edge/.test(userAgent)) {
    return "Microsoft Edge";
  } else if (/Trident/.test(userAgent)) {
    return "Internet Explorer";
  } else {
    return "Unknown";
  }
}

function getUserLanguage() {
  return navigator.language;
}

export const userLanguage = getUserLanguage();

export const browser = detectBrowser();

export const operatingSystem = detectOperatingSystem();

export const deviceType = detectDeviceType();
