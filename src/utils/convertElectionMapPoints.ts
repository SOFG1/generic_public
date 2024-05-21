export const convertElectionMapPoints = (points: any[]) => {



  const redPoints = points.filter(
    (point) => point.pin_color < 0.3
  );

  const yellowPoints = points.filter(
    (point) =>
      point.pin_color >= 0.3 &&
      point.pin_color <= 0.7
  )

  const bluePoints = points.filter(
    (point) => point.pin_color > 0.7
  )


  return {
    redPoints,
    yellowPoints,
    bluePoints
  }
};
