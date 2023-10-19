import { BsGithub } from 'react-icons/bs';

import './Hero.css';

const Hero = () => {
	return (
		<div className='hero mx-auto flex'>
			<img src='https://i.imgur.com/r0VFFep.png' className='blurry-gradient-1'></img>
			<img src='https://i.imgur.com/r0VFFep.png' className='blurry-gradient-2'></img>
			<img src='https://i.imgur.com/r0VFFep.png' className='blurry-gradient-3'></img>
			<div className='flex w-1/2 flex-col space-y-4 px-20 pt-20'>
				<h1 className='font-highlight text-gray-100 text-5xl font-extrabold leading-[60px] w-[800px]'>Created to make your academic life easier.</h1>
				<h2 className='pb-4 font-semibold text-3xl'>Let's make the School of Athens look ordinary next to your Classroom.</h2>
				<div className='flex space-x-16'>
					<a href='https://github.com/reszkojr/manthano-frontend' target='_blank' className='call-to-btn bg-gray flex w-50 items-center justify-center gap-3 rounded-[8px] bg-gray-600 px-3 py-3 font-sans text-xl font-bold'>
						Give us a star! <BsGithub />
					</a>
					<button className='call-to-btn w-50 rounded-[8px] bg-gradient-to-bl from-teal-500 to-lapis-500 px-3 py-3 font-sans text-xl font-bold'>Create an account</button>
				</div>
			</div>
			<img src='landingpage/socrates4.png' className='w-[1000px]' alt='the man' />
		</div>
	);
};

export default Hero;
