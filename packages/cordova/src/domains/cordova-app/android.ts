export const getAndroidVersion = () =>
  Number.parseInt(device.version.split(".")[0], 10);

export const getAndroidApiLevel = () => {
  if (!device.sdkVersion) {
    throw new Error("Device SDK version is not available");
  }

  return Number.parseInt(device.sdkVersion, 10);
};
