import AWS from 'aws-sdk';

export class DynamoController {
    constructor() {
        this.docClient = new AWS.DynamoDB.DocumentClient({
            region: 'ap-northeast-1',
            endpoint: process.env.REACT_APP_DB_ENDPOINT,
            credentials: {
                accessKeyId: process.env.REACT_APP_AWS_ACCESSKEY,
                secretAccessKey: process.env.REACT_APP_AWS_SEC_ACCESSKEY
            }
        });
    }

    // item追加
    async addItem(tableName, item) {
        console.info('1');
        const params = {
            TableName: tableName,
            Item: item
        };
        const res = await this.docClient.put(params, (err, data) => {
            console.info('2');
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                return false;
            } else {
                console.info("Added item:", JSON.stringify(data, null, 2));
                return true;
            }
        }).promise();
        console.info('3');
        return res;
    }

    // item取得（プライマリキーによる取得）
    // async getItem(tableName, prm) {
    //     const params = {
    //         TableName: tableName,
    //         Key: prm
    //     };
    //     const res = await this.docClient.get(params, (err, data) => {
    //         if (err) {
    //             console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    //             res = undefined;
    //         } else {
    //             console.log("GetItem succeeded:", JSON.stringify(data.Item, null, 2));
    //             res = data.Item;
    //         }
    //     }).promise();
    //     return res;
    // }
    async getItem(tableName, prm) {
        const params = {
            TableName: tableName,
            Key: prm
        };
        try {
            const res = await this.docClient.get(params).promise();
            console.log("GetItem succeeded:", JSON.stringify(res.Item, null, 2));
            return res.Item;
        } catch (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            return undefined;
        }
    }
}
