from rest_framework.generics import ListCreateAPIView,RetrieveAPIView,UpdateAPIView,DestroyAPIView
from task_app.serializers import TaskSerializer,TaskUpdateSerializer
from task_app.models import Task
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from task_app.permissions import IsManagerOrTL,IsAssingee,IsManager
from rest_framework.views import APIView
from rest_framework.response import Response

class TaskListCreateAPI(ListCreateAPIView):
    permission_classes = [IsAuthenticated,IsManagerOrTL]
    authentication_classes = [JWTAuthentication]
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    def perform_create(self,serializer):
        serializer.save(task_assigned_by = self.request.user )


# list assigned task
class AssignedTaskListAPI(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    def get(self,request):
        tasks = Task.objects.filter(task_assigned_to=request.user)
        serializer = TaskSerializer(tasks,many=True)
        return Response(data=serializer.data)



# update( complete ) task
class TaskUpdateAPI(UpdateAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated,IsAssingee]
    serializer_class = TaskUpdateSerializer
    queryset = Task.objects.all()




# delete task
class TaskDeleteAPI(DestroyAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated,IsManager]
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


