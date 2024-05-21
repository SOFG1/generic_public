import { IMapLevel } from "../store/smStats";

export const convertStatsMapLevel = (mapLevel: IMapLevel[]) => {
  const maxSize = Math.max(...mapLevel.map(p => p.city_size))
  const onePercentSize = maxSize / 100

  const maxScore = Math.max(...mapLevel.map(p => p.city_score))
  const onePercentScore = maxScore / 100

  return mapLevel
    .map((level, i) => {
      if (
        level.lng !== null &&
        level.lat !== null &&
        level.city_score !== null
      ) {
        const sizeInPercents = level.city_size / onePercentSize
        const size = sizeInPercents / 100 //Must be from 0 to 1
        return {
          ...level,
          _size: size
        };
      }
    })
    .filter((level) => level);
};
