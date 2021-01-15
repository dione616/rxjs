export const transformTime = (timeToTransform) => {
  const seconds =
    Math.floor((timeToTransform / 1000) % 60) < 10
      ? `0${Math.floor((timeToTransform / 1000) % 60)}`
      : Math.floor((timeToTransform / 1000) % 60);
  const minutes =
    Math.floor((timeToTransform / 1000 / 60) % 60) < 10
      ? `0${Math.floor((timeToTransform / 1000 / 60) % 60)}`
      : Math.floor((timeToTransform / 1000 / 60) % 60);
  const hours =
    Math.floor((timeToTransform / 1000 / 60 / 60) % 24) < 10
      ? `0${Math.floor((timeToTransform / 1000 / 60 / 60) % 24)}`
      : Math.floor((timeToTransform / 1000 / 60 / 60) % 24);

  const time = `${hours}:${minutes}:${seconds}`;
  return time;
};
