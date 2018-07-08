import requests
import json
import csv
import datetime
import sys
lang = ['java', 'c', 'cpp', 'python', 'python3', 'javascript']
c = {}
c["LEETCODE_SESSION"] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMzQ2NjAxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiYWxsYXV0aC5hY2NvdW50LmF1dGhfYmFja2VuZHMuQXV0aGVudGljYXRpb25CYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiMDIxNmU5NjVjNzc5ZGMxYjRjMzkzYzdmMGRhNWJjY2YxZWI2NjQ2ZiIsImlkIjozNDY2MDEsImVtYWlsIjoidHpob25nMUBhbmRyZXcuY211LmVkdSIsInVzZXJuYW1lIjoidGMzIiwidXNlcl9zbHVnIjoidGMzIiwiYXZhdGFyIjoiaHR0cHM6Ly9zMy1sYy11cGxvYWQuczMuYW1hem9uYXdzLmNvbS91c2Vycy90YzMvYXZhdGFyLnBuZyIsInRpbWVzdGFtcCI6IjIwMTgtMDctMDggMDE6Mjc6MzcuOTM1NDAwKzAwOjAwIiwiUkVNT1RFX0FERFIiOiIxODQuMTkxLjIzMC45OCIsIklERU5USVRZIjoiZjlkOTdkYWFlNGJmYzg3ZmFhOTY2ZTM0YzAzYzZmNTQiLCJfc2Vzc2lvbl9leHBpcnkiOjB9.6DlYKoc5Af7auPkPyzA9CVaNLj2euiUL0gTpsUYy_AI"
c["csrftoken"] = "QFniQuQ3QiIQvFg8hRCvAQocu0mMh03uuPZ5iPgzXgQE1yxbT7IuNe1ERSjLX4hD"
def getQuestionDetail(filename):
    
    with open(filename) as f:
        url = ''
        for l in f:
            if "description" in l:
                url = l[:-1]
                break
        
        question = l[30:-14]
        print(question)
        headers={"referer":url,"x-csrftoken": "QFniQuQ3QiIQvFg8hRCvAQocu0mMh03uuPZ5iPgzXgQE1yxbT7IuNe1ERSjLX4hD",'Content-Type': 'application/json'}
        postdata = {"operationName":"getQuestionDetail","variables":{"titleSlug":question}}
        postdata["query"]="query getQuestionDetail($titleSlug: String!) {\n  isCurrentUserAuthenticated\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    questionTitle\n    difficulty\n    similarQuestions\n     categoryTitle\n    article\n    questionDetailUrl\n    libraryUrl\n    companyTags {\n      name\n      slug\n      translatedName\n      __typename\n    }\n    topicTags {\n      name\n      slug\n      translatedName\n      __typename\n    }\n  }}\n"
        rs = requests.post("https://leetcode.com/graphql",json=postdata,cookies=c,headers=headers).json()
        print(rs)
        #rs = json.loads(rs)
        with open("questiontagandcompany/tag_"+filename[12:],'w') as ff:
            tmp = rs['data']['question']
            ff.write(tmp['questionId']+"\n")
            ff.write(tmp['questionFrontendId']+"\n")
            ff.write(tmp['questionTitle']+"\n")
            ff.write(tmp['difficulty']+"\n")
            for k in json.loads(tmp['similarQuestions']):
                ff.write(k["title"]+":"+k["difficulty"]+",")
            ff.write("\n")
            if 'url' in tmp['article']:
                ff.write(json.loads(tmp['article'])["url"]+"\n")
            ff.write(tmp['questionDetailUrl']+"\n")
            for i in (tmp['companyTags']):
                ff.write(i["name"]+",")
            ff.write("\n")
            for i in (tmp['topicTags']):
                ff.write(i["name"]+",")
            ff.write("\n")
            
with open("q") as f:
    for i in f:
        if int(i[12:-5])<426:
            continue
        try:
            getQuestionDetail(i[:-1])
        except:
            continue            


