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
      	<section className="bg-gray-900 min-h-screen max-h-full m-0 w-[100%] pt-[100px] text-white pb-2 font-text">{children}</section>
      {/* <Footer /> */}
    </>
  )
}