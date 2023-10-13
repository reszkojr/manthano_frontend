interface CardProps {
	icon?: React.ReactNode;
	title: string;
	subtitle?: string;
	className?: string;
}

const Card = (props: CardProps) => {
	const styles = { card: `bg-gray-600 border border-gray-500 rounded-md p-3 hover:bg-gray-500 cursor-pointer ${props.className}` };

	return (
		<div className={styles.card}>
			<div className='flex'>
				{props.icon && <div className='ml-2 mr-6 my-auto'>{props.icon}</div>}
				<div className='space-y-1'>
					<h2 className='text-md font-semibold'>{props.title}</h2>
					{props.subtitle && <p className='text-md text-gray-300'>{props.subtitle}</p>}
				</div>
			</div>
		</div>
	);
};

export default Card;
