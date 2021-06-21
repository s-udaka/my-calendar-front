import AWS from 'aws-sdk';

AWS.config.update({
    credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESSKEY,
        secretAccessKey: process.env.REACT_APP_AWS_SEC_ACCESSKEY
    },
    region: 'ap-northeast-1',
    endpoint: process.env.REACT_APP_DB_ENDPOINT
});

// item追加
export const addItem = (tableName, item) => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: tableName,
        Item: item
    };
    const res = docClient.put(params, (err, data) => {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            return false;
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            return true;
        }
    });
    return res;
}
