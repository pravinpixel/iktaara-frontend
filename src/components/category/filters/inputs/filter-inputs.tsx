import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const FilterInputes = ({
  filter,
  onCheckBoxChecked,
  name = '',
  split = '_',
}: any) => {
  const router = useRouter();
  const [load, setLoad] = useState(false);
  const handleCheckBoxChecked = (e: any, slug: string, name: string) => {
    onCheckBoxChecked(e, slug, name);
  };
  const defaultChecked = String(router.query[name])
    .split(split)
    .includes(filter?.slug);

  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoad(true));
    router.events.on('routeChangeComplete', () => setLoad(false));
  }, [router]);
  return (
    <>
      <input
        className="form-check-input"
        name={name}
        type="checkbox"
        checked={defaultChecked}
        // checked={defaultChecked}
        defaultValue={filter?.slug}
        disabled={load}
        onClick={(event) => {
          handleCheckBoxChecked(event, filter.slug, name);
        }}
      />
    </>
  );
};

export default FilterInputes;
