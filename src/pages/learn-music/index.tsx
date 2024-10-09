import dynamic from 'next/dynamic';

const Score = dynamic(() => import('@/components/score'), {
  ssr: false,
});
const Header = dynamic(() => import('@/components/common/header/Header'));

interface BookType {
  [key: string]: {
    label: string;
    value: string;
  }[];
}

export type LearnScoreType = {
  books: BookType;
};

const Learn = ({ books }: LearnScoreType) => {
  return (
    <>
      <Header show={false} />
      <Score books={books} />
    </>
  );
};
export default Learn;

export const getServerSideProps = () => {
  const books = {
    Book1: [
      {
        label: 'Chapter 1',
        value: '/music/Canon_in_D.mxl',
      },
      {
        label: 'Chapter 2',
        value: '/music/Telemann.mxl',
      },
      {
        label: 'Chapter 3',
        value: '/music/Binchois.mxl',
      },
    ],
    Book2: [
      {
        label: 'Chapter 4',
        value: '/music/MozartPianoSonata.mxl',
      },
      {
        label: 'Chapter 5',
        value: '/music/Saltarello.mxl',
      },
    ],
    Book3: [
      {
        label: 'Chapter 7',
        value: '/music/Canon_in_D.mxl',
      },
      {
        label: 'Chapter 8',
        value: '/music/Echigo-Jishi.mxl',
      },
    ],
    // Book2: [
    //   {
    //     label: 'Chapter 4',
    //     value: '/music/BrahWiMeSample.mxl',
    //   },
    //   {
    //     label: 'Chapter 5',
    //     value: '/music/BrookeWestSample.mxl',
    //   },
    //   {
    //     label: 'Chapter 6',
    //     value: '/music/DebuMandSample.mxl',
    //   },
    // ],

    // Book3: [
    //   {
    //     label: 'Chapter 7',
    //     value: '/music/Dichterliebe01.mxl',
    //   },
    //   {
    //     label: 'Chapter 8',
    //     value: '/music/Echigo-Jishi.mxl',
    //   },
    //   {
    //     label: 'Chapter 6',
    //     value: '/music/FaurReveSample.mxl',
    //   },
    // ],
  };
  return {
    props: {
      books,
    },
  };
};
