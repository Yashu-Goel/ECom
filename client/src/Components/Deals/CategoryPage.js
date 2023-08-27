// ProductsPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CategoryPage.css";

const generateRandomProducts = (count) => {
  const products = [];
  for (let i = 1; i <= count; i++) {
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 10,
      rating: Math.floor(Math.random() * 5) + 1,
      size: `${Math.floor(Math.random() * 10) + 5} GB`,
    });
  }
  return products;
};

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    setLoading(true);
    // Simulate fetching data from an API
    const fetchedProducts = generateRandomProducts(20); // Fetch 20 random products
    setProducts(fetchedProducts);
    setLoading(false);
  }, []);

  const sortProducts = (sortBy) => {
    let sortedProducts = [...products];
    if (sortBy === "rating") {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "size") {
      sortedProducts.sort((a, b) => parseInt(a.size) - parseInt(b.size));
    }
    setProducts(sortedProducts);
    setSortBy(sortBy);
  };

  return (
    <div>
      <h1>Products in {category}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div class="category-page-container">
            <main class="category-page-grid">
              <article>
                <img
                  src="https://picsum.photos/600/400?image=1083"
                  alt="Sample photo"
                />
                <div class="category-page-text">
                  <h3>Seamlessly visualize quality</h3>
                  <p>
                    Collaboratively administrate empowered markets via
                    plug-and-play networks.
                  </p>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="category-page-btn"
                  >
                    Here's why
                  </a>
                </div>
              </article>
              
              <article>
                <img
                  src="https://picsum.photos/600/400?image=1063"
                  alt="Sample photo"
                />
                <div class="text">
                  <h3>Completely Synergize</h3>
                  <p>
                    Dramatically engage seamlessly visualize quality
                    intellectual capital without superior collaboration and
                    idea-sharing.
                  </p>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="btn btn-primary btn-block"
                  >
                    Here's how
                  </a>
                </div>
              </article>
              <article>
                <img
                  src="https://picsum.photos/600/400?image=1056"
                  alt="Sample photo"
                />
                <div class="text">
                  <h3>Dynamically Procrastinate</h3>
                  <p>
                    Completely synergize resource taxing relationships via
                    premier niche markets.
                  </p>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="btn btn-primary btn-block"
                  >
                    Read more
                  </a>
                </div>
              </article>
              <article>
                <img
                  src="https://picsum.photos/600/400?image=1050"
                  alt="Sample photo"
                />
                <div class="text">
                  <h3>Best in class</h3>
                  <p>
                    Imagine jumping into that boat, and just letting it sail
                    wherever the wind takes you...
                  </p>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="btn btn-primary btn-block"
                  >
                    Just do it...
                  </a>
                </div>
              </article>
              <article>
                <img
                  src="https://picsum.photos/600/400?image=1041"
                  alt="Sample photo"
                />
                <div class="text">
                  <h3>Dynamically innovate supply chains</h3>
                  <p>
                    Holisticly predominate extensible testing procedures for
                    reliable supply chains.
                  </p>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="btn btn-primary btn-block"
                  >
                    Here's why
                  </a>
                </div>
              </article>
              <article>
                <img
                  src="https://picsum.photos/600/400?image=1015"
                  alt="Sample photo"
                />
                <div class="text">
                  <h3>Sanity check</h3>
                  <p>
                    Objectively innovate empowered manufactured products whereas
                    parallel platforms.
                  </p>
                  <a
                    href="https://codepen.io/collection/XdWJOQ/"
                    class="btn btn-primary btn-block"
                  >
                    Stop here
                  </a>
                </div>
              </article>
            </main>
          </div>
          {/* <div>
            Sort by:{" "}
            <select
              value={sortBy}
              onChange={(e) => sortProducts(e.target.value)}
            >
              <option value="rating">Rating</option>
              <option value="price">Price</option>
              <option value="size">Size</option>
            </select>
          </div>
          <div className="product-cards">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Rating: {product.rating}</p>
                <p>Size: {product.size}</p>
              </div>
            ))}
          </div> */}
        </>
      )}
    </div>
  );
};

export default CategoryPage;
