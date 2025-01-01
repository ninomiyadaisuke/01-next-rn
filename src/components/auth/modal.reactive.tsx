"use client";
import { sendRequest } from "@/utils/api";
import { useHasMounted } from "@/utils/customHook";
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, notification, Steps } from "antd";
import React, { Dispatch, SetStateAction, useState } from "react";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  userEmail: string;
};
const ModalReactive = ({ isModalOpen, setIsModalOpen, userEmail }: Props) => {
  const [current, setCurrent] = useState(0);
  const [userId, setUserId] = useState("");
  const [form] = Form.useForm();
  const hasMounted = useHasMounted();
  if (!hasMounted) return <></>;

  const onFinishStep0 = async (values: { email: string }) => {
    const { email } = values;
    const res = await sendRequest<IBackendRes<{ _id: string }>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL!}/api/v1/auth/retry-active`,
      method: "POST",
      body: {
        email,
      },
    });

    if (res.data) {
      setUserId(res.data._id);
      setCurrent(1);
    } else {
      notification.error({
        message: "メールアドレスの再送に失��しました",
        description: res.error,
      });
    }
  };

  const onFinishStep1 = async (values: { code: string }) => {
    const { code } = values;
    const res = await sendRequest<IBackendRes<{ _id: string }>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL!}/api/v1/auth/check-code`,
      method: "POST",
      body: {
        code,
        _id: userId,
      },
    });

    if (res.data) {
      setCurrent(2);
    } else {
      notification.error({
        message: "メールアドレスの再送に失��しました",
        description: res.error,
      });
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      title="アカウントを有効化する"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      footer={null}
    >
      <Steps
        current={current}
        items={[
          {
            title: "Login",
            icon: <UserOutlined />,
          },
          {
            title: "Verification",
            icon: <SolutionOutlined />,
          },
          {
            title: "Done",
            icon: <SmileOutlined />,
          },
        ]}
      />
      {current === 0 && (
        <>
          <div style={{ marginTop: "20px " }}>
            あなたのアカウントはまだ有効さされていません
          </div>
          <Form
            name="basic"
            onFinish={onFinishStep0}
            autoComplete="off"
            layout="vertical"
            form={form}
          >
            <Form.Item label="" name="email" initialValue={userEmail}>
              <Input disabled />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Resend
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
      {current === 1 && (
        <>
          <div style={{ marginTop: "20px " }}>確認コードを入力してください</div>
          <Form
            name="verifiy2"
            onFinish={onFinishStep1}
            autoComplete="off"
            layout="vertical"
            form={form}
          >
            <Form.Item
              label="Code"
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Active
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
            {current === 2 && (
        <>
          <div style={{ marginTop: "20px " }}>アカウントが正常に有効化されました。再度ログインしてください。</div>
        </>
      )}
    </Modal>
  );
};

export default ModalReactive;
