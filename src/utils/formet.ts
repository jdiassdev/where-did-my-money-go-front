export function formatMoneyBR(value: number): string {
  if (!Number.isFinite(value)) return "0,00";

  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function parseMoneyBR(value: string): number {
  if (!value) return 0;
  const normalized = value
    .replace(/\s/g, "") // remove espaços
    .replace(/\./g, "") // remove milhares
    .replace(",", "."); // decimal pt-BR → padrão
  const result = Number(normalized);
  return Number.isFinite(result) ? result : 0;
}
