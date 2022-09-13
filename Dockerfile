FROM python:3.9.13-slim-buster

WORKDIR /app

COPY requirements.txt requirements.txt

RUN apt-get update && pip install --upgrade pip && pip install -r requirements.txt \
&& rm -rf /var/cache/apk/*

COPY . /app

CMD ["python", "app.py"]
# SHELL ["/bin/bash", "-c"]

# export DOCKER_DEFAULT_PLATFORM=linux/amd64