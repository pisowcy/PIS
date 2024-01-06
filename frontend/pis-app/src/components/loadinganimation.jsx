import { useEffect, useState } from "react";

export function LoadingAnimation() {
    const [dots, setDots] = useState(1);

    useEffect(() => {
        const intervalId = setInterval(() => {
        setDots((prevDots) => (prevDots === 3 ? 1 : prevDots + 1));
        }, 300);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
        alert("There seems to be a connection with backend problem.\nTry again later");
        }, 10000);

        return () => clearTimeout(timeoutId);
    }, []);

    return <p>Loading{Array(dots).fill('.').join('')}</p>;
}
  