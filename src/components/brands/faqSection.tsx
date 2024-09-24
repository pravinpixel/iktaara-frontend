import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const BrandsFaqSection = (data: any) => {
  const [expanded, setExpanded] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const numberOfFAQsToShow = showAll ? data?.data?.faq_content?.length : 5;

  const handleAccordionChange =
    (panel: any) => (_event: any, isExpanded: any) => {
      setExpanded(isExpanded ? panel : false);
    };

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setExpanded(0);
  };

  return (
    <>
      {data?.data?.faq_content?.length > 0 && (
        <Grid container spacing={2} my={2}>
          <Grid item xs={0} md={4}>
            <Box
              sx={{
                position: 'relative',
                aspectRatio: 1.22,
                objectFit: 'contain',
              }}
            >
              <Image src="/images/demo/static/faq-brands1.jpg" fill alt="faq" />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h5 className="brands-faq-title">Frequently Asked Questions</h5>
              </Grid>
              <Grid item xs={12} md={12} className="faq-accordin">
                {data?.data?.faq_content
                  ?.slice(0, numberOfFAQsToShow)
                  .map((item: any, index: any) => (
                    <Accordion
                      sx={{ mb: 2 }}
                      expanded={expanded === index}
                      onChange={handleAccordionChange(index)}
                      key={item.id}
                      className={
                        expanded === index
                          ? 'selected-accordion'
                          : 'unselected-accordion'
                      }
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        className="accordions-selected"
                      >
                        <Typography className="brands-faq-head">
                          {item.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography className="brands-faq-head-sub">
                          {item.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                <Grid
                  item
                  xs={12}
                  md={12}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  {data?.data?.faq_content?.length > 5 && (
                    <button
                      className="show-all-toggle-button"
                      onClick={toggleShowAll}
                      // variant="outlined"
                    >
                      {showAll ? 'View Less' : 'Load More'}
                    </button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default BrandsFaqSection;
