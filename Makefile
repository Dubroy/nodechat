IMAGE_NAME := nodechatdb
IMAGE_TAG := latest
DOCKER_HUB_USERNAME := dubroy

.PHONY: dev
dev:
	docker-compose down
	docker-compose build
	docker-compose up -d

.PHONY: front
front:
	docker-compose up -d --no-deps --build client

.PHONY: deploy
deploy:
	@echo "Building Docker image..."
	docker build -t $(DOCKER_HUB_USERNAME)/$(IMAGE_NAME):$(IMAGE_TAG) .
	@echo "Pushing Docker image..."
	docker push $(DOCKER_HUB_USERNAME)/$(IMAGE_NAME):$(IMAGE_TAG)
