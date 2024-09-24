// type CategoryProductType = {
//   id: number;
//   product_name: string;
//   category_name: string;
//   brand_name: string;
//   hsn_code: number | string;
//   product_url: string;
//   sku: number | string;
//   has_video_shopping: boolean;
//   stock_status: string;
//   is_featured: 0;
//   is_best_selling: 0;
//   is_new: 0;
//   sale_prices: {
//     strike_rate: number | string;
//     strike_rate_original: 0;
//     price: number | string;
//     price_original: number | string;
//     discount: [];
//     overall_discount_percentage: 0;
//   };
//   mrp_price: number | string;
//   image: string;
//   max_quantity: 1;
// };

// type CategoryListType = {
//   products: CategoryProductType[];
//   total_count: number;
//   from: number;
//   to: number;
// };

export interface BookType {
  [key: string]: {
    label: string;
    value: string;
  }[];
}

export type LearnScoreType = {
  books: BookType;
};
