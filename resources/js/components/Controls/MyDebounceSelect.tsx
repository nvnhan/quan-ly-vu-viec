import type { SelectProps } from 'antd/lib/select';
import Select from 'antd/lib/select';
import Spin from 'antd/lib/spin';
import debounce from 'lodash/debounce';
import React, { useMemo, useRef, useState } from 'react';

export interface DebounceSelectProps<ValueType = any>
	extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
	fetchOptions: (search: string) => Promise<ValueType[]>;
	debounceTimeout?: number;
}
// Usage of DebounceSelect
export interface SelectValue {
	label: string;
	value: string;
}

function MyDebounceSelect<ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any>({
	fetchOptions,
	debounceTimeout = 800,
	...props
}: DebounceSelectProps<ValueType>) {
	const [fetching, setFetching] = useState(false);
	const [options, setOptions] = useState<ValueType[]>([]);
	const fetchRef = useRef(0);

	const debounceFetcher = useMemo(() => {
		const loadOptions = (value: string) => {
			fetchRef.current += 1;
			const fetchId = fetchRef.current;
			setOptions([]);
			setFetching(true);

			fetchOptions(value).then((newOptions) => {
				if (fetchId !== fetchRef.current) {
					// for fetch callback order
					return;
				}

				setOptions(newOptions);
				setFetching(false);
			});
		};

		return debounce(loadOptions, debounceTimeout);
	}, [fetchOptions, debounceTimeout]);

	return (
		<Select
			labelInValue
			showSearch
			filterOption={false}
			onSearch={debounceFetcher}
			notFoundContent={fetching ? <Spin size="small" /> : null}
			{...props}
			options={options}
		/>
	);
}

export default MyDebounceSelect;
