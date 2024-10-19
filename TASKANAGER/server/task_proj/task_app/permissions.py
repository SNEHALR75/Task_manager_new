from rest_framework.permissions import BasePermission



class IsManagerOrTL(BasePermission):
	def has_permission(self,request,view):
		print(request.user)
		return request.user.is_authenticated and request.user.role in ['manager','team_leader']




class IsAssingee(BasePermission):
    def has_object_permission(self,request,view,obj):
        print(request.user)
        return ( request.user.is_authenticated and 
            request.user.role == 'developer' and 
            request.user == obj.task_assigned_to )




class IsManager(BasePermission):
    def has_object_permission(self,request,view,obj):
        print(request.user)
        return ( request.user.is_authenticated and 
            request.user.role == 'manager')











