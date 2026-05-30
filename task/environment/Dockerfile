FROM alpine:latest
WORKDIR /app
COPY repo/ .
CMD ["echo", "No test runner configured"]
RUN mkdir -p /installed-agent
RUN apk add --no-cache bash tmux util-linux
RUN command -v patch >/dev/null 2>&1 || ( (apt-get update && apt-get install -y --no-install-recommends patch && rm -rf /var/lib/apt/lists/*) 2>/dev/null || apk add --no-cache patch 2>/dev/null || yum install -y patch 2>/dev/null || true )
