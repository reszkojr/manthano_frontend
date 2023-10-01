import './Hero.css';

const Hero = () => {
	return (
		<div className='hero mx-auto'>
			<div className='aqua-gradient' />
			<div className='blue-gradient' />
			<div className='pink-gradient' />
			<div className='float-left flex w-full flex-col place-items-center space-y-4 px-20 pt-20 text-center'>
				<h1 className='w-[900px] font-serif text-6xl font-bold leading-[90px]'>Gathering all the tools required to make you even more potent.</h1>
				<h2 className='w-[850px] pb-12 text-2xl text-gray'>Manthano is an open-source platform designed to help students and teachers achieve max productivity in a completely intuitive way.</h2>
				<button className='call-to-btn w-72 rounded-[16px] bg-gradient-to-bl from-teal to-lapis px-6 py-4 font-sans text-2xl font-bold'>START LEARNING</button>
			</div>
			<img src='landingpage/socrates4-half-pixelized.png' className='absolute left-1/2 top-[60vh] -z-10 w-[1000px] -translate-x-1/2' alt='the man' />
		</div>
	);
};

export default Hero;
