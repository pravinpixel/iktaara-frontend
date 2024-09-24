import { toast } from 'react-toastify';

export function errorMessage(error: any) {
  for (const data of Object.entries(error.message)) {
    const errorMsg: any = data[1];
    toast.error(errorMsg[0]);
  }
}

export function makeQuery(
  array: any,
  checked?: boolean,
  slug?: string,
  query?: any,
  name?: any,
  split = '_',
) {
  if (!checked) {
    const filterData =
      array
        ?.split(split)
        ?.filter((brand: any) => {
          return brand !== slug;
        })
        ?.join(split) ?? null;
    filterData === '' ? delete query[name] : (query[name] = filterData);
  } else {
    let filterDatas: any = [];
    if (!array) {
      filterDatas.push(slug);
    } else {
      filterDatas = [...new Set([...array.split(split), slug])]?.join(split);
    }
    query[name] = filterDatas;
  }
  return query;
}
