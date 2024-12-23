export const insertMaskInCEP = (cep: string) => {
  return cep.replace(/(\d{5})(\d)/, "$1-$2");
};

export const insertMaskInCpf = (value: string) => {
  const numbers = value.replace(/\D/g, "");

  if (numbers.length <= 3) {
    return numbers;
  }
  if (numbers.length <= 6) {
    return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  }
  if (numbers.length <= 9) {
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
  }
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(
    6,
    9
  )}-${numbers.slice(9, 11)}`;
};

export const insertMaskInPhone = (phone: string) => {
  const noMask = phone.replace(/\D/g, "");
  const { length } = noMask;
  if (length <= 11) {
    return noMask
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(length === 11 ? /(\d{5})(\d)/ : /(\d{4})(\d)/, "$1-$2");
  }
  return phone;
};
