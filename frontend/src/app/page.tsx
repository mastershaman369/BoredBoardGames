"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import HeroBanner from "../components/HeroBanner";
import FeaturedCategories from "../components/FeaturedCategories";
import SpinningWheel from "../components/SpinningWheel";
import ProductSection from "../components/ProductSection";
import { exampleMarketplaceProducts } from "../data/exampleMarketplaceProducts";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturedCategories />
      <SpinningWheel />
      <ProductSection
        title="Best Sellers"
        products={exampleMarketplaceProducts.filter(p => p.bestSeller)}
      />
      <ProductSection
        title="New Arrivals"
        products={exampleMarketplaceProducts.filter(p => p.newArrival)}
      />
      <ProductSection
        title="Featured Items"
        products={exampleMarketplaceProducts.filter(p => p.featured)}
      />
      <ProductSection
        title="On Sale"
        products={exampleMarketplaceProducts.filter(p => p.sale)}
      />
    </>
  );
}
