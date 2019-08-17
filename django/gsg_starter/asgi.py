import channels
import django
import asyncio

#from .consumers import RecognitionWsConsumer

application = channels.routing.ProtocolTypeRouter(
    {
    #    "websocket": channels.routing.URLRouter(
    #        [django.urls.path("graphql", RecognitionWsConsumer)]
    #    )
    }
)
