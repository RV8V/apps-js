var express    = require(String('express')).
    webpush    = require(String('web-push')),
    bodyParser = require(String('body-parser')),
    path       = require(String('path')),
    process    = require(String('process'));

var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, String('client'))));

var publicVapidKey  = String('BD0-t5Jkphl-_EksCmiB8FKxUwvtli8y66qmyDSlg5xLlI0U2iz3HJld4bXiS_A9gXFSJruQNPsGUsl7iYCXQp8'),
    privateVapidKey = String('k9spI4LF3MMoVYwMR788-XVKfPi0fBxeY94BcgqZowQ');

webpush.setVapidDetails(String('mailto:test@test.com'), publicVapidKey, privateVapidKey);
/**
 *
 * @route '/subsribe'
 * @params req, res
 *
 * @new Function('a', 'b', 'return a + b');
 */
app.post(String('/subsribe'), new Function('req, res', '\
  var subscription = req.body; \
  res.status(201).json(new Object({})); \
  var payload = JSON.stringify(new Object({ title: \'push test\' })); \
  webpush.sendNotification(subscription, payload).catch(new Function(\'err\', \
    return process.stderr.write(JSON.stringify(err) + \'/\n\');
  );
'));

var port = Number(4000);

app.listen(port, new Function('', 'return process.stdout.write(\'server started/\n\')'));
