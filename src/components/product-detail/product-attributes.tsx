// import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { Fragment } from 'react';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { Table } from 'react-bootstrap';

const AttributeItems = (props: any) => {
  const { elements } = props;
  return (
    <>
      <td className="element-title ">{elements.title}</td>
      <td className="element-value">{elements.value}</td>
    </>
  );
};

const ProductAttributes = (props: any) => {
  const { attributes } = props;
  return (
    <Fragment key={attributes.id}>
      {' '}
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel-${attributes.id}-content`}
          id={`panel-${attributes.id}-header`}
          style={{ backgroundColor: '#d4d9df', paddingBlock: '0px' }}
          className="collapse-accordion"
        > */}
      <tr className="table-heading-portion">
        <td className="table-td-line" colSpan={2}>
          {attributes.title}
        </td>
      </tr>
      {/* </AccordionSummary>
        <AccordionDetails> */}
      {/* <Table className="">
            <tbody> */}
      {attributes.child == 0
        ? ''
        : attributes.child.map((elements: any) => {
            return (
              <Fragment key={`${elements.id}`}>
                <tr className="table-border-color-portion ">
                  <AttributeItems
                    elements={elements}
                    key={`attribute-${elements.id}`}
                  ></AttributeItems>
                </tr>
              </Fragment>
            );
          })}
      {/* </tbody>
          </Table> */}
      {/* </AccordionDetails>
      </Accordion> */}
    </Fragment>
  );
};

export default ProductAttributes;
