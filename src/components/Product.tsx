import React from "react";
import { ProductType } from "../types/product";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

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
    <Card style={{ maxWidth: 300, height: 500 }}>
      <CardMedia component="img" height={200} image={thumbnail} alt={title} />
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
