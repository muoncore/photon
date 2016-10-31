all: build

run: build
	java -jar target/photon-*-standalone.jar

build: clean
	$(shell cp `lein do clean, cljsbuild once, uberjar | sed -n 's/^Created \(.*standalone\.jar\)/\1/p'` target/photon.jar)

docker:
	docker build . -t photon

docker-release: build docker
	docker tag photon simplicityitself-muon-image.jfrog.io/photon:latest
	docker push simplicityitself-muon-image.jfrog.io/photon:latest

clean:
	lein clean
	rm -fR resources/public/ui/js

