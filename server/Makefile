IMAGE_NAME := nodechatdb
IMAGE_TAG := latest
DOCKER_HUB_USERNAME := dubroy

.PHONY: dev
dev:
	@echo "Building Docker image..."
	docker build -t $(IMAGE_NAME):$(IMAGE_TAG) .
	@echo "Running Docker container..."
	docker run -d -p 3000:3000 $(IMAGE_NAME):$(IMAGE_TAG)

.PHONY: deploy
deploy:
	@echo "Building Docker image..."
	docker build -t $(DOCKER_HUB_USERNAME)/$(IMAGE_NAME):$(IMAGE_TAG) .
	@echo "Pushing Docker image..."
	docker push $(DOCKER_HUB_USERNAME)/$(IMAGE_NAME):$(IMAGE_TAG)
