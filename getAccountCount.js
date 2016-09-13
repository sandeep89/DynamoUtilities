var AWS = require("aws-sdk");

AWS.config.update({
    region: 'ap-southeast-1',
    endpoint: "http://localhost:1000",
    accessKeyId: "sample-aws-key",
    secretAccessKey: "sample-aws-secret"
});

var accountsReport = {
    accountWithMobEmail: {},
    accountWithMob: {},
    accountWithEmail: {}
};
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var scanData = function(params) {
    docClient.scan(params, function(err, data) {
        if (err) {
            console.log(err);
        } // an error occurred
        else {
            //console.log(data);
            processItems(data.Items);
            if (data.LastEvaluatedKey) {
                params['ExclusiveStartKey'] = data.LastEvaluatedKey;
                //console.log(params);
                accountWithMobEmailKeys = Object.keys(accountsReport.accountWithMobEmail).length;
                accountWithMobKeys = Object.keys(accountsReport.accountWithMob).length;
                accountWithEmailKeys = Object.keys(accountsReport.accountWithEmail).length;
                console.log('accountWithMobEmail : ' + accountWithMobEmailKeys);
                console.log('accountWithMobKeys : ' + accountWithMobKeys);
                console.log('accountWithEmailKeys : ' + accountWithEmailKeys);
                scanData(params);
            } else {
                accountWithMobEmailKeys = Object.keys(accountsReport.accountWithMobEmail).length;
                accountWithMobKeys = Object.keys(accountsReport.accountWithMob).length;
                accountWithEmailKeys = Object.keys(accountsReport.accountWithEmail).length;
                console.log('accountWithMobEmail : ' + accountWithMobEmailKeys);
                console.log('accountWithMobKeys : ' + accountWithMobKeys);
                console.log('accountWithEmailKeys : ' + accountWithEmailKeys);
            }
        } // successful response
    });
};

var processItems = function(items) {
    items.forEach(function(item) {
        var accounts = JSON.parse(item.profiles.accounts);
        if (accounts) {
            if (accounts.email && accounts.email.length > 0 &&
                accounts.mobile && accounts.mobile.length > 0) {
                accountsReport.accountWithMobEmail[item.account_id] = accounts;
                delete accountsReport.accountWithEmail[item.account_id];
                delete accountsReport.accountWithMob[item.account_id];
            } else if (accounts.email && accounts.email.length > 0) {
                accountsReport.accountWithEmail[item.account_id] = accounts;
            } else if (accounts.mobile && accounts.mobile.length > 0) {
                accountsReport.accountWithMob[item.account_id] = accounts;
            }
        }
    });
}
var params = {
    TableName: 'prod-tableName',
    FilterExpression: '(active = :act)',
    ExpressionAttributeValues: {
        ':act': true
    },
    Select: 'ALL_ATTRIBUTES'
};

scanData(params);
