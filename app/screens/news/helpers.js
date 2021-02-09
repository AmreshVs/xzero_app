export const getPosition = (index, categoriesLength, xPosition, selected, id) => {
  let position = 0;

  if (id > selected) {
    if (index === categoriesLength - 1) {
      position = index * 90;
    }
    else {
      position = index * 100;
    }
  }
  else {
    if (index === 0) {
      position = 0;
    }
    else {
      position = xPosition - 130;
    }
  }

  return position;
}