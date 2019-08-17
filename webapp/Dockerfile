FROM node:latest

RUN apt-get update && apt-get upgrade -y && apt-get autoremove && apt-get autoclean
RUN apt-get install -y vim

#RUN npm install -g webpack webpack-cli

ARG PROJECT=webapp
ARG PROJECT_DIR=/${PROJECT}
RUN mkdir -p $PROJECT_DIR
WORKDIR $PROJECT_DIR
RUN cd $PROJECT_DIR
COPY package.json ./
#RUN npm install
# --no-progress --ignore-optional
#RUN touch testing_testing

EXPOSE 35729
EXPOSE 7000
STOPSIGNAL SIGINT
#CMD ["sleep", "infinity"]
CMD ["npm", "run-script", "start"]
#CMD ["webpack"]
#CMD ["npm", "install"]
