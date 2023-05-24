import {WithAuth, UserPageProps} from '@/components/WithAuth';

const VerbalPage: React.FC<UserPageProps> = ({ user }) => {
	console.log(user.getUsername());
  return (
    <div>
			Verbal Section
    </div>
  );
}

export default WithAuth(VerbalPage);