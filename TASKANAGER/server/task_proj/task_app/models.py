from django.db import models

# Create your models here.

from django.contrib.auth import get_user_model

User = get_user_model()

class Task(models.Model):
    STATUSES = {'pending':'pending', 'completed':'completed', 'in_progress':'in_progress'}

    task_name = models.CharField(max_length=20)
    task_description = models.TextField()
    task_status = models.CharField(max_length=20,default="pending",choices=STATUSES)
    task_assigned_by = models.ForeignKey(User,on_delete=models.CASCADE,related_name="assigner")
    task_assigned_to = models.ForeignKey(User,on_delete=models.CASCADE,related_name="assignee")
    task_assigned_date = models.DateTimeField(auto_now_add=True)
    task_completed_date = models.DateTimeField(null=True,blank=True)
    task_deadline = models.DateTimeField()



