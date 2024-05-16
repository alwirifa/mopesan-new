export const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  };
  
export const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
