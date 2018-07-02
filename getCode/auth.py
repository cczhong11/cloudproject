import requests
import json
import csv
import datetime
import sys
lang = ['java', 'c', 'cpp', 'python', 'python3', 'javascript']
c = {}
c["LEETCODE_SESSION"] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMzQ2NjAxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiYWxsYXV0aC5hY2NvdW50LmF1dGhfYmFja2VuZHMuQXV0aGVudGljYXRpb25CYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiMDIxNmU5NjVjNzc5ZGMxYjRjMzkzYzdmMGRhNWJjY2YxZWI2NjQ2ZiIsImlkIjozNDY2MDEsImVtYWlsIjoidHpob25nMUBhbmRyZXcuY211LmVkdSIsInVzZXJuYW1lIjoidGMzIiwidXNlcl9zbHVnIjoidGMzIiwiYXZhdGFyIjoiaHR0cHM6Ly9zMy1sYy11cGxvYWQuczMuYW1hem9uYXdzLmNvbS91c2Vycy90YzMvYXZhdGFyLnBuZyIsInRpbWVzdGFtcCI6IjIwMTgtMDYtMjcgMDE6MzQ6MzIuODg4ODUxKzAwOjAwIiwiUkVNT1RFX0FERFIiOiIxODQuMTkxLjIzMC45OCIsIklERU5USVRZIjoiZjlkOTdkYWFlNGJmYzg3ZmFhOTY2ZTM0YzAzYzZmNTQiLCJfc2Vzc2lvbl9leHBpcnkiOjB9.64Q1yUIijH7r0PZst6qL0FT76xbtTNW7_rrDAmotebM"
c["csrftoken"] = "5Ss6u2n0qOovfeuYlR0S0RWHUaskQWBB2LklP6ieE8X5PACfDTJcMnNJqhEC1D5h"


def getone(q, l,start=0,end=200,sep=1):
    with open("o_{1}_{0}.csv".format(q, l), 'w') as f:
        spamwriter = csv.writer(
            f, delimiter=',', quoting=csv.QUOTE_ALL, quotechar='"')
        count = 0
        ra = end
        if l in ['python', 'python3', 'javascript']:
            ra = end*2
        print(q)
        for time in range(start,ra,sep):
            r = requests.get(
                "https://leetcode.com/submissions/api/detail/{0}/{1}/{2}".format(q, l, time), cookies=c)
            try:
                if r.text[0]!="{":
                    continue
                rs = r.json()
                if count > 100:
                    break
                if 'error' in rs or 'code' not in rs:
                    continue
                count += 1
                spamwriter.writerow([count + 1, l, time, repr(rs["code"])])
                print("write" + str(time))
            except Exception as ex:
                print(ex)
                continue
    return "o_{1}_{0}.csv".format(q, l)
lang = sys.argv[1]

def download_from_file(file,s,e,sep):
    with open(file) as f:
        for l in f:
            q = l[:-1]
            getone(int(q),lang,s,e,sep)

download_from_file("z",0,500,10)