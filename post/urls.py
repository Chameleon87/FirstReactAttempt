from django.conf.urls import patterns, url, include
from rest_framework.urlpatterns import format_suffix_patterns
from post.views import index, post, PostList, PostDetail

urlpatterns = patterns('',
        url(r'^(?P<post_id>\d+)/$', post),
        url(r'^api/$', PostList.as_view()),
        url(r'^api/(?P<pk>[0-9]+)/$', PostDetail.as_view()),
        url(r'^', index),
        )

urlpatterns = format_suffix_patterns(urlpatterns)
