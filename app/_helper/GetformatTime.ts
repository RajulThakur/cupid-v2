function GetformatTime(date: Date): string {
  const formattedTime: string = new Date(date).toLocaleTimeString("en-US", {
    //only show minutes and hours
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return formattedTime;
}
export default GetformatTime;
