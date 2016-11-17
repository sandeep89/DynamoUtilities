var AWS = require("aws-sdk");

AWS.config.update({
    region: 'ap-southeast-1',
    endpoint: "http://localhost:1000",
    accessKeyId: "sample-aws-key",
    secretAccessKey: "sample-aws-secret"
});
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var scanData = function(params) {
    docClient.query(params, function(err, data) {
        if (err) {
            console.log(err);
        } // an error occurred
        else {
            console.log(JSON.stringify(data.Items));
        } // successful response
    });
};

var params = {
    TableName: 'prod-tableName',
    IndexName: "account_id-index",
    KeyConditionExpression: '(account_id = :ai)',
    ExpressionAttributeValues: {
        ':ai': '517'
    },
    Select: 'ALL_ATTRIBUTES'
};

scanData(params);
