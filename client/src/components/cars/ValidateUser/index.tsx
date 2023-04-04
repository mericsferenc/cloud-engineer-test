import React from 'react'
import { Button, Form, Input } from 'antd'
import { validateKey } from '../../../api/index';

const ValidateUser = () => {

    const validate = (e: any) => {
        console.log(e.secretKey)
        validateKey(e.secretKey)
    }

    return (
        <Form onFinish={validate}>
            <Form.Item name="secretKey">
                <Input.Password style={{ width: "25rem" }} placeholder='Enter the secret key to modify or delete cars...' />
            </Form.Item>
            <Button loading={false} htmlType="submit">Validate</Button>
        </Form>
    )
}

export default ValidateUser