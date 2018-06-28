const Datastore = require('@google-cloud/datastore');
const ds = Datastore({projectId: 'leetcode-207514'});

function getCode(q, l, t, cb) {
  const query =
      ds.createQuery(l).filter('__key__', '=', ds.key([l, q + '_' + t]));
  var rs = '...';
  ds.runQuery(query)
      .then(results => {
        const tasks = results[0];
        console.log(q + '_' + t);
        // console.log(tasks[0].code);
        cb(tasks[0].code);
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  return 'xxx';
}
getCode('1', 'java', '1', function(data) {
  console.log(data);
})