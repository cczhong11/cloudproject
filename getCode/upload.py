from google.cloud import datastore
import csv
from io import StringIO
# Instantiates a client
datastore_client = datastore.Client()


def getTime(l):
    ll = l.split(",")
    return ll[2][1:-1]


def getCode(l):
    f = StringIO(l)
    reader = csv.reader(f, delimiter=',', quotechar='"')
    for r in reader:
        return eval(r[3])


def upload(filename):
    ff = filename[:-4]
    ff = ff.split("_")
    kind = ff[1]  # lang
    ques = ff[2]
    with open(filename) as f:
        for l in f:
            name = ques + "_" + getTime(l)  # question_time
            task_key = datastore_client.key(kind, name)
            task = datastore.Entity(
                key=task_key, exclude_from_indexes=('code',))
            c = getCode(l)
            task["code"] = c
            datastore_client.put(task)


#print('Saved {}: {}'.format(task.key.name, task['description']))
with open("u") as f:
    for i in f:
        upload(i[:-1])
