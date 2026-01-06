export function formatMoneyBR(value: number): string {
  const abs = Math.abs(value);

  const formatted = abs.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatted;
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

export function formatDateTimeBR(value: string) {
  return new Date(value).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}
