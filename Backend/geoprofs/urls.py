"""
URL configuration for geoprofs project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from api_geoprofs.views import (
    audit_logs,
    health,
    leave_balances,
    leave_summary,
    leaves,
    login,
    logout,
    notifications,
    planning_items,
    register,
    role_detail,
    roles,
    user_data,
)
from django.urls import path

urlpatterns = [
    path("auth/register/", register),
    path("auth/login/", login),
    path("auth/logout/", logout),
    path("user", user_data),
    path("audit_logs/", audit_logs),
    path("leaves/", leaves),
    path("leave_balances/summary/", leave_summary),
    path("leave_balances/", leave_balances),
    path("status/", health),
    path("notifications/", notifications),
    path("planning-items/", planning_items),
    path("roles/", roles),
    path("roles/<uuid:role_id>/", role_detail),
]
