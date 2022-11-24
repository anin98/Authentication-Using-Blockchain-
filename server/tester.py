import hashlib
import json
string = {'id': '453d428bf71c4d059dfde27c6a30d1d5', 'name': 'coffee', 'email': 'coffee@gmail.com', 'password': 'coffee', 'timestamp': 1669220507892}
print("Before ", string)
string = json.dumps(string, separators=(',', ':'))
print("After ",string)


# count =0;
# for i in range(0,6):
#     count=count+1
#     hash = hashlib.sha256(string.encode()).hexdigest()
#     print("Hash no ", count, "is", hash)
