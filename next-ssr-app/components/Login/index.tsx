import { NextPage } from "next";
import { Button, Form, Input, Modal } from "antd";
import styles from "./index.module.scss"
import Link from "next/link";
import CountDown from "../CountDown";
import {useState} from "react";


interface IProps {
    isShow: boolean,
    onClose:  () => void;
}

interface FormValueType {
    phone : string,
    code  : string
}

const Login: NextPage<IProps> = (props) => {

    const { isShow, onClose } = props;

    const handleCancel = () => {
        onClose && onClose()
    };

    const onFinish = (values: FormValueType) => {
        console.log('Received values of form: ', values);
        setPhoneNumber(values?.phone);

    };

    const [phoneNumber, setPhoneNumber]  = useState("");

    const [form] = Form.useForm();

    const currentPhoneNumber = Form.useWatch('phone', form);

    // setPhoneNumber(Form.useWatch('phone', form));

    const verifyCode = useState("");

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
                        form={form}
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
                                addonAfter={<CountDown phoneNumber={currentPhoneNumber} />}
                            />

                        </Form.Item>
                        <Form.Item>
                            <Button block size="large" type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                    <Link href="#" className={styles.githubButton}>使用Github登录</Link>
                </Modal>
            </div> : null
        }
    </>
}

export default Login;