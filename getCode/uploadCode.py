from google.cloud import datastore
import csv
import sys
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

'''
kind:lang
name: questionid+time
content: code: {code}
'''
def get_all_time(filename):
    rs = []
    with open(filename) as f:
        for l in f:
            rs.append(getTime(l))  
    return rs
def upload(filename):
    f0 = filename.split("/")[1]
    ff = f0[:-4]
    ff = ff.split("_")
    kind = ff[1]  # lang
    ques = ff[2]
    with open(filename) as f:
        for l in f:
            name = ques + "_" + getTime(l)  # question_time
            task_key = datastore_client.key(kind, name)
            if datastore_client.get(task_key)!=None:
                break
            task = datastore.Entity(
                key=task_key, exclude_from_indexes=('code',))
            c = getCode(l)
            task["code"] = c
            datastore_client.put(task)
            print(kind+" upload "+name)

'''
name is question
content is array of lang
'''
def upload_question(filename):
    with open(filename) as f:
        ff = filename.split("/")[1]
        firstline = f.readline()
        if "ERROR" in firstline:
            return
        for i in f:
            firstline+=i

        task_key = datastore_client.key("question",ff[:-4])
        task = datastore.Entity(key=task_key,exclude_from_indexes=('text',))
        task["text"] = firstline
        datastore_client.put(task)
        print("add question:"+filename)

def upload_batch_question(filename):
    with open(filename) as f:
        for l in f:
            upload_question(l[:-1])

def upload_q2l(filename):
    kind = 'q2l'
    ff = filename[:-4]
    ff = ff.split("_")
    name = ff[2]
    task_key = datastore_client.key(kind, name)
    entity = datastore_client.get(task_key)
    if entity==None:
        new_entity = datastore.Entity(
                key=task_key)
        new_entity["lang"]=[ff[1]]
        datastore_client.put(new_entity)
    else:
        entity["lang"].append(ff[1])
        datastore_client.put(entity)


#name is question+lang, content is array of time

def upload_ql2t(filename):
    kind = 'ql2t'
    ff = filename[:-4]
    ff = ff.split("_")
    name = ff[2]
    task_key = datastore_client.key(kind, name)
    entity = datastore_client.get(task_key)
    all_time = get_all_time(filename)
    if entity==None:
        new_entity = datastore.Entity(
                key=task_key)
        new_entity["time"]=all_time
        datastore_client.put(new_entity)
    else:
        if all_time!=entity["time"]:
            entity["time"]=all_time
            datastore_client.put(entity)
#print('Saved {}: {}'.format(task.key.name, task['description']))
# delete all size with 0 
#find question_csv/ -size  0 -print0 |xargs -0 rm -- 
# get all csv  ls o_*_??.csv > u
def upload_batch_code(file):
    with open(file) as f:
        for i in f:
            upload(i[:-1])

def update_batch_codebase(file):
    allquestion = set()
    dict_q2l={}
    dict_ql2t={}
    with open(file) as f:
        for i in f:
            ii = i[:-1].split("/")
            fname = ii[1][:-4]
            s = fname.split("_")
            q = int(s[2])
            l = s[1]
            if q not in dict_q2l:
                dict_q2l[q]=[]
            ql = str(q)+"_"+l
            if ql not in dict_ql2t:
                dict_ql2t[ql]=[]
            dict_q2l[q].append(l)
            dict_ql2t[ql] = get_all_time(i[:-1])
            allquestion.add(q)
    ques = sorted(list(allquestion))
    task_key = datastore_client.key("allquestion", "all")
    new_entity = datastore.Entity(
                key=task_key)
    if new_entity!=None:
        for i in ques:
            new_entity["all_possible"].append(i)
    else:    
        new_entity["all_possible"]=ques
    datastore_client.put(new_entity)
    
    for k in dict_q2l:
        task_key = datastore_client.key("q2l", k)
        new_entity = datastore.Entity(
                key=task_key)
        if new_entity!=None:
            for kk in dict_q2l[k]:
                if kk not in new_entity["lang"]:
                    dict_q2l[k].append(kk)
        else:
            new_entity["lang"]=dict_q2l[k]
        datastore_client.put(new_entity)

    for k in dict_ql2t:
        task_key = datastore_client.key("ql2t", k)
        new_entity = datastore.Entity(
                key=task_key)
        if new_entity!=None:
            for kk in dict_ql2t[k]:
                if kk not in new_entity["time"]:
                    dict_ql2t[k].append(kk)
        else:
            new_entity["time"]=dict_ql2t[k]
        datastore_client.put(new_entity)
    
#upload_batch_code("u")
#lang = sys.argv[1]

def find_no_java(file):
    allquestion = set()
    dict_q2l={}
    with open(file) as f:
        for i in f:
            ii = i[:-1].split("/")
            fname = ii[1][:-4]
            s = fname.split("_")
            q = int(s[2])
            l = s[1]
            if q not in dict_q2l:
                dict_q2l[q]=[]
            dict_q2l[q].append(l)
            
            allquestion.add(q)
    ques = sorted(list(allquestion))
    for q in ques:
        if lang not in dict_q2l[q]:
            print(q)
#find_no_java("u")