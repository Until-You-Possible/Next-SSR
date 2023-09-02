import { NextPage } from "next";
import { Button, Form, Input, Modal } from "antd";
import styles from "./index.module.scss"
import Link from "next/link";
import CountDown from "../CountDown";


interface IProps {
    isShow: boolean,
    onClose:  () => void;
}

const Login: NextPage<IProps> = (props) => {

    const { isShow } = props;

    const handleCancel = () => {
        props.onClose()
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return <>
        {
            isShow ? <div>
                <Modal
                    title="手机号登录"
                    width={400}
                    open={isShow}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form
                        name="normal_login"
                        className={styles.loginForm}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="phone"
                            rules={[{ required: true, message: '请输入手机号' }]}
                        >
                            <Input size="large" placeholder="请输入手机号" />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            rules={[{ required: true, message: '请输入验证码' }]}
                        >
                            <Input
                                size="large"
                                placeholder="请输入手机验证码"
                                addonAfter={<CountDown />}
                            />

                        </Form.Item>
                    </Form>
                    <Button size="large" block  type="primary">登录</Button>
                    <Link href="#" className={styles.githubButton}>使用Github登录</Link>
                </Modal>
            </div> : null
        }
    </>
}

export default Login;