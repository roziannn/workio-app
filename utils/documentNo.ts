export function generateDocumentNo(sequence: number = 1) {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0"); // bulan 01-12

  const seq = String(sequence).padStart(3, "0");

  return `DOC-${yyyy}${mm}-${seq}`;
}
