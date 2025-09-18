export const formatRupiah = (value: string | number): string => {
  const numberString = value.toString().replace(/[^,\d]/g, "");
  const number = parseInt(numberString, 10);

  if (isNaN(number)) return "Rp 0";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
