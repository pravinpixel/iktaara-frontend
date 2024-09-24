import { useRouter } from 'next/router';
import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from 'src/redux/store';
import { makeQuery } from '@/lib/helper';
import { Box, Grid, Stack, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import { Modal } from 'react-bootstrap';
import Checkbox from './checkbox';
import FilterInputes from './inputs/filter-inputs';

interface Brand {
  brand_name: string;
  slug: string;
}

const BrandsFilter = (props: any) => {
  const { setCheckedBrand, checkedBrand } = props;
  const brands = props.props || [];
  const router = useRouter();
  const queryParams: any = router.query;

  const [, setPendingQuery] = useState(router.query);

  const [searchQuery, setSearchQuery] = useState('');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handlePopupClose = () => {
    setShow(false);
    setCheckedBrand((prevCheckedBrand: any) => {
      return prevCheckedBrand.filter((brand: any) =>
        queryParams.brand?.includes(brand),
      );
    });
  };

  // const handlePopupOpen = () => {
  //   setShow(true);
  //   setInitialCheckedBrand([...checkedBrand]);
  // };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAlphabetClick = (letter: string) => {
    setSearchQuery(letter);
  };

  const handleCancelIconClick = () => {
    setSearchQuery('');
    setShow(false);
    setCheckedBrand((prevCheckedBrand: any) => {
      return prevCheckedBrand.filter((brand: any) =>
        queryParams.brand?.includes(brand),
      );
    });
  };

  const handleCheckboxClick = (slug: string) => {
    if (!checkedBrand.includes(slug)) {
      setCheckedBrand([...checkedBrand, slug]);
    } else {
      setCheckedBrand(checkedBrand.filter((item: any) => item !== slug));
    }
  };

  const filterBrands = (query: string) => {
    return brands.filter((brand: Brand) =>
      brand.brand_name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  const groupBrandsByAlphabet = (brands: Brand[]) => {
    const groupedBrands: { [key: string]: any[] } = {};
    alphabet.forEach((letter) => {
      groupedBrands[letter] = brands.filter(
        (brand: Brand) => brand.brand_name.charAt(0).toUpperCase() === letter,
      );
    });
    return groupedBrands;
  };

  let filteredBrands = brands;

  if (searchQuery) {
    filteredBrands = filterBrands(searchQuery);
  }

  let orderedGroupedBrands = groupBrandsByAlphabet(filteredBrands);

  if (searchQuery && alphabet.includes(searchQuery.toUpperCase())) {
    const searchedLetter = searchQuery.toUpperCase();
    const searchedBrands = orderedGroupedBrands[searchedLetter];
    delete orderedGroupedBrands[searchedLetter];
    orderedGroupedBrands = {
      [searchedLetter]: searchedBrands,
      ...orderedGroupedBrands,
    };
  }

  const brandsInColumns = Object.keys(orderedGroupedBrands).map((letter) => {
    const chunkedBrands = [];
    const letterBrands = orderedGroupedBrands[letter];
    for (let i = 0; i < letterBrands.length; i += 3) {
      chunkedBrands.push(letterBrands.slice(i, i + 3));
    }
    return { letter, brands: chunkedBrands };
  });

  const handleSubmit = () => {
    const filteredBrands = brands.filter((brand: Brand) =>
      checkedBrand.includes(brand.slug),
    );
    const filteredBrandSlugs = filteredBrands.map((brand: Brand) => brand.slug);
    const uniqueFilteredBrandSlugs = [...new Set(filteredBrandSlugs)];
    const updatedQuery = {
      ...router.query,
      brand: uniqueFilteredBrandSlugs.join('_'),
    };
    setPendingQuery(updatedQuery);
    router.push({ query: updatedQuery }, undefined, { scroll: false });
    setShow(false);
    setSearchQuery('');
  };

  return (
    <>
      <div className="filter-box">
        <div className="title">Brands</div>
        <div className="filter-list">
          {brands.slice(0, 5).map((filter: Brand, index: number) => {
            return (
              <div
                className="form-check pt-2 form-brands-main"
                key={index}
                style={{ display: 'flex', gap: '10px', fontSize: '18px' }}
              >
                <FilterInputes
                  key={index}
                  filter={filter}
                  name="brand"
                  className="discount-border"
                  id={`brand-${filter.slug}`}
                  checked={checkedBrand?.includes(filter.slug)}
                  onCheckBoxChecked={(e: any, slug: any, name = '') => {
                    handleCheckboxClick(slug);
                    router.push(
                      {
                        query: makeQuery(
                          router?.query?.[name] ?? null,
                          e.target.checked,
                          slug,
                          { ...router.query, page: 1 },
                          name,
                        ),
                      },
                      undefined,
                      {
                        scroll: true,
                      },
                    );
                  }}
                />
                <label
                  className="form-check-label-checkbox"
                  htmlFor={`brand-${filter.slug}`}
                >
                  {filter.brand_name}
                </label>
              </div>
            );
          })}
          {brands.length > 5 && (
            <div className="pt-2">
              <div className="view-all-link" onClick={handleShow}>
                View All
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        size="lg"
        show={show}
        onHide={handleCancelIconClick}
        centered
        className="dialog-sizing"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="brands-viewall">Brands</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                size="small"
                placeholder="Search by brand name"
                variant="outlined"
                className="filter-search-bar"
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
                fullWidth
                InputProps={{
                  startAdornment: (
                    <IconButton>
                      <Image
                        src="/icons/search-icons.png"
                        alt="serach_icon"
                        width={20}
                        height={20}
                      />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <div className="popup-brand-alphabet">
                {alphabet.map((letter, index) => (
                  <Box
                    key={index}
                    component="div"
                    onClick={() => handleAlphabetClick(letter)}
                  >
                    <p className="font-letter">{letter}</p>
                  </Box>
                ))}
              </div>
            </Grid>
            <div className="alphabet-media">
              {alphabet.map((letter, index) => (
                <Stack
                  key={index}
                  direction={{ xs: 'row' }}
                  sx={{ display: { xs: 'flex', sm: 'none' } }}
                >
                  <Box
                    className="popup-brand-alphabet"
                    onClick={() => handleAlphabetClick(letter)}
                    mt={1}
                  >
                    <p className="font-letter">{letter}</p>
                  </Box>
                </Stack>
              ))}
            </div>
            <Grid item xs={12}>
              {brandsInColumns.map((group, index) => (
                <div key={index}>
                  {group.brands.length > 0 && !searchQuery && index !== 0 && (
                    <hr className="horizontal-line" />
                  )}
                  {group.brands.length > 0 && (
                    <div className="popup-view-all">
                      {group.brands.map((chunk, idx) => (
                        <Grid container spacing={{ xs: 0, md: 2 }} key={idx}>
                          {chunk.map((brandItem, i) => (
                            <Grid item xs={12} sm={4} md={4} key={i}>
                              <div
                                className="form-check pt-2 form-brands-main"
                                style={{
                                  display: 'flex',
                                  gap: '10px',
                                  position: 'relative',
                                  zIndex: 10,
                                  fontSize: '18px',
                                }}
                              >
                                <Checkbox
                                  filter={brandItem}
                                  name="brand"
                                  id={`brand-${brandItem.slug}`}
                                  defaultChecked={
                                    queryParams.brand?.includes(
                                      brandItem.slug,
                                    ) || checkedBrand?.includes(brandItem.slug)
                                  }
                                  checked={checkedBrand?.includes(
                                    brandItem.slug,
                                  )}
                                  key={Math.random()}
                                  onCheckBoxChecked={(e: any, slug: any) => {
                                    handleCheckboxClick(slug);
                                  }}
                                />

                                <label
                                  className="form-check-label-checkbox"
                                  htmlFor={`brand-${brandItem.slug}`}
                                >
                                  {brandItem.brand_name}
                                </label>
                              </div>
                            </Grid>
                          ))}
                        </Grid>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </Grid>
          </Grid>
        </Modal.Body>
        <div className="action-button">
          <div className="filter-portion-selected">
            <span> {checkedBrand ? checkedBrand.length : 0} &nbsp;Brands</span>
            <span>Selected</span>
          </div>
          <div className="button-container">
            <button onClick={handlePopupClose} className="view-all-cancel">
              Cancel
            </button>
            <button className="view-all-submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BrandsFilter;
