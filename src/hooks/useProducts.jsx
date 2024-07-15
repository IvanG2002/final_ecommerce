import { useEffect, useState } from "react";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleProducts = async () => {
            try {
                const response = await fetch('http://localhost/api/index.php?resource=products');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("Expected JSON response");
                }
                const data = await response.json();
                console.log(data);
                setProducts(data);
            } catch (err) {
                setError(err.message);
                console.error("Fetch error: ", err);
            }
        };
        handleProducts();
    }, []);

    return {
        products,
        error
    };
};
