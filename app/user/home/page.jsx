import Link from "next/link";

export default function UserPanel(){
    return (
        <div id="user-div">
            <Link href="/user/home">Home</Link>
            <Link href="/user/list">Your List</Link>
            <Link href="/user/wishlist">Wishlist</Link>
            <Link href="/user/authors">Explore Authors</Link>
            <Link href="/user/books">Explore Books</Link>
            <Link href="/user/contact">Contact</Link>
            <Link href="/user/logout">Logout</Link>
        </div>
        )
}
