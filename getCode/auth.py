
import requests
import json
import csv
import datetime
lang = ['java', 'c', 'cpp', 'python', 'python3', 'javascript']
c = {}
c["LEETCODE_SESSION"] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMzQ2NjAxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiYWxsYXV0aC5hY2NvdW50LmF1dGhfYmFja2VuZHMuQXV0aGVudGljYXRpb25CYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiMDIxNmU5NjVjNzc5ZGMxYjRjMzkzYzdmMGRhNWJjY2YxZWI2NjQ2ZiIsImlkIjozNDY2MDEsImVtYWlsIjoidHpob25nMUBhbmRyZXcuY211LmVkdSIsInVzZXJuYW1lIjoidGMzIiwidXNlcl9zbHVnIjoidGMzIiwiYXZhdGFyIjoiaHR0cHM6Ly9zMy1sYy11cGxvYWQuczMuYW1hem9uYXdzLmNvbS91c2Vycy90YzMvYXZhdGFyLnBuZyIsInRpbWVzdGFtcCI6IjIwMTgtMDYtMTYgMTQ6NDk6NTEuMzc4NDk5KzAwOjAwIiwiUkVNT1RFX0FERFIiOiIxODQuMTkxLjIzMC45OCIsIklERU5USVRZIjoiYmY0ODZmM2FiYTRjNDMyNjMyYmRlZDBmOTlhN2JkNDIiLCJfc2Vzc2lvbl9leHBpcnkiOjB9.7hj0y_h3itCb4uhuzC4zVkwsaj7gAA9xQhWAUcza5pI"
c["csrftoken"] = "rwfG2jtst5FsTzTb1B9jbNIyGA8a8tRycqUAGqtFL5wWGb2SskNMyqHpZoWBFAuY"


def getone(q, l):
    with open("o_{1}_{0}.csv".format(q, l), 'w') as f:
        spamwriter = csv.writer(
            f, delimiter=',', quoting=csv.QUOTE_ALL, quotechar='"')
        count = 0
        ra = 200
        if l in ['python', 'python3', 'javascript']:
            ra = 400
        for time in range(ra):
            r = requests.get(
                "https://leetcode.com/submissions/api/detail/{0}/{1}/{2}".format(q, l, time + 1), cookies=c)
            try:
                rs = r.json()
                if 'error' in rs and time > 100:
                    break
                if count > 100:
                    break
                if 'error' in rs or 'code' not in rs:
                    continue
                count += 1
                spamwriter.writerow([i + 1, l, time, repr(rs["code"])])
                print("write" + str(time))
            except:
                continue


getone(771, "c")

for i in range(824, 900):
    for l in lang:
        with open("o_{1}_{0}.csv".format(i + 1, l), 'w') as f:
            spamwriter = csv.writer(
                f, delimiter=',', quoting=csv.QUOTE_ALL, quotechar='"')
            count = 0
            ra = 200
            if l in ['python', 'python3', 'javascript']:
                ra = 400
            for time in range(ra):
                r = requests.get(
                    "https://leetcode.com/submissions/api/detail/{0}/{1}/{2}".format(i + 1, l, time + 1), cookies=c)
                try:
                    rs = r.json()
                    if 'error' in rs and time > 100:
                        break
                    if count > 100:
                        break
                    if 'error' in rs or 'code' not in rs:
                        continue
                    count += 1
                    spamwriter.writerow([i + 1, l, time, repr(rs["code"])])
                    print("write" + str(time))
                except:
                    continue


'''
create table `code` (
    `uuid` bigint(20) not null AUTO_INCREMENT,
	`question` int(20) not null,
	`lang` varchar(20) not null,
    `time` int(20) not null,
	`code` varchar(5000) not null,
	primary key (uuid)
);

mysql -u root -ptest --local-infile=1 -e "USE code; load data local infile 'o_c_1.csv' into table code columns terminated by ',' OPTIONALLY ENCLOSED BY '\"' ESCAPED BY '\"' (question, lang, time, code)"
'''
