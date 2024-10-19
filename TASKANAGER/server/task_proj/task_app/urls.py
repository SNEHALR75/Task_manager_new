from django.urls import path
from task_app.api import *


urlpatterns = [
    path('tasks/',TaskListCreateAPI.as_view()),
    path('tasks/assigned/',AssignedTaskListAPI.as_view() ),
	path('tasks/update/<pk>/',TaskUpdateAPI.as_view()),
	path('tasks/delete/<pk>/',TaskDeleteAPI.as_view()),
]