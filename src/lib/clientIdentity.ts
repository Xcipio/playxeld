const CLIENT_DEVICE_KEY = "playxeld-device-id";

function generateDeviceId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `device-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
}

export function getClientDeviceId() {
  const existingId = window.localStorage.getItem(CLIENT_DEVICE_KEY);

  if (existingId) {
    return existingId;
  }

  const nextId = generateDeviceId();
  window.localStorage.setItem(CLIENT_DEVICE_KEY, nextId);
  return nextId;
}
