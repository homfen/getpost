get or post the url by command line

## Install:
```
npm install -g getpost
```

## Use:
GET: 
```shell
get [http://]www.example.com?query=xxxx
get www.example.com/example.jpg
getpost [g] [http://]www.example.com?query=xxxxx
```

POST: 
```shell
post [http://]www.example.com[?query=xxxx] ['{"headers": {"User-Agent": "request"}, "form": {"name": "name"}}']
getpost p [http://]www.example.com[?query=xxxxx] ['{"headers": {"User-Agent": "request"}, "form": {"name": "name"}}']
```

## Note:
1. If the response Content-Type is not 'text/\*' or '\*/json', it will save the file at current directory.
2. For pretty-printing JSON, please install [json](https://www.npmjs.com/package/json).

