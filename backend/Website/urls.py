from django.urls import path
from .views.home import home
from .views.login_user import login_user, logout_user
from .views.user import UserList, UserDetail
from .views.review import ReviewList, ReviewDetail
from .views.production import ProductionList, ProductionDetail
from .views.actor import ActorList, ActorDetail


urlpatterns = [
    path('', home, name='home'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),

    path('users', UserList.as_view(), name="user-list"),
    path('users/<int:id>', UserDetail.as_view(), name="user-detail"),

    path('reviews', ReviewList.as_view(), name="review-list"),
    path('reviews/<int:id>', ReviewDetail.as_view(), name="review-detail"),

    path('productions', ProductionList.as_view(), name="production-list"),
    path('productions/<int:id>', ProductionDetail.as_view(), name="production-detail"),

    path('actors', ActorList.as_view(), name="actor-list"),
    path('actors/<int:id>', ActorDetail.as_view(), name="actor-detail"),
]
