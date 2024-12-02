const generateInvoiceId = () => {
  const id = `INV-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  return id;
};

export default generateInvoiceId;
