import './Hero.css';

const Hero = () => {
	return (
		<div className='hero mx-auto'>
			<div className='socrates-gradient' />
			{/* <div className='blue-gradient' /> */}
			{/* <div className='pink-gradient' /> */}
			<div className='float-left flex w-full flex-col place-items-center space-y-4 px-20 pt-20 text-center'>
				<h1 className='w-2/3 font-serif text-6xl font-bold leading-[90px]'>Manage your classroom with ease and efficiency.</h1>
				<h2 className='w-[850px] pb-12 text-2xl text-gray'>Manthano is an open-source platform designed to help students and teachers achieve max productivity in a completely intuitive way.</h2>
				<button className='call-to-btn w-60 rounded-[16px] bg-gradient-to-bl from-teal to-lapis px-3 py-3 font-sans text-2xl font-bold'>START LEARNING</button>
			</div>
			<img src='landingpage/socrates4-half-pixelized.png' className='absolute left-1/2 top-[60vh] -z-10 w-[1000px] -translate-x-1/2' alt='the man' />
		</div>
	);
};

export default Hero;
