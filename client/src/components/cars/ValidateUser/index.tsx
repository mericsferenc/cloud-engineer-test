import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { validateKey } from '../../../api/index';

const ValidateUser = () => {

    const [loading, setLoading] = useState(false);

    const validate = (e: any) => {
        setLoading(true)
        validateKey(e.secretKey).then((res: any) => {
            setLoading(false)
        })
    }

    return (
        <Form onFinish={validate}>
            <Form.Item name="secretKey">
                <Input.Password style={{ width: "25rem" }} placeholder='Enter the secret key to modify or delete cars...' />
            </Form.Item>
            <Button loading={loading} htmlType="submit">Validate</Button>
        </Form>
    )
}

export default ValidateUser