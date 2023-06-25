import React from 'react';
import { Grid } from '@mui/material';
import Product  from './Product';
import { ProductListType } from '../types/product';

const ProductList: React.FC<ProductListType> = ({ products }) => {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Product {...product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
