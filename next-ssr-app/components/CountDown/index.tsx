import { NextPage } from "next";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";

const CountDown: NextPage = () => {

    const [initCount, setInitCount] = useState(60);

    let timer: NodeJS.Timeout | null = null;

    const startCountdown = () => {
        if (initCount <= 0) {
            setInitCount(60);
        }

        timer = setInterval(() => {
            setInitCount((prevCount) => {
                if (prevCount <= 1) {
                    timer && clearInterval(timer);
                    return 0; // 计时结束
                }
                return prevCount - 1;
            });
        }, 1000) as NodeJS.Timeout;
    };

    const sendPhoneCode = () => {
        startCountdown();
    };

    useEffect(() => {
        return () => {
            // 在组件卸载时清除定时器
            timer && clearInterval(timer);
        };
    }, []);

    return (
        <div className={styles.phoneCode} onClick={sendPhoneCode}>
            { ( initCount === 60 ||  initCount === 0 ) ? "发送验证码" : initCount + "s"}
        </div>
    );
};

export default CountDown;
