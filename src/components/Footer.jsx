import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../stores/cartStore';

function Footer({ id }) {
    const cart = useCartStore((state) => state.cart);
    const [shoppingListId, setShoppingListId] = useState(null);

    useEffect(() => {
        const fetchShoppingListId = async () => {
            try {
                console.log(`Fetching shopping list for user with id ${id}`);
                const response = await fetch(`http://localhost/api/index.php?resource=shoppingLists&userId=${id}`);
                const data = await response.json();
                console.log('API Response:', data);
                
                if (response.ok && data.length > 0) {
                    setShoppingListId(data[0].id);
                    console.log('Shopping list ID set to:', data[0].id);
                } else {
                    console.error('Failed to fetch shopping list:', data.message);
                }
            } catch (error) {
                console.error('Error fetching shopping list:', error);
            }
        };

        fetchShoppingListId();
    }, [id]);

    return (
        <footer className='footer'>
            <div className='footer__left'>
                <div>
                    <i className='bx bx-shopping-bag'></i>
                </div>
                <div>
                    <p>You Have <b>{cart.length} Items</b> in the bag</p>
                </div>
            </div>
            <div className='footer__right'>
                {shoppingListId ? (
                    <u><Link to={`/home/${id}/shoppingList/${shoppingListId}`}>Check Now</Link></u>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </footer>
    );
}

export default Footer;
