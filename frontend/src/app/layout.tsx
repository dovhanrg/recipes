import { Container, CssBaseline } from '@mui/material';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <Container maxWidth="sm">{children}</Container>
      </body>
    </html>
  );
}
