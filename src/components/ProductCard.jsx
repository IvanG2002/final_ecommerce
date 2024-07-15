import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useCartStore from '../stores/cartStore';

const ProductCard = ({ product }) => {
  const { userId } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = async () => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <article key={product.id} className='card'>
      <img className="card__img" src={product.image} alt={product.title} />
      <div className="card__info">
        <h2 className="card__title">{product.title}</h2>
        <p className="card__description">{product.shortDescription}</p>
        <section className="card__bottom">
          <div>
            <h4 className="card__price--title">Price</h4>
            <h3 className="card__price">${product.price}</h3>
          </div>
          <div className="card__bag" onClick={handleAddToCart}>
            <i className='bx bx-shopping-bag'></i>
          </div>
          <Link to={`/productDetails/${product.id}`} className="details-link">Details</Link>
        </section>
      </div>
    </article>
  );
};

export default ProductCard;
