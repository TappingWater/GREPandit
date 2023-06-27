import Footer from "./footer/Footer";
import Header from "./header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<section className='bg-slate-900 min-h-screen pb-4 pt-[100px] text-white font-text'>
				{children}
			</section>
			<Footer />
		</>
	);
}
