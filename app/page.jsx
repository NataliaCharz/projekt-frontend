import Link from "next/link";
import {AuthProvider} from "./auth/AuthContext";

export default function HomePage() {
    return (
        <AuthProvider>
            <main>
                <h1>Library Application</h1>
                <p>Welcome on a page where You can store Your favorite books and get back any time any anywhere You want.</p>

                <div>
                    <Link href="/login">
                        <button>Log in</button>
                    </Link>
                    <Link href="/register">
                        <button>Register</button>
                    </Link>
                    <Link href="/library">
                        <button>Use as Guest</button>
                    </Link>
                </div>
            </main>
        </AuthProvider>
    );
}

