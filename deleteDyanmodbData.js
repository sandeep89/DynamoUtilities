var AWS = require("aws-sdk");

AWS.config.update({
    region: 'ap-southeast-1',
    endpoint: "http://localhost:1000",
    accessKeyId: "sample-aws-key",
    secretAccessKey: "sample-aws-secret"
});
var dynamodb = new AWS.DynamoDB();


var deleteData = function (tableName) {

    var params = {
        TableName: 'tableName',
    };
    dynamodb.scan(params, function (err, data) {
        if (err) {
            console.log(err);
        } // an error occurred
        else {
            data.Items.forEach(function(session){
                var docClient = new AWS.DynamoDB.DocumentClient();
                docClient.delete({
                    TableName: 'tableName',
                    Key: {
                        oneness_token: session.oneness_token.S
                    }
                }, function (err, data) {
                    console.log(err, data);
                });
                console.log(session.oneness_token);
            })
        } // successful response
    });
};

deleteData('tableName');