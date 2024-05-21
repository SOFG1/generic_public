export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

export const addZeroForward = (string: string, needLength: number = 2) => {
  return `${"0".repeat(needLength - string.length)}${string}`;
};

export const getFormatDate = (date: Date) => {
  const days = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const years = date.getFullYear();
  return `${addZeroForward(days)}.${addZeroForward(month)}.${years}`;
};


export const getFormatDateTime = (date: Date) => {
  const days = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const years = date.getFullYear();
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  return `${addZeroForward(days)}.${addZeroForward(
    month
  )}.${years} ${addZeroForward(hours)}:${addZeroForward(minutes)}`;
};

export const getFormatTime = (date: Date) => {
  const hours = date.getHours().toString()
  const minutes = date.getMinutes().toString()
  return `${addZeroForward(hours)}.${addZeroForward(minutes)}`
}

export const aDayInMilliseconds = 60 * 60 * 24 * 1000;

//This function takes date as a string in this format: DD.MM.YYYY HH:MM and returns a Date object
export const getDateFromString = (date: string): Date => {
  const day = date.slice(0, 2);
  const month = date.slice(3, 5);
  const year = date.slice(6, 10);
  const time = date.slice(11, 16);
  return new Date(`${year}-${month}-${day} ${time}:00`);
};

export const getDateFromStr = (date: string): Date => {
  const day = date.slice(0, 2);
  const month = date.slice(3, 5);
  const year = date.slice(6, 10);
  return new Date(`${year}-${month}-${day}`);
};

export const validEmailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const emailValidator = (email: string) => {
  return validEmailRegex.test(escapeRegExp(email));
}

export const httpOrHttpsRegex = /(http(s?)):\/\//i;

export const phoneNumberRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export const phoneNumberValidator = (phone: string) => {
  return phoneNumberRegex.test(escapeRegExp(phone));
}

export const onlyNumbersValidator = (str: string) => {
  return /^[0-9]+$/.test(str)
}