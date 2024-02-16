import sys
import json
from urllib import request

# python3 index.py '{"filePath": "my-data.csv", "url": "http://localhost:3000"}'

def main():
  item = json.loads(sys.argv[1])
  print(item)
  url = item.get('url')
  file_path = item.get('filePath')
  data = open(file_path, 'rb').read()
  print(data)
  req = request.Request(url, data)
  response = request.urlopen(req).read().decode('utf-8')
  print(response)


if __name__ == '__main__':
  main()
