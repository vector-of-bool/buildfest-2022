# Buildfest 2022 PHP Project



## How to run the app locally

1. Start MongoDB 6.0+ sharded cluster locally. Using `mlaunch` the command should be `mlaunch init --dir ~/mdb/6.0.0-ent/sh --setParameter enableTestCommands=1 --setParameter diagnosticDataCollectionEnabled=false --replicaset --name test-rs --nodes 2 --sharded 1 --mongos 1 --bind_ip_all`. It is
important to have only one mongos.
2. Build the container: `docker build -t school_app .`
3. Run the app: `docker run -v $(pwd)/src:/school_app/src -p8080:80 -e MONGODB_URI='mongodb://mongo:27017/' -e DATABASE='school_app' --add-host=mongo:172.17.0.1 school_app`
4. Open [http://localhost:8080](http://localhost:8080).
