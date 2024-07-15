import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useCartStore from '../stores/cartStore';

function ProductDetails() {
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState({});
    const [error, setError] = useState(null);
    const addToCart = useCartStore((state) => state.addToCart);

    useEffect(() => {
        async function handleProductDetail() {
            try {
                const response = await fetch(`http://localhost/api/index.php?resource=products&id=${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("Expected JSON response");
                }
                const data = await response.json();
                setProductDetail(data);
            } catch (err) {
                setError(err.message);
                console.error("Fetch error: ", err);
            }
        }
        handleProductDetail();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!productDetail || Object.keys(productDetail).length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <span>Products/{productDetail.title}</span>
            <section className='details'>
                <article className='details__pictures'>
                    <div className='picture__product'>
                        <img src={productDetail.image} alt={productDetail.title} />
                    </div>
                    <div className='products__list'>
                        {/* Aquí puedes agregar miniaturas adicionales si tienes */}
                        <div className='product__item'>
                            <img src={productDetail.image} alt={productDetail.title} />
                        </div>
                    </div>
                </article>
                <section className='details__data'>
                    <h3>{productDetail.title}</h3>
                    <h1>{productDetail.shortDescription}</h1>
                    <h4>$ {productDetail.price}</h4>
                </section>
                <section className='details__description'>
                    <h2>Product Description</h2>
                    <p>{productDetail.description}</p>
                </section>
            </section>
            <section className='section__cart'>
                <div className='cart__price'>
                    <h5>Grand Total</h5>
                    <h3>${productDetail.price}</h3>
                </div>
                <button
                    className='cart__btn'
                    onClick={() => addToCart(productDetail)}
                >
                    ADD TO CART
                </button>
            </section>
        </>
    );
}

export default ProductDetails;
