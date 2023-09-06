export const truncateName = (name) => {
  if (name.length > 15) {
    return name.slice(0, 20) + "...";
  }
  return name;
};

export const calculateTotal = (products) => {
  let total = 0;
  products.forEach((item) => {
    total += item.product.price * item.count;
  });
  return Number(total);
};
export const toIndianCurrency = (num) => {
  const curr = parseFloat(num).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
  return curr;
};
