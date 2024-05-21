import { addZeroForward } from ".";
import { UserActivityType } from "../api/user";

const formatDate = (date: Date) => {
    const days = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const years = date.getFullYear();
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();
    const seconds = date.getSeconds().toString();
    return `${years}-${addZeroForward(month)}-${addZeroForward(
      days
    )} ${addZeroForward(hours)}:${addZeroForward(minutes)}:${addZeroForward(
      seconds
    )}`;
  };

export const createActivity = (pathname: string, action: string): UserActivityType => {
    return {
        time: formatDate(new Date()),
        action,
        page: pathname === "/" ? "Stats" : pathname.replaceAll("/", ""),
      }
}