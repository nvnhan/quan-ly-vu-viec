import { sideBarReducer } from './sideBar';
import { authUserReducer } from './authUser';
import { menuActiveReducer } from './menuActive';
import { pageTitleReducer } from './pageTitle';
import nhomCongViec from './nhomCongViec';

const myReducer = {
	sideBarReducer,
	authUserReducer,
	menuActiveReducer,
	pageTitleReducer,
	nhomCongViec,
};

export default myReducer;
