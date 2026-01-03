import "./globals.css";
import {AuthProvider} from "./auth/AuthContext";

export default function RootLayout({children}) {
    return (
        <AuthProvider>
        <html lang="en">
        <body>
        <AuthProvider>{children}</AuthProvider>
        </body>
        </html>
        </AuthProvider>
    );
}



