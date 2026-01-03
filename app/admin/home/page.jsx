import RequireAuth from "../../auth/RequireAuth";
import Link from "next/link";

export default function AdminPage() {
    return (
        <RequireAuth allowedRoles={["ADMIN"]}>
            <div className="panel">
                <Link href="/admin/home">Home</Link>
                <Link href="/admin/addAuthor">Add Authors</Link>
                <Link href="/admin/addBook">Add Books</Link>
                <Link href="/books">All Books</Link>
                <Link href="/authors">All Authors</Link>
                <Link href="/admin/messages">Contact Messages</Link>
                <Link href="../../logout">Logout</Link>
            </div>
        </RequireAuth>
    );
}

