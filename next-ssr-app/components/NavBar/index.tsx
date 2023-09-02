
'use client'
import type { NextPage } from "next";
import { usePathname } from 'next/navigation'
import styles from "./index.module.scss"
import { navs } from "./config"
import Link from "next/link";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const NavBar: NextPage = () => {

    const pathname = usePathname()

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
        </div>
    )
}

export default NavBar;