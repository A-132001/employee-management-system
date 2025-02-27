from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    CompanyListCreateView, CompanyDetailView,
    DepartmentListCreateView, DepartmentDetailView,
    EmployeeListCreateView, EmployeeDetailView,
    RegisterView,CustomTokenObtainPairView,
    UserCreateView
)

urlpatterns = [
    # Company Endpoints
    path('companies/', CompanyListCreateView.as_view(), name='company-list'),
    path('companies/<int:pk>/', CompanyDetailView.as_view(), name='company-detail'),

    # Department Endpoints
    path('departments/', DepartmentListCreateView.as_view(), name='department-list'),
    path('departments/<int:pk>/', DepartmentDetailView.as_view(), name='department-detail'),

    # Employee Endpoints
    path('employees/', EmployeeListCreateView.as_view(), name='employee-list'),
    path('employees/<int:pk>/', EmployeeDetailView.as_view(), name='employee-detail'),
    #JWT
    path('register/', RegisterView.as_view(), name='register'),
    # path('register/', UserCreateView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),

]
