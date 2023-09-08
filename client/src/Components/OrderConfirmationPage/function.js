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
  const formattedNum = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);

  return formattedNum;
};
