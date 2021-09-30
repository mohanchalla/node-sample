# Steps to run node-sample app run locally
**Step 1:**

Create a newtwok with the name wldnet and with bridge driver
**Step 2:**

1. create a folder **mongodb** in your home directory, under that create the subdirectories like this
`mongodb/data/node1, mongodb/data/node2, mongodb/data/node3, mongodb/log/node1, mongodb/log/node2, mongodb/log/node3`
2. create **mongod.log** file in log directory
`mongodb/log/node1/mongod.log, mongodb/log/node2/mongod.log, mongodb/log/node3/mongod.log`
3. Make mongod user as the owner for mongodb directory
`sudo chown -R mongod:mongod $HOME/mongodb`
Go to **mongo-docker-compose** package and run docker-compose up command
```
docker-compose up -d
```

Once the containers are running exec into db1 container run the setup script which will initiate the mongodb replicaset

```
docker exec -it db1 bash 
  > /scripts/setup.sh
```
Wait until the replica set is configured. Once the setp is complete mongodb is running in replication mode. You can connect to it with the below URL from the application
```
mongodb://admin:admin@db1:27001,db2:27002,db3:27003/star-wars?authSource=admin&replicaSet=rs01&retryWrites=true&w=majority
```
**Step 3:**
1. Go to **web** package and run npm install
```
npm install
```
2. Rn docker compose up
```
docker-compose up -d
```
3. Access the UI in **localhost:3000**
