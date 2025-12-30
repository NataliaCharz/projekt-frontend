import "./globals.css";
import { AuthProvider } from "./auth/AuthContext";
import {BrowserRouter} from "react-router-dom";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <BrowserRouter>
            <AuthProvider>{children}</AuthProvider>
        </BrowserRouter>
        </body>
        </html>
    );
}



