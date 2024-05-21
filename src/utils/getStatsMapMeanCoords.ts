import { IMapLevel, IMapPoint } from "../store/smStats";
import { IUserInfo } from "../store/user/types";

export const getStatsMapMeanCoords = (
  mapPoints: IMapPoint[],
  mapLevel: IMapLevel[],
  userInfo: IUserInfo| null,
): [number, number] => {
  let coords: [number, number] = [0, 0];
  coords = mapPoints.reduce((prev, current, index) => {
    const lng =
      typeof current.lng === "string"
        ? parseInt(current.lng, 10)
        : prev[0] / index;
    const lat =
      typeof current.lat === "string"
        ? parseInt(current.lat, 10)
        : prev[1] / index;
    return [prev[0] + lng, prev[1] + lat];
  }, coords);
  coords = Array.isArray(mapLevel)
    ? mapLevel.reduce((prev, current) => {
        return [prev[0] + current.lng, prev[1] + current.lat];
      }, coords)
    : coords;
  const allLength = mapPoints.length + mapLevel.length;
  const mean = (coords = [coords[0] / allLength, coords[1] / allLength]);

  if (isNaN(coords[0]) || isNaN(coords[1])) {
    return [
      userInfo?.group?.country?.lng || 0,
      userInfo?.group?.country?.lat || 0,
    ];
  }
  return mean;
};
