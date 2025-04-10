from django.urls import path
from .views import TodoListView, TodoCreateView, TodoUpdateView, TodoDeleteView
from rest_framework.authtoken.views import obtain_auth_token
from .views import SecureHelloView

urlpatterns = [
    path('fetch', TodoListView.as_view(), name='todo-list'),  # Fetch all tasks
    path('create', TodoCreateView.as_view(), name='todo-create'),  # Create a new task
    path('<int:pk>/update', TodoUpdateView.as_view(), name='todo-update'),  # Update a specific task
    path('<int:pk>/delete', TodoDeleteView.as_view(), name='todo-delete'),  # Delete a specific task
    path('secure-hello/', SecureHelloView.as_view()),
    path('api-token-auth/', obtain_auth_token),
]
