const priceFormat = (number) => {
    const numberString = number.toString();
    const parts = [];
    let i = numberString.length;

    while (i > 0) {
      parts.unshift(numberString.substring(i - 3, i));
      i -= 3;
    }

    const formatted = parts.join(".");
    return formatted;
};

export default priceFormat;
