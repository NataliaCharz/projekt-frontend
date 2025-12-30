import Link from "next/link";

export default function UserPanel(){
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/list">Your List</Link>
            <Link href="/wishlist">Wishlist</Link>
            <Link href="/authors">Explore Authors</Link>
            <Link href="/books">Explore Books</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/logout">Logout</Link>
        </nav>
        )
}
