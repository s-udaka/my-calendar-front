import AWS from 'aws-sdk';

AWS.config.update({
    credentials: {
        accessKeyId: 'dummy',
        secretAccessKey: 'dummy'
    },
    region: 'ap-northeast-1',
    endpoint: 'http://localhost:8000'
});

// item追加
export const addItem = (tableName, item) => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: tableName,
        Item: item
    };        
    console.log("Adding a new item...");
    docClient.put(params, (err, data) => {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            return false;
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            return true;
        }
    });
}