import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Radio } from '@mui/material';

const priceFilter = [
  {
    id: 1,
    name: '500 - 1000',
    min: 500,
    max: 1000,
  },
  {
    id: 2,
    name: '1000 - 5000',
    min: 1000,
    max: 5000,
  },
  {
    id: 3,
    name: '5000 - 25000',
    min: 5000,
    max: 25000,
  },
  {
    id: 4,
    name: '25000 - 1000000',
    min: 25000,
    max: 1000000,
  },
  {
    id: 5,
    name: '1000000 - above',
    min: 1000000,
    max: 10000000,
  },
];

const PriceFilter = () => {
  const router = useRouter();
  const [load, setLoad] = useState(false);
  const [, setPrice] = useState(null);
  const price_id: any = router.query['price_id'] || '';
  const defaultChecked: any = (id: any) => {
    if (String(price_id) === String(id)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoad(true));
    router.events.on('routeChangeComplete', () => setLoad(false));
  }, [router]);
  return (
    <>
      <div className="filter-box">
        <div className="title">Price</div>
        <div className="filter-list my-1">
          {priceFilter.map((item: any) => {
            return (
              <div className="form-check py-1 dalivery-standard" key={item.id}>
                <Radio
                  className="form-check-input"
                  checked={defaultChecked(item.id)}
                  value={item.id}
                  disabled={load}
                  onChange={() => {
                    setPrice(item.id);
                    // fieldChange(item, 'price');
                    const url: any =
                      process.env.NEXTAUTH_URL +
                        router.asPath.split('?')?.[0] ?? '';
                    const path: string | any = new URL(url);
                    const query = {
                      ...router.query,
                      minimum_price: item.min,
                      maximum_price: item.max,
                      price_id: item.id,
                      page: 1,
                    };
                    router.push(
                      {
                        href: path,
                        query: query,
                      },
                      undefined,
                      {
                        scroll: false,
                      },
                    );
                  }}
                />
                {/* <input
                  className="form-check-input"
                  type="radio"
                  name="price-filter"
                  checked={defaultChecked(item.id)}
                  value={item.id}
                  disabled={load}
                  onChange={() => {
                    setPrice(item.id);
                    // fieldChange(item, 'price');
                    const url: any =
                      process.env.NEXTAUTH_URL +
                        router.asPath.split('?')?.[0] ?? '';
                    const path: string | any = new URL(url);
                    const query = {
                      ...router.query,
                      minimum_price: item.min,
                      maximum_price: item.max,
                      price_id: item.id,
                    };
                    router.push(
                      {
                        href: path,
                        query: query,
                      },
                      undefined,
                      {
                        scroll: false,
                      },
                    );
                  }}
                 
                /> */}
                <label
                  className="form-check-label-checkbox"
                  htmlFor="flexCheckDefault"
                >
                  ₹{item.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PriceFilter;
