export function getFileNameFromPath(path) {
  const parts = path.split("\\");
  return parts[parts.length - 1];
}
export function calculateDiscount(mrp, sellingPrice) {
  const discountAmount = mrp - sellingPrice;
  const discountPercentage = (discountAmount / mrp) * 100;
  return Math.floor(discountPercentage);
}
