import { IMapPoint } from "../store/smStats";

export const convertStatsMapPoints = (mapPoints: IMapPoint[]) => {
  const maxSize = Math.max(...mapPoints.map(p => p.size))
  const onePercent = maxSize / 100

  const maxPer = Math.max(...mapPoints.map(p => p.per))
  const onePercentPer = maxPer / 100


  const allPoints = [];
  for (const mapPoint of mapPoints) {
    if (mapPoint.lat === null || mapPoint.lng === null) continue;
    const sizeInPercents = mapPoint.size / onePercent
    const size = sizeInPercents / 100 //Must be from 0 to 100

    const perInPercents = mapPoint.per / onePercentPer
    const per = perInPercents / 100 //Must be from 0 to 1


    allPoints.push({
      lng: parseFloat(mapPoint.lng),
      lat: parseFloat(mapPoint.lat),
      size,
      per,
    });
  }

  const smallRed = allPoints.filter(
    (item) => item.per == 10 && item.size <= 0.5
  );

  const bigRed = allPoints.filter((item) => item.per == 10 && item.size > 0.5);

  const smallYellow = allPoints.filter(
    (item) => item.per == 5 && item.size <= 0.5
  );

  const bigYellow = allPoints.filter(
    (item) => item.per == 5 && item.size > 0.5
  );

  const smallBlue = allPoints.filter(
    (item) => item.per == 1 && item.size <= 0.5
  );

  const bigBlue = allPoints.filter((item) => item.per == 1 && item.size > 0.5);

  return {
    smallRed,
    bigRed,
    smallYellow,
    bigYellow,
    smallBlue,
    bigBlue,
  };
};
