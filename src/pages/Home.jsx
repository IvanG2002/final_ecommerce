import React, { useState, useEffect } from 'react';
import Footer from "../components/Footer";
import { useProducts } from "../hooks/useProducts";
import { useParams } from "react-router-dom";
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

function Home() {
    const { userId } = useParams();
    const { products } = useProducts();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory ? product.categoryId.toString() === selectedCategory : true;
        const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            <header className="header">
                <section className="header__left">
                    <h1><i>#</i></h1>
                </section>
                <section className="header__center">
                    <div className="center__search">
                        <input
                            type="text"
                            placeholder="Search product..."
                            onChange={handleSearch}
                            value={search}
                        />
                        <i className='bx bx-search'></i>
                    </div>
                </section>
            </header>
            <header className='main__header'>
                <h1>Products</h1><span>({filteredProducts.length} Products)</span>
            </header>
            <section className="category-select">
                <select name="category" id="category" onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    <option value="1">Computer Accessories</option>
                    <option value="2">Keyboards</option>
                    <option value="3">Audio</option>
                    <option value="1">Wearables</option>
                    <option value="1">Television</option>
                </select>
            </section>
            <section className='grid'>
                {filteredProducts && filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </section>
            <Footer id={userId}></Footer>
        </>
    );
}

export default Home;
