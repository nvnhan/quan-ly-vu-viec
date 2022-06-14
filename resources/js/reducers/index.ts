import { sideBarReducer } from './sideBar';
import { authUserReducer } from './authUser';
import { menuActiveReducer } from './menuActive';
import { pageTitleReducer } from './pageTitle';
import nhomCongViec from './nhomCongViec';
import capBac from './capBac';

const myReducer = {
	sideBarReducer,
	authUserReducer,
	menuActiveReducer,
	pageTitleReducer,
	nhomCongViec,
	capBac,
};

export default myReducer;
