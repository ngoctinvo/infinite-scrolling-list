import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { ProductType } from '../types/product';

const Product: React.FC<ProductType> = ({
  title,
  description,
  price,
  discountPercentage,
  rating,
  stock,
  brand,
  category,
  thumbnail,
  images,
}) => {
  return (
       <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="200"
        image={thumbnail}
        alt={title}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {description}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Price: {price}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Discount: {discountPercentage}%
        </Typography>
        <Typography variant="body2" gutterBottom>
          Rating: {rating}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Stock: {stock}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Brand: {brand}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Category: {category}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
