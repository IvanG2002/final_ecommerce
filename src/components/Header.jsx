import { Link, useParams } from "react-router-dom";

function Header() {
    const { userId } = useParams();

    return (
        <header className="header">
            <section className="header__left">
                <h1><i>#</i></h1>
            </section>
            <section className="header__center">
                <div className="center__search">
                    <input type="text" placeholder="Search product..." />
                    <i className='bx bx-search'></i>
                </div>
            </section>
            <section className="header__right">
                <Link to={`../ShoppingList/${userId}`}>
                    <i className='bx bx-shopping-bag'></i>
                </Link>
                <i className='bx bx-menu'></i>
            </section>
        </header>
    );
}

export default Header;
