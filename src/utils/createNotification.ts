export function createNotification(
  userId: string,
  type: string = "INFO",
  title: string,
  body: string = "",
) {
  return {
    userId,
    type,
    title,
    body,
  };
}
