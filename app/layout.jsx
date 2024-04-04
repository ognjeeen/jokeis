import '@/assets/styles/globals.css';

export const metadata = {
  title: 'Jokies | Joke is all yours',
  description: 'Joke is all yours',
  keywords: 'jokes, post jokes',
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
