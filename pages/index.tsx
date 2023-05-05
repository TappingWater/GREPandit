import Image from "next/image";
import Link from "next/link";

// Home component
const Home = () => {
  const heroBanner = () => {
    const heroSubTextStyling = "md:text-sm font-light";
    const buttonStyling = "bg-sky-700 p-2 rounded-lg font-tabs mr-2 mt-2 mb-2 drop-shadow-2xl hover:bg-sky-500 active:bg-sky-200 active:shadow-inner transition-all";
    return (
      <div className="flex flex-col-reverse md:flex-row h-[100%]">
        <div className="relative h-[60%] md:h-[90%] md:mt-[5%] w-[80%] md:w-[50%] ml-5 m-auto">
          <Image
            className="object-scale-down sm:object-bottom md:object-left-bottom z-10"
            src="/heroBanner.png"
            alt="Logo"
            fill
            priority
          />
        </div>
        <div className="sm:ml-[30px] md:ml-[0px] pt-[10px] mb-[5px] md:pt-[20vh] sm:h-[40%] pl-[10px] md:h-[100%] md:w-[50%]">
          <h1 className="font-heading text-xl text-pink-200">Taking the GRE exam?</h1>
          <p className={heroSubTextStyling}>Personalized questions that adapt to you</p>
          <p className={heroSubTextStyling}>Monitor your progress</p>
          <p className={heroSubTextStyling}>Let us help you get the score you desire</p>
          <div className="flex flex-row">          
            <Link href="/login" className={buttonStyling}>Try It For Free</Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {heroBanner()}
    </>
  );
};


export default Home;