// import Link from 'next/link';
import { useRouter } from 'next/router';
// import { loadMore } from 'src/redux/category-slice';
import { Typography } from '@mui/material';
import Image from 'next/image';
// import { Pagination } from '@mui/material';

const LoaderMenu = ({ from, to, total_count }: any) => {
  const router = useRouter();

  const handleLoadMore = () => {
    router.push(
      {
        query: {
          ...router.query,
          page: Number(router?.query?.page ?? 1) + 1,
        },
      },
      undefined,
      {
        scroll: true,
      },
    );
  };

  const handleLoadLess = () => {
    router.push(
      {
        query: {
          ...router.query,
          page: Number(router?.query?.page ?? 1) - 1,
        },
      },
      undefined,
      {
        scroll: true,
      },
    );
  };

  const handleGoToFirstPage = () => {
    router.push(
      {
        query: {
          ...router.query,
          page: 1,
        },
      },
      undefined,
      {
        scroll: true,
      },
    );
  };

  const handleGoToLastPage = () => {
    const itemsPerPage = to - from + 1;
    const totalPages = Math.ceil(total_count / itemsPerPage);
    let lastPage;
    if (total_count % itemsPerPage === 0) {
      lastPage = totalPages - 1;
    } else {
      lastPage = totalPages;
    }

    router.push(
      {
        query: {
          ...router.query,
          page: lastPage,
        },
      },
      undefined,
      {
        scroll: true,
      },
    );
  };
  const isLastPage = to === total_count;
  return (
    <>
      <div className="col-12 text-center mt-2">
        <div className="pagination-text">
          {total_count > 24 && (
            <>
              <Image
                src="/images/collections/static/Group 1171277073 (1).png"
                alt="loader_1"
                width="14"
                height="14"
                className="paginatiion-first"
                onClick={handleGoToFirstPage}
              />
              <Image
                onClick={handleLoadLess}
                src="/images/collections/static/Vector 95.png"
                alt="loader_2"
                width="12"
                height="13"
                className="left-arrow-icon"
              />
              <Typography
                sx={{ pr: 1 }}
                onClick={handleLoadLess}
                className="prev-text-icon"
              >
                Prev
              </Typography>
            </>
          )}

          <span className="text-field-icon1">
            {from} to {to}
          </span>
          <span className="text-field-icon2">of</span>
          <span className="text-field-icon3">{total_count}</span>

          {!isLastPage ? (
            <>
              <Typography className="prev-text-icon" onClick={handleLoadMore}>
                Next
              </Typography>
              <Image
                onClick={handleLoadMore}
                src="/images/collections/static/Vector 93.png"
                alt="loader_3"
                width="12"
                height="13"
                className="left-arrow-icon1"
              />
              <Image
                src="/images/collections/static/Group 1171277072.png"
                alt="loader_4"
                width="14"
                height="14"
                className="paginatiion-last"
                onClick={handleGoToLastPage}
              />
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default LoaderMenu;
