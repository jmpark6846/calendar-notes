from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    # GET, HEAD, OPTIONS 요청은 모든 유저에게 허용된다.
    def has_object_permission(self, request, view, obj):
      if request.method in permissions.SAFE_METHODS:
        return True

      return obj.author == request.user
      
