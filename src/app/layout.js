import './globals.css'

export const metadata = {
  title: 'CHRONOS - Luksuzni Satovi',
  description: 'Otkrijte savršenu harmoniju elegancije i preciznosti',
}

export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
