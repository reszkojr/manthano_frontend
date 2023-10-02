import { BsGithub } from 'react-icons/bs';

import './Hero.css';

const Hero = () => {
	return (
		<div className='hero mx-auto'>
			<div className='socrates-gradient' />
			{/* <div className='blue-gradient' /> */}
			{/* <div className='pink-gradient' /> */}
			<div className='float-left flex w-full flex-col place-items-center space-y-4 px-20 pt-20 text-center'>
				<h1 className='w-2/3 text-6xl font-extrabold leading-[90px]'>Manage your classroom with ease and efficiency.</h1>
				<h2 className='text-gray w-[850px] pb-12 text-2xl'>Manthano is an open-source platform designed to help students and teachers achieve max productivity in a completely intuitive way.</h2>
				<div className='flex w-1/2 justify-center space-x-24'>
					<a href='https://github.com/reszkojr/manthano-frontend' target='_blank' className='call-to-btn bg-gray flex w-60 items-center justify-center gap-3 rounded-[16px] bg-gray-800 px-3 py-4 font-sans text-2xl font-bold'>
						Give us a star! <BsGithub />
					</a>
					<button className='call-to-btn w-60 rounded-[16px] bg-gradient-to-bl from-teal-500 to-lapis-500 px-3 py-4 font-sans text-2xl font-bold'>Create an account!</button>
				</div>
			</div>
			<img src='landingpage/socrates4.png' className='mx-auto mt-24 w-[1000px]' alt='the man' />
		</div>
	);
};

export default Hero;
