import { useState } from 'react';

interface UseInputProps {
    initialValue?: string;
}

const useInput = ({ initialValue = '' }: UseInputProps) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return [value, onChange, setValue];
};

export default useInput;
