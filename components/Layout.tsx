import Header from './Header';
// import Footer from './footer'

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      	<section className="h-[85vh]">{children}</section>
      {/* <Footer /> */}
    </>
  )
}