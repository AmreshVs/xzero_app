export const getPosition = (index, categoriesLength, xPosition, selected) => {
  let position = 0;

  if (index > selected) {
    if ([categoriesLength - 1, categoriesLength - 2, categoriesLength - 3].includes(index)) {
      position = categoriesLength * 90;
    }
    else {
      position = index * 100;
    }
  }
  else {
    if ([0, 1, 2].includes(index)) {
      position = 0;
    }
    else if (index === categoriesLength - 3) {
      position = xPosition - 150;
    }
    else {
      position = xPosition - 100;
    }
  }

  return position;
}