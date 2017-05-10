.PHONY: docs test target

all: clean target

run: target
	java -jar target/photon.jar -ui.port 3500

run-mongo: target
	java -jar target/photon.jar -db.backend mongo -mongodb.host  mongodb://shared-mongo-mongo-cluster-1,shared-mongo-mongo-cluster-2,shared-mongo-mongo-cluster-3 -ui.port 3500


build: target
target:
	$(shell cp `lein do clean, uberjar | sed -n 's/^Created \(.*standalone\.jar\)/\1/p'` target/photon.jar)

docker:
	docker build . -t photon

clean:
	lein clean
	rm -rf target
	rm -fR resources/public/ui/js

test: target
	lein midje
