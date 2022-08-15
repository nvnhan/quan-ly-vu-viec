export const required = {
	required: true,
	message: 'Không được bỏ trống',
};

export const numberCharacter = {
	pattern: new RegExp(/^[a-z0-9\._]+$/g),
	message: 'Chỉ được bao gồm chữ cái thường, số, ký tự . và _',
};

export const length = (len: number) => ({
	max: len,
	message: `Không được quá ${len} kí tự`,
});
