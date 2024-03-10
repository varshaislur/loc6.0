import React from "react";
import { Link } from "react-router-dom";
const subTitle = "Choose Any Products";
const title = "Buy Everything with Us";
const btnText = "Get Started Now";

const categoryList = [
  {
    imgUrl:
      "https://m.media-amazon.com/images/I/41tp0JPPlmL._AC_UF1000,1000_QL80_.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "DSLR Camera",
  },
  {
    imgUrl: "https://m.media-amazon.com/images/I/61Qe0euJJZL.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Shoes",
  },
  {
    imgUrl:
      "https://www.intel.com/content/dam/www/central-libraries/us/en/images/2022-08/2-in-1-product-image-transparent-background.png.rendition.intel.web.576.324.png",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Photography",
  },
  {
    imgUrl:
      "https://5.imimg.com/data5/BS/RZ/CH/SELLER-28954112/dslr-camera-500x500.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Formal Dress",
  },
  {
    imgUrl:
      "https://media.cnn.com/api/v1/images/stellar/prod/210726162620-best-water-bottles-yeti-product-card.jpg?q=x_2,y_0,h_900,w_1601,c_crop/h_720,w_1280",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Colorful Bags",
  },
  {
    imgUrl:
      "https://th.canon/media/image/2020/01/06/429197eea6fc435c86bfef562852d832_EOS-1D-X-Mark-III-Front-362.png",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Home Decor",
  },
];

const HomeCategory = () => {
  return (
    <div className="category-section style-4 padding-tb ">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle">{subTitle}</span>
          <h2 className="title">{title}</h2>
        </div>
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-md-3 row-cols-sm-2 row-cols-1">
            {categoryList.map((val, i) => (
              <div key={i} className="col">
                <Link to="/shop" className="category-item">
                  <div className="category-inner">
                    <div className="category-thumb h-25 d-inline-block">
                      <img
                        style={{ maxHeight: "400px" }}
                        className=""
                        src={val.imgUrl}
                        alt=""
                      />
                    </div>

                    <div className="category-content">
                      <div className="cate-icon">
                        <i className={`${val.iconName}`}></i>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCategory;
