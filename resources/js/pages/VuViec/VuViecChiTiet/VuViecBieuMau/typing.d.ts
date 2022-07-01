declare module BieuMau {
	export interface Item {
		path: string;
		name: string;
		childs?: Item[];
		lanh_dao?: boolean;
		pho_thu_truong?: boolean;
	}
}
