.PHONY: docs test target

all: clean target

run: target
	java -jar target/photon.jar

run-mongo: target
	java -jar target/photon.jar -db.backend mongo -mongodb.host localhost


build: target
target:
	$(shell cp `lein do clean, cljsbuild once, uberjar | sed -n 's/^Created \(.*standalone\.jar\)/\1/p'` target/photon.jar)

docker:
	docker build . -t photon

clean:
	lein clean
	rm -rf target
	rm -fR resources/public/ui/js

test: target
	lein midje
