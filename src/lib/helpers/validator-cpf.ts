export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  for (let t = 9; t < 11; t++) {
    let d = 0;
    for (let c = 0; c < t; c++) {
      d += Number(cpf[c]) * (t + 1 - c);
    }
    d = ((10 * d) % 11) % 10;
    if (Number(cpf[t]) !== d) return false;
  }
  return true;
}
