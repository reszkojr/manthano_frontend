import {motion} from "framer-motion";
import Props from "../../utils/Props.tsx";

const animations = {
    initial: {opacity: 0, x: 100},
    animate: {opacity: 1, x: 0},
    exit: {opacity: 0, x: -100},
}

const SlideTransition = ({children}: Props) => {
    return (
        <motion.div className={'w-full'} variants={animations} initial={"initial"} animate={"animate"} exit={"exit"}>
            {children}
        </motion.div>
    )
}

export default SlideTransition;
