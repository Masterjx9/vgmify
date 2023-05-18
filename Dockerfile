FROM python:3.9.13-slim-buster

WORKDIR /app

COPY requirements.txt requirements.txt

RUN apt-get update && pip install --upgrade pip && pip install -r requirements.txt \
&& rm -rf /var/cache/apk/*

COPY . /app

RUN pip freeze
RUN printenv
CMD ["python", "app.py"]
# SHELL ["/bin/bash", "-c"]

# export DOCKER_DEFAULT_PLATFORM=linux/amd64

# some code that could be useful for running docker with volume locally for testing
# docker run -p 5000:5000 -v C:\Users\RKerrigan\Scripts\pirate:/app --name mysockettest -t sockettest
