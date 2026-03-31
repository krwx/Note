# python

## urllib3

```py
import requests
import urllib3
from requests_negotiate_sspi import HttpNegotiateAuth

class APIClass:
    url = 'http://localhost:5000/api/'

    def __init__(self):
        urllib3.disable_warnings()
        self.auth = HttpNegotiateAuth()
        self.session = requests.Session()
        self.session.auth = self.auth
        self.session.verify = False

    def get_all(self, module: str):
        url = APIClass.url + module
        resp = self.session.get(url)
        return resp.json()
```
