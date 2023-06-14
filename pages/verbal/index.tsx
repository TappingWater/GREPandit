import { WithAuth, UserPageProps } from "@/components/WithAuth";
import VerbalQuiz from "@/components/verbal/VerbalQuiz";

const VerbalPage: React.FC<UserPageProps> = ({ user }) => {
	return (
		<div className='h-full'>
			<VerbalQuiz></VerbalQuiz>
		</div>
	);
};

export default WithAuth(VerbalPage);
