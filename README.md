# Gaza Sky Geeks Starter Project

Welcome to the start of your project. Here are the beginnings of a React web app using GraphQL to communicate with Django and Hasura on the back end.  
  
Looking forward to seeing what you create :)
## Getting Started

Install Docker:
https://docs.docker.com/install/

### Secrets
Create a file called .env in the same directory as this README containing:
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
```

Build and run the project:  
$ docker-compose up --build

### Configure Hasura
In a browser go to:  
http://localhost:8080/console/data/schema/public  

Click 'Track' next to the posts_post table

### Starting Django
Open a shell in Django app:  
$ docker exec -it django /bin/bash  
$ python manage.py migrate  
$ python manage.py runserver 0.0.0.0:8000  

## Useful Information

### Webapp builder
Open a shell in the webapp build container:  
$ docker exec -it webapp /bin/bash  

##Hasura
Set up subscriptions and experiment with subscription queries in the Hasura console:
http://localhost:8080

##GraphQL
To experiment with graphql queries and mutations go to:  
http://localhost:8000/v1/graphql

###Live Reload
Live Reload is a browser extension which listens to webpack and reloads the webpage when a new build is available
https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en

## Troubleshooting

Sometimes, if Docker doesn't shut down correctly containers can be left running. To stop and remove all containers:  
$ docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
