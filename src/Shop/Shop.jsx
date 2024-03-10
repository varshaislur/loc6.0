import React, { useState } from "react";
import PageHeader from "../Components/PageHeader";
import Data from "../products.json";
import ProductCard from "./ProductCard";
const showResults = "Showing 01 - 12 of 139 Results";

const Shop = () => {
  const [GridList, setGridList] = useState(true);
  const [products, setProducts] = useState(Data);

  return (
    <div>
      <PageHeader title="Our Shop Page" curPage="Shop" />
      <div className="shop-page padding-tb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-12">
              <article>
                <div className="shop-title d-flex flex-warp justify-content-between">
                  <p>{showResults}</p>
                  <div
                    className={`product-view-mode ${
                      GridList ? "gridActive" : "listActive"
                    }`}
                  >
                    <a onClick={() => setGridList(!GridList)} className="grid">
                      <i className="icofont-ghost"></i>
                    </a>
                    <a onClick={() => setGridList(!GridList)} className="list">
                      <i className="icofont-listine-dots"></i>
                    </a>
                  </div>
                </div>
                <div>
                  <ProductCard GridList={GridList} products={products} />
                </div>
              </article>
            </div>
            <div className="col-lg-4 col-12">right side</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
