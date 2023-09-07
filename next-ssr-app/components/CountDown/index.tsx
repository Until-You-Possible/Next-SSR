import { NextPage } from "next";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import  request from "../../service/fetch"
interface IProps {
    phoneNumber: string;
}

const CountDown: NextPage<IProps> = ({ phoneNumber }) => {
    const [initCount, setInitCount] = useState(60);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const startCountdown = () => {
        if (initCount <= 0) {
            setInitCount(60);
        }

        const newTimer = setInterval(() => {
            setInitCount((prevCount) => {
                if (prevCount <= 1) {
                    clearInterval(newTimer);
                    return 0; // 计时结束
                }
                return prevCount - 1;
            });
        }, 1000);

        setTimer(newTimer);
    };

    const sendPhoneCode = () => {
        if (!phoneNumber) {
            alert("输入手机号码～")
            return;
        }
        // 发送短信验证码-->回调成功再倒计时
        console.log("phoneNumber", phoneNumber);
        request.post("/api/user/sendVerifyCode", {
            to: phoneNumber ,
            templateId: 1
        }).then(res => {
            const currentStatus = res.result.statusCode
            if (currentStatus === "000000") {
              alert("短信验证码发送成功");
              startCountdown();
            }
        });
    };

    useEffect(() => {
        return () => {
            // 在组件卸载时清除定时器
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [timer]);

    return (
        <div className={styles.phoneCode} onClick={sendPhoneCode}>
            {(initCount === 60 || initCount === 0) ? "发送验证码" : initCount + "s"}
        </div>
    );
};

export default CountDown;
