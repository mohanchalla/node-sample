#!/bin/bash

mongo --port 27001 <<EOF
var cfg = {
    "_id": "rs01",
    "version": 1,
    "members": [
        {
            "_id": 0,
            "host": "db1:27001",
            "priority": 1
        },
        {
            "_id": 1,
            "host": "db2:27002",
            "priority": 0
        },
        {
            "_id": 2,
            "host": "db3:27003",
            "priority": 0
        }
    ]
};
rs.initiate(cfg, { force: true });
rs.status();
EOF
sleep 50

mongo --port 27001 <<EOF
rs.status();
use admin;
db.createUser(
    {
    user: "admin",
    pwd: "admin",
    roles: [ { role: "root", db: "admin" } ]
    });
db.auth("admin", "admin");
rs.isMaster();
EOF
