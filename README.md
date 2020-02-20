# auth-server

```bash
mongod #start db sever
yarn start #start watch compiler + copies assets
```

```bash
#create rsa key pairs.
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key -q -N "" # Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
cat jwtRS256.key
cat jwtRS256.key.pub
mv jwtRS256.key private.key
mv jwtRS256.key.pub public.key
```