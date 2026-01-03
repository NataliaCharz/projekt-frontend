import Link from "next/link";
import RequireAuth from "../../auth/RequireAuth";

export default function UserPanel() {
    return (
        <RequireAuth allowedRoles={["USER"]}>
            <div className="panel">
                <Link href="/user/home" className="panel-link">Home</Link>
                <Link href="/user/list" className="panel-link">Your List</Link>
                <Link href="/user/wishlist" className="panel-link">Wishlist</Link>
                <Link href="../../authors" className="panel-link">Explore Authors</Link>
                <Link href="/books" className="panel-link">Explore Books</Link>
                <Link href="/contact" className="panel-link">Contact</Link>
                <Link href="../../logout" className="panel-link">Logout</Link>
            </div>
        </RequireAuth>
    )
}
