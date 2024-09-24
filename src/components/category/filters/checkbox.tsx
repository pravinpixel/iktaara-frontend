import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Checkbox = ({
  filter,
  onCheckBoxChecked,
  name = '',
  // split = '_',
  defaultChecked,
  checked,
}: any) => {
  const router = useRouter();
  const [load, setLoad] = useState(false);
  const handleCheckBoxChecked = (e: any, slug: string, name: string) => {
    onCheckBoxChecked(e, slug, name);
  };
  // const defaultChecked = String(router.query[name])
  //   .split(split)
  //   .includes(filter?.slug);

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
        defaultValue={filter?.slug}
        defaultChecked={defaultChecked}
        disabled={load}
        onClick={(event) => {
          handleCheckBoxChecked(event, filter.slug, name);
        }}
        {...(checked && { checked })}
      />
    </>
  );
};

export default Checkbox;
