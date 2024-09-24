// import { Box, Container, List, ListItem, Typography } from '@mui/material';
// import React from 'react';
// import { alignItems, display, flexDirection } from 'styled-system';

// interface Menu {
//   id: number;
//   name: string;
//   slug: string;
//   child: Menu[];
// }

// interface Props {
//   menus: Menu[];
// }

// const MusicalInstruments: React.FC<Props> = ({ menus }: Props) => {
//   return (
//     <Container
//       maxWidth={'lg'}
//       sx={{ maxWidth: { xl: '83% !important', lg: '83%' } }}
//     >
//       <Box
//         sx={{

//           display: 'flex',
//           flexDirection: 'row',
//           flexWrap: 'wrap',
//           pl:2,
//           pt:3,
//           gap:"25px"

//         }}
//       >
//         {menus.map((category) => (
//           <div className="mega-menu-column" key={category.id}>
//             <Box sx={{display:"flex",flexDirection:"row",gap:1,alignItems:"center"}}>
//                 <Typography className="menu-parent">{category.name}</Typography>
//                 <img src="/images/menu/list_arrow.png" style={{width:"8px",height:"11px"}}/>
//             </Box>
//             {/* <ul>
//               {category.child.map((subcategory) => (
//                 <li key={subcategory.id}>{subcategory.name}</li>
//               ))}
//             </ul> */}
//             <List dense>
//               {category.child.map(( subcategory) => (
//                 <ListItem key={subcategory.id} className="menu-list-item">
//                   <Typography className="menu-list-item1">{subcategory.name}</Typography>
//                 </ListItem>
//               ))}
//             </List>
//           </div>
//         ))}
//       </Box>
//     </Container>
//   );
// };

// export default MusicalInstruments;

import ImageComponent from '@/utils/imageComponent';
import { Box, Container, List, ListItem } from '@mui/material';
import Link from 'next/link';
import React, { Fragment, useState } from 'react';

interface Menu {
  id: number;
  name: string;
  slug: string;
  child: Menu[];
}

interface Props {
  menus: Menu[];
  closeBox: () => void; // Add closeBox prop
  setSelected: any;
}

const MusicalInstruments: React.FC<Props> = ({
  menus,
  closeBox,
  setSelected,
}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryClick = (categoryId: number) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };
  // const [open, setOpen] = React.useState(true);

  // const handleClick = () => {
  //   setOpen(!open);
  // };
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  // const handleClick = (categoryId: number) => {
  //   setOpenCategory(openCategory === categoryId ? null : categoryId);
  // };
  const handleClick = (categoryId: number) => {
    if (openCategory === categoryId) {
      setOpenCategory(null);
    } else {
      setOpenCategory(categoryId);
    }
  };
  const handleSubMenu = () => {
    setSelected(null);
  };
  return (
    <Box
      sx={{
        overflowY: 'auto',
        height: '560px',
        // maxHeight: '560px',
        marginTop: '22px',
        paddingTop: '20px',
      }}
      onClick={(e) => {
        e.stopPropagation(); // Prevent the click event from propagating to the parent
        closeBox(); // Call the closeBox function from props
      }}
    >
      <Box>
        <Container
          maxWidth={'lg'}
          sx={{ maxWidth: { xl: '83% !important', lg: '83%' } }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              // justifyContent:"space-between",
              flexWrap: 'wrap',
              pl: 2,
              // pt: 5,
              gap: '15px',
              width: 'fit-content',
            }}
            className="d-md-flex d-none"
            onClick={(e) => e.stopPropagation()}
          >
            {menus.slice(0, 6).map((category) => (
              <div className="mega-menu-column" key={category.id}>
                <Link
                  href={`/buy/category/${category.slug}`}
                  onClick={() => handleSubMenu()}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 1,
                      alignItems: 'center',
                    }}
                  >
                    <p className="menu-parent">{category.name}</p>
                    {/* <img
                    src="/images/menu/list_arrow.png"
                    style={{ width: '8px', height: '11px' }}
                  /> */}
                    <ImageComponent
                      src="/images/menu/list_arrow.png"
                      width={7}
                      height={11}
                      alt="arrow"
                      priority={true}
                      className="arrow-section"
                    />
                  </Box>
                </Link>
                <List dense>
                  {category.child.map((subcategory: any) => (
                    <Link
                      href={`/buy/category/${category?.slug}/${subcategory?.slug}`}
                      key={subcategory.id}
                      onClick={() => handleSubMenu()}
                    >
                      <ListItem className="menu-list-item">
                        <p className="menu-list-item1">{subcategory.name}</p>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </div>
            ))}

            <div className="mega-menu-column1 menu-column">
              <List dense>
                {menus.slice(6).map((category) => (
                  <Fragment key={category.slug}>
                    {' '}
                    <ListItem className="menu-list-item">
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 1,
                          alignItems: 'center',
                          marginTop: '-3px',
                        }}
                      >
                        <Link
                          href={`/buy/category/${category.slug}`}
                          key={category.id}
                          onClick={() => handleSubMenu()}
                        >
                          {' '}
                          <p className="menu-parent">{category.name}</p>
                        </Link>

                        <div
                          onClick={() => {
                            handleClick(category.id);
                          }}
                        >
                          <ImageComponent
                            src="/images/menu/list_arrow.png"
                            width={7}
                            height={11}
                            alt="arrow"
                            priority={true}
                            className="arrow-section"
                            onClick={() => handleCategoryClick(category.id)}
                          />
                          {/* <img
                          src="/images/menu/list_arrow.png"
                          style={{ width: '8px', height: '11px' }}
                        /> */}
                        </div>
                      </Box>
                    </ListItem>
                    {/* <Collapse in={open} timeout="auto" unmountOnExit>
                  <div className="menu-listcategory">
                    {category.child.map((subcategory: any) => (
                      <Link
                        href={`/category/${category?.slug}/${subcategory?.slug}`}
                        key={subcategory.id}
                      >
                        <ListItem className="menu-list-item">
                          <Typography className="menu-list-item1">
                            {subcategory.name}
                          </Typography>
                        </ListItem>
                      </Link>
                    ))}
                  </div>
                </Collapse> */}
                    {openCategory === category.id && (
                      <List
                        dense
                        className="text-overfolw"
                        onClick={() => handleSubMenu()}
                      >
                        {category.child.map((subcategory: any) => (
                          <Link
                            href={`/buy/category/${category.slug}/${subcategory.slug}`}
                            key={subcategory.id}
                          >
                            <ListItem className="menu-list-item">
                              <p className="menu-list-item1 ">
                                {subcategory.name}
                              </p>
                            </ListItem>
                          </Link>
                        ))}
                      </List>
                    )}
                  </Fragment>
                ))}
              </List>
            </div>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MusicalInstruments;
//   <div className="mega-menu-column" key={category.id}>
//     <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
//       <Typography className="menu-parent">{category.name}</Typography>
//       <img src="/images/menu/list_arrow.png" style={{ width: '8px', height: '11px' }} />
//     </Box>
//   </div>
