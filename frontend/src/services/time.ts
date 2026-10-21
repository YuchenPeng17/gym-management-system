// database postgresql timestampz: 2026-10-14 22:20:00+11
// html input datetime-local: 2026-10-14T22:20

export const convertToDateTimeLocal = (timestamp: string): string => {
    const normalized = timestamp
    .replace(" ", "T")
    .replace(/([+-]\d{2})$/, "$1:00");
  const date = new Date(normalized);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hour}:${minute}`;
};

export const convertToTimestampz = (datetimeLocal: string): string => {
    return new Date(datetimeLocal).toISOString();
};