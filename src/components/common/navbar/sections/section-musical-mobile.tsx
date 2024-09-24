import ImageComponent from '@/utils/imageComponent';
import { Box, Container, List, ListItem } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';

interface Menu {
  id: number;
  name: string;
  slug: string;
  child: Menu[];
}

interface Props {
  menus: Menu[];
  onCloseAccordion: () => void; // Add closeBox prop
  setShowOffcanvas: any;
}

const MusicalInstrumentsMobile: React.FC<Props> = ({
  menus,
  setShowOffcanvas,
}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleClose = () => {
    setShowOffcanvas(false);
  };
  const handleCategoryClick = (categoryId: number) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
    // setShowOffcanvas(false);
  };

  // const handleClick = (categorySlug: any) => {};
  return (
    <Container
      maxWidth={'lg'}
      sx={{ maxWidth: { xl: '83% !important', lg: '83%' } }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          ml: '-18px',
          gap: '11px',
        }}
      >
        {menus.map((category) => (
          <div className="mega-menu-column" key={category.id}>
            {' '}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
                alignItems: 'center',
                width: 'fit-content',
              }}
              className="mega-menu-mobile"
              // onClick={() => handleClick(category.slug)}
            >
              <Link
                href={`/buy/category/${category.slug}`}
                onClick={() => {
                  handleClose();
                }}
              >
                {' '}
                <p className="menu-parent">{category.name}</p>
              </Link>

              <div onClick={() => handleCategoryClick(category.id)}>
                <ImageComponent
                  src="/images/menu/list_arrow.png"
                  width={7}
                  height={11}
                  alt="arrow"
                  priority={true}
                  className="arrow-section"
                />
              </div>
            </Box>
            {selectedCategory === category.id && (
              <List dense>
                {category.child.map((subcategory) => (
                  <Link
                    href={`/buy/category/${category?.slug}/${subcategory?.slug}`}
                    key={subcategory.id}
                  >
                    <ListItem
                      className="menu-list-item"
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <p className="menu-list-item1">{subcategory.name}</p>
                    </ListItem>
                  </Link>
                ))}
              </List>
            )}
            {/* <List dense>
              {category.child.map((subcategory) => (
                <ListItem key={subcategory.id} className="menu-list-item">
                  <Typography className="menu-list-item1">{subcategory.name}</Typography>
                </ListItem>
              ))}
            </List> */}
          </div>
        ))}

        {/* <div className="mega-menu-column1">
          <List dense>
            {menus.slice(6).map((category) => (
              <ListItem key={category.id} className="menu-list-item">
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
              <Typography className="menu-parent">{category.name}</Typography>
              <img src="/images/menu/list_arrow.png" style={{ width: '8px', height: '11px' }} />
            </Box>
              </ListItem>
            ))}
          </List>
        </div> */}
      </Box>
    </Container>
  );
};

export default MusicalInstrumentsMobile;
//   <div className="mega-menu-column" key={category.id}>
//     <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
//       <Typography className="menu-parent">{category.name}</Typography>
//       <img src="/images/menu/list_arrow.png" style={{ width: '8px', height: '11px' }} />
//     </Box>
//   </div>
