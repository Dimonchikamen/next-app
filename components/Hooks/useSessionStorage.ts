import { useEffect, useState } from "react";

export default function useSessionStorage(key: string, val: any) {
    const [value, setValue] = useState(val || window.sessionStorage.getItem(key)!);

    useEffect(() => {
        window.sessionStorage.setItem(key, value);
    }, [value]);

    return [value, setValue];
}
