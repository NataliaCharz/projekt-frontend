import RequireAuth from "../auth/RequireAuth";

export default function AdminPage() {
    return (
        <RequireAuth role="ADMIN">
            <h1>Admin Panel</h1>
        </RequireAuth>
    );
}

