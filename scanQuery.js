var AWS = require("aws-sdk");

AWS.config.update({
    region: 'ap-southeast-1',
    endpoint: "http://localhost:1000",
    accessKeyId: "sample-aws-key",
    secretAccessKey: "sample-aws-secret"
});
var dynamodb = new AWS.DynamoDB();


var deleteData = function (tableName) {
var docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName: 'prod-tableName',
	FilterExpression: '(account_id = :ai) AND (active = :act)',
        ExpressionAttributeValues: {
        ':ai': '589390',
		':act': true
        },
        Select: 'ALL_ATTRIBUTES'
    };
    docClient.scan(params, function (err, data) {
        if (err) {
            console.log(err);
        } // an error occurred
        else {
	console.log(data);
/*            data.Items.forEach(function(session){
                console.log(session.oneness_token);
            })*/
        } // successful response
    });
};

deleteData('tableName');