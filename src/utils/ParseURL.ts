export const parseParamsToArray = (params: string) => {
  const splitParams :string = params.split("+")[0];
  const arrParams: string[] = splitParams.split(" ");
  return arrParams;
}