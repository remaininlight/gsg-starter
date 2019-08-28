# GSG Starter
# Version: 0.0.1
FROM ubuntu:xenial
FROM python:3
# Install Python and Package Libraries
RUN apt-get update && apt-get upgrade -y && apt-get autoremove && apt-get autoclean

# Dockerize
RUN apt-get install -y wget
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN apt-get install -y \
    #libffi-dev \
    libssl-dev \
    #default-libmysqlclient-dev \
    #libxml2-dev \
    #libxslt-dev \
    #libjpeg-dev \
    #libfreetype6-dev \
    #zlib1g-dev \
    net-tools \
    vim
    #redis-server

# Project Files and Settings
ARG PROJECT=django
ARG PROJECT_DIR=/var/www/${PROJECT}
RUN mkdir -p $PROJECT_DIR
WORKDIR $PROJECT_DIR
RUN cd $PROJECT_DIR
ADD ./requirements.txt ./requirements.txt
RUN pip install -r requirements.txt

# Server
EXPOSE 3000
EXPOSE 8000
STOPSIGNAL SIGINT
CMD ["sleep", "infinity"]
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]