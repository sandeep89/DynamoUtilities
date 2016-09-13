var Redshift = require('node-redshift');
 
var client = {
  user: user,
  database: database,
  password: password,
  port: port,
  host: host,
};
 
var redshiftClient = new Redshift(client);
 
var queryString = 'select count(*), ["$0$event_tstamp__tstamp":aggregation] from public.__events__ where ["$0$event_tstamp__tstamp"=daterange] group by ["$0$event_tstamp__tstamp":aggregation]';

redshiftClient.query(queryString, {"raw":true}, function (err, data) {
	 console.log(err);
	 console.log(data);
});
