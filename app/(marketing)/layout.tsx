import { Footer } from "./footer";
import { Header } from "./header";

// Добавлю пропсы, чтобы отображалась страница
type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Props) => {
  return (
    // теперь каждый чилдрен (любой раут) будет иметь такой лайаут
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
