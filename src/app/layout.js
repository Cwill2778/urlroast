import "./globals.css";

export const metadata = {
  title: "Roast My Landing Page | Brutally Honest AI Audit",
  description: "Get a brutally honest, slightly hilarious AI audit of your landing page for just $2.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
