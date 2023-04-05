import { MessageInstance } from "antd/es/message/interface";

export const success = (messageApi: MessageInstance) => {
    messageApi.open({
      type: 'success',
      content: 'Secret key is correct!',
    });
};

export const error = (messageApi: MessageInstance) => {
    messageApi.open({
      type: 'error',
      content: 'Invalid secret key!',
    });
};