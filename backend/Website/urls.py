from django.urls import path
from .views.home import home
from .views.login_user import login_user, logout_user
from .views.user import UserList, UserDetail
from .views.review import ReviewList, ReviewDetail, ReviewByProduction, ReviewByProductionStats
from .views.production import ProductionList, ProductionDetail, ProductionByActor
from .views.actor import ActorList, ActorDetail, ActorByProduction
from .views.to_watch import ToWatchList, ToWatchDetail, ToWatchByProduction, ToWatchByUser
from .views.favorites_user_production import FUPList, FUPDetail, FUPByProduction, FUPByUser
from .views.actor_production import ActorProductionList, ActorProductionDetail, ActorProductionByProduction, ActorProductionByActor
from .views.country import CountryList, CountryDetail
from .views.genre import GenreList, GenreDetail


urlpatterns = [
    path('', home, name='home'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),

    path('users', UserList.as_view(), name="user-list"),
    path('users/<int:id>', UserDetail.as_view(), name="user-detail"),

    path('reviews', ReviewList.as_view(), name="review-list"),
    path('reviews/<int:id>', ReviewDetail.as_view(), name="review-detail"),
    path('reviewsByProduction/<int:id>', ReviewByProduction.as_view(), name="review-by-production-list"),
    path('reviewsByProductionStats/<int:id>', ReviewByProductionStats.as_view(), name="review-by-production-stats"),

    path('productions', ProductionList.as_view(), name="production-list"),
    path('productions/<int:id>', ProductionDetail.as_view(), name="production-detail"),
    path('productionsByActor/<int:id>', ProductionByActor.as_view(), name="production-by-actor-list"),

    path('actors', ActorList.as_view(), name="actor-list"),
    path('actors/<int:id>', ActorDetail.as_view(), name="actor-detail"),
    path('actorsByProduction/<int:id>', ActorByProduction.as_view(), name="actor-by-production-list"),

    path('toWatch', ToWatchList.as_view(), name="to-watch-list"),
    path('toWatch/<int:id>', ToWatchDetail.as_view(), name="to-watch-detail"),
    path('toWatchByProduction/<int:id>', ToWatchByProduction.as_view(), name="to-watch-by-production-list"),
    path('toWatchByUser/<int:id>', ToWatchByUser.as_view(), name="to-watch-by-user-list"),

    path('favoriteUserProduction', FUPList.as_view(), name="fup-list"),
    path('favoriteUserProduction/<int:id>', FUPDetail.as_view(), name="fup-detail"),
    path('favoriteUserProductionByProduction/<int:id>', FUPByProduction.as_view(), name="fup-by-production-list"),
    path('favoriteUserProductionByUser/<int:id>', FUPByUser.as_view(), name="fup-by-user-list"),

    path('actorProduction', ActorProductionList.as_view(), name="actor-production-list"),
    path('actorProduction/<int:id>', ActorProductionDetail.as_view(), name="actor-production-detail"),
    path('actorProductionByProduction/<int:id>', ActorProductionByProduction.as_view(), name="actor-production-by-production-list"),
    path('actorProductionByActor/<int:id>', ActorProductionByActor.as_view(), name="actor-production-by-user-list"),

    path('country', CountryList.as_view(), name="country-list"),
    path('country/<int:id>', CountryDetail.as_view(), name="country-detail"),

    path('genre', GenreList.as_view(), name="genre-list"),
    path('genre/<int:id>', GenreDetail.as_view(), name="genre-detail"),
]
