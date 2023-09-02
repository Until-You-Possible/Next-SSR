
'use client'
import type { NextPage } from "next";
import  { useState } from "react";
import { usePathname } from 'next/navigation'
import styles from "./index.module.scss"
import { navs } from "./config"
import Link from "next/link";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Login from "../Login";

const NavBar: NextPage = () => {

    const pathname = usePathname()

    const [isShowLogin, setIsShowLogin] = useState(false)

    const handleGotoEditPage = () => {

    }

    const handleLogin = () => {
        setIsShowLogin(true);
    }

    const handleCloseLogin = () => {
        setIsShowLogin(false);
    }

    return (
        <div className={styles.navbar}>

            <section className={styles.logoArea}>
                <Avatar className={styles.logoImage} src="https://xsgames.co/randomusers/assets/avatars/pixel/0.jpg" size={40} icon={<UserOutlined />} />
            </section>
            <section className={styles.linkArea}>
                {
                    navs?.map((v) => {
                        return <Link key={v.label} href={v.value}
                                     className={ pathname === v.value ? styles.active : ""}>{v.label}</Link>
                    })
                }
            </section>

            <section className={styles.opeartionArea}>
                <Button onClick={handleGotoEditPage}>写文章</Button>
                <Button type="primary" onClick={handleLogin}>登录</Button>
            </section>

            <Login isShow={isShowLogin}
                   onClose={handleCloseLogin}></Login>

        </div>
    )
}

export default NavBar;