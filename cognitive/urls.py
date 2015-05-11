# Copyright 2015 Cisco Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.

from django.conf.urls import patterns, include, url
from app import views, urls

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns(
    '',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.index, name="home"),
    url(r'^login$', views.login, name="login"),
    url(r'^join$', views.join, name="join"),
    url(r'^logout$', views.logout, name="logout"),
    url(r'^whiteboard$', views.whiteboard, name="whiteboard"),
    url(r'^api/v1/', include(urls)),
    url(r'^docs/', include('rest_framework_swagger.urls')),
)
