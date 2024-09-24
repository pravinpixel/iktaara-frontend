import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const data = {
  title: 'FAQ',
};

export default function FaqSection({ faq }: any) {
  const [showMore, setShowMore] = useState(false);
  const visibleQuestions = showMore ? faq : faq.slice(0, 5);

  const loadMore = () => {
    setShowMore(!showMore);
  };

  if (faq.length < 1) {
    return null;
  }
  return (
    <>
      {/* <h3 className="faq">FAQ</h3>
      <div dangerouslySetInnerHTML={{ __html: faq }}></div> */}

      <div className="realatedProdHead ">
        <h3 className="faq-title text-center">{data.title}</h3>
      </div>
      <div className="faq-container">
        {visibleQuestions.map((value: any, index: number) => {
          return (
            <details key={index}>
              <summary>{value.question}</summary>
              <div>{value.answer}</div>
            </details>
          );
        })}
        {faq?.length > 5 && (
          <div className="text-center ">
            <Button onClick={loadMore} className="mt-2 view-more-style">
              {!showMore ? 'View More' : 'Show Less'}
            </Button>
          </div>
        )}
        {/* {!showMore && faq?.length >= 5 && (
          <div className="text-center ">
            <Button onClick={loadMore} className="mt-2 view-more-style">
              View More
            </Button>
          </div>
        )} */}
      </div>
    </>
  );
}
