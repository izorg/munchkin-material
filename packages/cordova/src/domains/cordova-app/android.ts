export const getAndroidVersion = () =>
  Math.trunc(Number(device.version.split(".", 1)[0]));

export const getAndroidApiLevel = () => {
  if (!device.sdkVersion) {
    throw new Error("Device SDK version is not available");
  }

  return Math.trunc(Number(device.sdkVersion));
};
