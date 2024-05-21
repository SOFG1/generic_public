import { IUserInfo } from "../store/user/types";

export const getElectionMeanCoords = (points: any[], userInfo: IUserInfo | null) => {
    const length = points.length;
    let coords: [number, number] = points.reduce(
      (prev: any, current: any) => {
        return [prev[0] + current.lng, prev[1] + current.lat];
      },
      [0, 0]
    );
    coords = [coords[0] / length, coords[1] / length];
    if (isNaN(coords[0]) || isNaN(coords[1])) {
      return [
        parseInt(userInfo?.group?.country?.lng.toString() || "", 10),
        parseInt(userInfo?.group?.country?.lat.toString() || "", 10),
      ];
    }
    return coords; 
}