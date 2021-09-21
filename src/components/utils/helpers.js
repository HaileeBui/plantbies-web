export const customizedString = string => {
  const array = string.split(" ");
  for (var i = 0; i < array.length; i++) {
    array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
    return array.join(" ");
  }
}