export const validatePropositionName = (name: string): string | null => {
  if (!name || name.trim().length === 0) {
    return "Name is required";
  }
  if (name.length < 3) {
    return "Name must be at least 3 characters";
  }
  if (name.length > 100) {
    return "Name must not exceed 100 characters";
  }
  return null;
};

export const validateBasePremium = (
  premium: number | string,
): string | null => {
  const value = typeof premium === "string" ? parseFloat(premium) : premium;

  if (isNaN(value)) {
    return "Premium must be a valid number";
  }
  if (value <= 0) {
    return "Premium must be greater than 0";
  }
  if (value > 1000000) {
    return "Premium seems unusually high";
  }
  return null;
};
