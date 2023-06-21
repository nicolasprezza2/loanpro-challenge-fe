export const maskDate = (rawDate) => {
    const date = new Date(rawDate);
    let parsedDate = "";
    parsedDate += date.getHours();
    parsedDate += ":"
    parsedDate += date.getMinutes();
    parsedDate += " "
    parsedDate += date.getDate();
    parsedDate += "/";
    parsedDate += date.getMonth() ;     
    parsedDate += "/";
    parsedDate += date.getFullYear();
    return parsedDate;
}