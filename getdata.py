import requests
import json
from http.cookiejar import CookieJar
lang = ['java', 'c', 'cpp', 'python', 'javascript']
session = requests.Session()
session.cookies = CookieJar("__cfduid=d21a0712268000789e1894973cf946d581526773413; _ga=GA1.2.1675785445.1526779879; _gid=GA1.2.1337676647.1529160586; csrftoken=rwfG2jtst5FsTzTb1B9jbNIyGA8a8tRycqUAGqtFL5wWGb2SskNMyqHpZoWBFAuY; LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiMzQ2NjAxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiYWxsYXV0aC5hY2NvdW50LmF1dGhfYmFja2VuZHMuQXV0aGVudGljYXRpb25CYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiMDIxNmU5NjVjNzc5ZGMxYjRjMzkzYzdmMGRhNWJjY2YxZWI2NjQ2ZiIsImlkIjozNDY2MDEsImVtYWlsIjoidHpob25nMUBhbmRyZXcuY211LmVkdSIsInVzZXJuYW1lIjoidGMzIiwidXNlcl9zbHVnIjoidGMzIiwiYXZhdGFyIjoiaHR0cHM6Ly9zMy1sYy11cGxvYWQuczMuYW1hem9uYXdzLmNvbS91c2Vycy90YzMvYXZhdGFyLnBuZyIsInRpbWVzdGFtcCI6IjIwMTgtMDYtMTYgMTQ6NDk6NTEuMzc4NDk5KzAwOjAwIiwiUkVNT1RFX0FERFIiOiIxODQuMTkxLjIzMC45OCIsIklERU5USVRZIjoiYmY0ODZmM2FiYTRjNDMyNjMyYmRlZDBmOTlhN2JkNDIiLCJfc2Vzc2lvbl9leHBpcnkiOjB9.7hj0y_h3itCb4uhuzC4zVkwsaj7gAA9xQhWAUcza5pI; __atuvc=4%7C22%2C12%7C23%2C24%7C24")
for i in range(2):
    for l in lang:
        for time in range(100):
            r = session.get(
                "https://leetcode.com/submissions/api/detail/{0}/{1}/{2}".format(i + 1, l, time + 1))
            print(r.text)
