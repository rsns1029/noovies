export const makeImgPath = (img: string, width: string = "w500") =>
  `https://image.tmdb.org/t/p/${width}${img}`;

// export const lengthSampling = (sen: string, len: number) => {
//   return sen.slice(0, len) + (sen.length > 3 ? "..." : null);
// };
