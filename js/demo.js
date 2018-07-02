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
        cb(results);
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  return 'xxx';
}

function getQ2L(q,cb){
    const query =
    ds.createQuery("q2l").filter('__key__', '=', ds.key(["q2l", parseInt(q)]));
    var rs="...";
    ds.runQuery(query)
    .then(results => {
      const tasks = results[0];
     data = tasks[0].lang
  cb(data);
    })
    .catch(err => {
      cb('ERROR:'+err);
    });
}
function getQL2T(q,l,cb){
    const query =
    ds.createQuery("ql2t").filter('__key__', '=', ds.key(["ql2t", q + '_' + l]));
    var rs="...";
    ds.runQuery(query)
    .then(results => {
      const tasks = results[0];
      rs= tasks[0].time;
  cb(rs);
    })
    .catch(err => {
      cb('ERROR:', err);
    });
}

function getQuestion(q,cb){
    const query =
    ds.createQuery("question").filter('__key__', '=', ds.key(["question", q]));
    var rs="...";
    ds.runQuery(query)
    .then(results => {
      const tasks = results[0];
      rs= tasks[0].text;
  cb(rs);
    })
    .catch(err => {
      cb('ERROR:', err);
    });
}
function getAll(q,cb){
    const query =
    ds.createQuery("allquestion").filter('__key__', '=', ds.key(["allquestion", "all"]));
    var rs="...";
    ds.runQuery(query)
    .then(results => {
      const tasks = results[0];
      rs= tasks[0].all_possible;
      if(rs.includes(q)) cb(true)
      else cb(false)

    })
    .catch(err => {
      cb('ERROR:', err);
    });
}
getAll(700,function(data) {
  console.log(data);
})