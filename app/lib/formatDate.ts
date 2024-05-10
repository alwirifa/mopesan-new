export const formatDate = (dateString: string | number | Date): string => {

    const date = new Date(dateString);
  
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    // Format tanggal sesuai dengan "2 May 2024"
    return `${day} ${monthNames[monthIndex]} ${year}`;
  };
  
  