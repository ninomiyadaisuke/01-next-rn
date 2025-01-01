"use client";
import React from "react";
import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";

type Props = {
  _id: string;
};

const Verify = ({ _id }: Props) => {
  const router = useRouter();
  const onFinish = async (values: { _id: string; code: string }) => {
    console.log("Success:", values);

    const { _id, code } = values;

    const res = await sendRequest<IBackendRes<{ _id: string; code: string }>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL!}/api/v1/auth/check-code`,
      method: "POST",
      body: {
        _id,
        code,
      },
    });

    if (res.data) {
      message.success("アカウントの有効化に成功しました。登録したメールアドレスとパスワードでログインしてください。");
      router.push(`/auth/login`);
    } else {
      notification.error({
        message: "Verify Error",
        description: res.message,
      });
    }
  };

  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend>Đăng Ký Tài Khoản</legend>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item label="Email" name="_id" initialValue={_id} hidden>
              <Input disabled />
            </Form.Item>
            <div>メールに送信されたコードを入力してください。</div>
            <Divider />
            <Form.Item
              label="Code"
              name="code"
              rules={[{ required: true, message: "Please input your code!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Link href={"/"}>
            <ArrowLeftOutlined /> Quay lại trang chủ
          </Link>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Đã có tài khoản? <Link href={"/auth/login"}>Đăng nhập</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default Verify;
