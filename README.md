get or post the url by command line

## Install:
```
npm install -g getpost
```

## Use:
GET: 
```
getpost [g] [http://]www.example.com?query=xxxxx
get [http://]www.example.com?query=xxxx
```

POST: 
```
getpost p [http://]www.example.com[?query=xxxxx] ['{"headers": {"User-Agent": "request"}, "form": {"name": "name"}}']
post [http://]www.example.com[?query=xxxx] ['{"headers": {"User-Agent": "request"}, "form": {"name": "name"}}']
```

## Note:
For pretty-printing JSON, please install [json](https://www.npmjs.com/package/json).

