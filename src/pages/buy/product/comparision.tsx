import LatestArrivalProductThumb from '@/components/home/products/latest-arrival-thumb';
import ProductLayout from '@/theme/layouts/ProductLayout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const ProductComparision = () => {
  const router = useRouter();
  const [datas, setDatas] = useState<any>([]);
  const [productNames, setProductNames] = useState<any>([]);
  const [tableHead, setTableHead] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  useEffect(() => {
    if (typeof window != 'undefined') {
      const mapProduct: any = [];
      const names: any = [];
      const keys: any = [];
      const catgeorySlug: any = router?.query?.category;
      if (catgeorySlug) {
        let products: any = localStorage.getItem(`${catgeorySlug}`) || '[]';
        products = JSON.parse(products);
        products?.forEach((prod: any, prodIndex: number) => {
          names?.push(prod.product_name);
          prod?.attributes.forEach((attribute: any) => {
            attribute?.child?.forEach((child: any) => {
              mapProduct[prodIndex] = {
                // ...mapProduct[prodIndex],
                [child?.title]: child?.value,
              };
              keys.push(child?.title);
            });
          });
        });
        setTableHead([...new Set(keys)]);
        setTableData(mapProduct);
        setProductNames(names);
        setDatas(products);
      } else {
      }
    }
  }, [router]);

  return (
    <ProductLayout>
      <section className="container comparison">
        <div className="d-flex w-100 gap-4 justify-content-around align-items-center flex-wrap ">
          {datas?.map((product: any, prodctIndex: number) => {
            return (
              prodctIndex <= 2 && (
                <LatestArrivalProductThumb
                  product={product}
                  css={''}
                  key={product?.id}
                />
              )
            );
          })}
        </div>

        <section className="container">
          <div></div>
          <hr />
          <div></div>
        </section>
        <div className="container w-full comparison-section ">
          <h5 className="table-heading">Technical Specifications</h5>
          <Table>
            <tbody className="">
              <tr className="">
                <th className="table-width-parent table-width-parent-dark ">
                  Product Name
                </th>
                {productNames?.map((name: string, nameIndex: number) => {
                  return (
                    <td className="table-secondary" key={nameIndex}>
                      {name}
                    </td>
                  );
                })}
              </tr>
              {tableHead?.map((head: any, headIndex: number) => {
                return (
                  <tr
                    // className={'col-12'}
                    key={headIndex}
                  >
                    <th
                      className={
                        headIndex % 2 === 0 ? 'table-light' : ' table-secondary'
                      }
                    >
                      {head}
                    </th>

                    {tableData?.map((produc: any, index: number) => {
                      return (
                        index <= 2 && (
                          <td
                            key={index}
                            className={
                              headIndex % 2 === 0
                                ? 'table-light'
                                : ' table-secondary'
                            }
                          >
                            {String(produc[head] ?? '-')}
                          </td>
                        )
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </section>
    </ProductLayout>
  );
};

export default ProductComparision;
