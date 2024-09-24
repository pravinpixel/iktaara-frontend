// import { useDispatch } from 'react-redux';
// import { AppDispatch } from 'src/redux/store';
// import { fetchProduct } from 'src/redux/category-slice';
// import { Rating } from '@mui/material';
// import { makeQuery } from '@/lib/helper';
// const ratings = new Array(5).fill('& above').map((item, index) => {
//   return index === 4 ? index + 1 : `${index + 1} ${item}`;
// });

const RateFilter = () => {
  // const router = useRouter();
  // const [, setLoad] = useState(false);
  // // const defaultChecked = router.query['rating'];

  // useEffect(() => {
  //   router.events.on('routeChangeStart', () => setLoad(true));
  //   router.events.on('routeChangeComplete', () => setLoad(false));
  // }, [router]);

  return (
    <>
      {/* <div className="filter-box">
        <div className="title">Rating</div>
        {ratings.map((rating: any, index) => {
          return (
            <div
              className="filter-list my-2 d-flex gap-2 align-items-center cursor-pointer"
              role="button"
              key={index}
              onClick={(e) => {
                // fieldChange(item, 'price');
                const url: any =
                  process.env.NEXTAUTH_URL + router.asPath.split('?')?.[0] ??
                  '';
                const path: string | any = new URL(url);
                const query = {
                  ...router.query,
                  rating: index + 1,
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
            >
              <Rating
                value={index + 1}
                readOnly
                disabled={load}
                className={
                  String(index + 1) === defaultChecked ? 'active1' : ''
                }
              />{' '}
              <p
                className={
                  String(index + 1) === defaultChecked ? 'active1' : ''
                }
              >
                {rating}
              </p>
            </div>
          );
        })}
      </div> */}
    </>
  );
};

export default RateFilter;
