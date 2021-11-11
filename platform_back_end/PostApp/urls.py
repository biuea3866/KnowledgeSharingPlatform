from django.urls import path;
from .views import WriteView, SearchView, DetailView, CommentView, TagView, ModifyView;

urlpatterns = [
    path('write', WriteView.as_view()),
    path('search/<str:keyword>', SearchView.as_view()),
    path('<str:post_id>/post', DetailView.as_view()),
    path('<str:post_id>/comment', CommentView.as_view()),
    path('<str:post_id>/tag', TagView.as_view()),
    path('<str:post_id>/modify', ModifyView.as_view())
]