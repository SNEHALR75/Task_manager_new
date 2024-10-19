from rest_framework import serializers
from .models import Task
from django.utils import timezone

from django.contrib.auth import get_user_model
User = get_user_model()





class UserDetailSerializer(serializers.ModelSerializer):
    date_joined = serializers.DateTimeField( format="%d/%m/%Y %H:%M:%S", read_only=True )
    class Meta:
        model = User
        fields = "__all__"
        read_only_fields = ['id','date_joined','last_login','groups','user_permissions']






class CustomRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        serializer = UserDetailSerializer( value )
        return serializer.data
    def to_internal_value(self, data):
        print( data,'------------------------' )
        return User.objects.get( id=data )







class TaskSerializer(serializers.ModelSerializer):
    task_assigned_by = CustomRelatedField(read_only=True)
    task_assigned_to = CustomRelatedField(queryset=User.objects.all())
    task_assigned_date=serializers.DateTimeField(format="%d/%m/%Y %H:%M",read_only=True)
    task_completed_date=serializers.DateTimeField(format="%d/%m/%Y %H:%M",default=None)
    task_deadline=serializers.DateTimeField(format="%d/%m/%Y %H:%M")
    class Meta:
        model = Task
        fields = "__all__"

    def create(self, validated_data):
        print( validated_data )
        return Task.objects.create( **validated_data )





class TaskUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
        read_only_fields = ['id','task_name',
        'task_description',
        'task_assigned_by','task_assigned_to',
        'task_assigned_date','task_completed_date',
        'task_deadline']

    def update(self,instance,validated_data):
        instance.task_status = validated_data.get('task_status', instance.task_status)
        if validated_data.get('task_status') == 'completed':
            instance.task_completed_date = timezone.now()
        instance.save()
        return instance



from rest_framework import serializers
from .models import Task
from django.utils import timezone

from django.contrib.auth import get_user_model
User = get_user_model()





class UserDetailSerializer(serializers.ModelSerializer):
    date_joined = serializers.DateTimeField( format="%d/%m/%Y %H:%M:%S", read_only=True )
    class Meta:
        model = User
        fields = "__all__"
        read_only_fields = ['id','date_joined','last_login','groups','user_permissions']






class CustomRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        serializer = UserDetailSerializer( value )
        return serializer.data
    def to_internal_value(self, data):
        print( data,'------------------------' )
        return User.objects.get( id=data )







class TaskSerializer(serializers.ModelSerializer):
    task_assigned_by = CustomRelatedField(read_only=True)
    task_assigned_to = CustomRelatedField(queryset=User.objects.all())
    task_assigned_date=serializers.DateTimeField(format="%d/%m/%Y %H:%M",read_only=True)
    task_completed_date=serializers.DateTimeField(format="%d/%m/%Y %H:%M",default=None)
    task_deadline=serializers.DateTimeField(format="%d/%m/%Y %H:%M")
    class Meta:
        model = Task
        fields = "__all__"

    def create(self, validated_data):
        print( validated_data )
        return Task.objects.create( **validated_data )





class TaskUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
        read_only_fields = ['id','task_name',
        'task_description',
        'task_assigned_by','task_assigned_to',
        'task_assigned_date','task_completed_date',
        'task_deadline']

    def update(self,instance,validated_data):
        instance.task_status = validated_data.get('task_status', instance.task_status)
        if validated_data.get('task_status') == 'completed':
            instance.task_completed_date = timezone.now()
        instance.save()
        return instance



from rest_framework import serializers
from .models import Task
from django.utils import timezone

from django.contrib.auth import get_user_model
User = get_user_model()


class UserDetailSerializer(serializers.ModelSerializer):
    date_joined = serializers.DateTimeField( format="%d/%m/%Y %H:%M:%S", read_only=True )
    class Meta:
        model = User
        fields = "__all__"
        read_only_fields = ['id','date_joined','last_login','groups','user_permissions']

class CustomRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        serializer = UserDetailSerializer( value )  
        return serializer.data
    def to_internal_value(self, data):
        print( data,'------------------------' )
        return User.objects.get( id=data )







class TaskSerializer(serializers.ModelSerializer):
    task_assigned_by = CustomRelatedField(read_only=True)
    task_assigned_to = CustomRelatedField(queryset=User.objects.all())
    task_assigned_date=serializers.DateTimeField(format="%d/%m/%Y %H:%M",read_only=True)
    task_completed_date=serializers.DateTimeField(format="%d/%m/%Y %H:%M",default=None)
    task_deadline=serializers.DateTimeField(format="%d/%m/%Y %H:%M")
    class Meta:
        model = Task
        fields = "__all__"

    def create(self, validated_data):
        print( validated_data )
        return Task.objects.create( **validated_data )

class TaskUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
        read_only_fields = ['id','task_name',
        'task_description',
        'task_assigned_by','task_assigned_to',
        'task_assigned_date','task_completed_date',
        'task_deadline']

    def update(self,instance,validated_data):
        instance.task_status = validated_data.get('task_status', instance.task_status)
        if validated_data.get('task_status') == 'completed':
            instance.task_completed_date = timezone.now()
        instance.save()
        return instance



