from django.db.models import Q;
from rest_framework.views import APIView;
from rest_framework.parsers import JSONParser;
from django.http.response import JsonResponse;

from rest_framework.exceptions import AuthenticationFailed, ValidationError

from .models.comment_model import Comment;
from .models.post_model import Post;
from .models.tag_model import Tag;

from .serializers.write_serializer import WriteSerializer;
from .serializers.search_serializer import SearchSerializer;
from .serializers.detail_serializer import DetailSerializer;
from .serializers.comment_serializer import CommentSerializer;
from .serializers.modify_serializer import ModifySerializer;
from .serializers.comments_serializer import CommentsSerializer;
from .serializers.tag_serializer import TagSerializer;
from .serializers.tags_serializer import TagsSerializer;

class WriteView(APIView) :
    def post(self, request) :
        token = request.META['HTTP_AUTHORIZATION'];

        if not token :
            raise AuthenticationFailed('Unauthenticated');
        
        try :
            vo = JSONParser().parse(request);
            post_serializer = WriteSerializer(data=vo);

            if post_serializer.is_valid(raise_exception=True) :
                post_serializer.save();

                return JsonResponse({
                    'payload': post_serializer.data,
                    'message': "Successfully write post"
                });
            
            return JsonResponse({
                'payload': None,
                'message': 'Failed to write post'
            });

        except ValidationError as e:
            return JsonResponse({
                'payload': None,
                'message': "Error: " +  str(e)
            });
            
class SearchView(APIView) :
    def get(self, request, keyword) :
        token = request.META['HTTP_AUTHORIZATION'];

        if not token :
            raise AuthenticationFailed('Unauthentication');

        try :
            tags = Tag.objects.filter(Q(tag__icontains=keyword));
            posts = Post.objects.filter(Q(title__icontains=keyword) |
                                        Q(contents__icontains=keyword) |
                                        Q(post_id__in=tags.values_list('post_id'))).distinct();

            if not posts :
                return JsonResponse({
                    'payload': None,
                    'message': 'Posts not found'
                });

            posts_serializer = SearchSerializer(posts,
                                                many=True);
            
            return JsonResponse({
                'payload': posts_serializer.data,
                'message': 'Successfully get posts data'
            });

        except Exception as e :
            return JsonResponse({
                'payload': None,
                'message': "Error: " + str(e)
            });

class DetailView(APIView) :
    def get(self, request, post_id) :
        token = request.META['HTTP_AUTHORIZATION'];

        if not token :
            raise AuthenticationFailed('Unauthentication');

        try :
            post = Post.objects.get(post_id=post_id);
            
            if not post :
                return JsonResponse({
                    'payload': None,
                    'message': "Post not found"
                });

            post_serializer = DetailSerializer(post);

            return JsonResponse({
                'payload': post_serializer.data,
                'message': 'Successfully get post data'
            });

        except Exception as e :
            return JsonResponse({
                'payload': None,
                'message': 'Error: ' + str(e)
            });

class CommentView(APIView) :
    def put(self, request, post_id) :
        token = request.META['HTTP_AUTHORIZATION'];

        if not token :
            raise AuthenticationFailed('Unauthentication');

        try :
            vo = JSONParser().parse(request);
            comment_serializer = CommentSerializer(data=vo);

            if comment_serializer.is_valid() :
                comment_serializer.save();

                post = Post.objects.get(post_id=post_id);

                if not post :
                    return JsonResponse({
                        'payload': None,
                        'message': "Post not found"
                    });

                updated_post = DetailSerializer(post).data;
                comments = Comment.objects.all().filter(post_id=post_id);
                updated_post['comments'] = CommentsSerializer(comments, 
                                                              many=True).data;
                post_serializer = ModifySerializer(post,
                                                   data=updated_post,
                                                   partial=True);

                if post_serializer.is_valid() :
                    post_serializer.save();
                
                    return JsonResponse({
                        'payload': post_serializer.data,
                        'message': "Successfully save comment"
                    });

                return JsonResponse({
                    'payload': None,
                    'message': "Failed to load post"
                });

            return JsonResponse({
                'payload': None,
                'message': "Failed to create comment"
            });

        except Exception as e :
            return JsonResponse({
                'payload': None,
                'message': "Error: " + str(e)
            });

class TagView(APIView) :
    def put(self, request, post_id) :
        token = request.META['HTTP_AUTHORIZATION'];

        if not token :
            raise AuthenticationFailed('Unauthenticated');

        try:
            vo = JSONParser().parse(request);
            tag_serializer = TagSerializer(data=vo);
            
            if tag_serializer.is_valid() :
                tag_serializer.save();

                post = Post.objects.get(post_id=post_id);

                if not post :
                    return JsonResponse({
                        'payload': None,
                        'message': "Post not found"
                    });

                updated_post = DetailSerializer(post).data;
                tags = Tag.objects.all().filter(post_id=post_id)

                updated_post['tags'] = TagsSerializer(tags,
                                                      many=True).data
                post_serializer = ModifySerializer(post,
                                                   data=updated_post,
                                                   partial=True);

                if post_serializer.is_valid() :
                    post_serializer.save();

                    return JsonResponse({
                        'payload': post_serializer.data,
                        'message': "Successfully save tag"
                    });

                return JsonResponse({
                    'payload': None,
                    'message': "Failed to load post data"
                });

            return JsonResponse({
                'payload': None,
                'message': "Failed to save tag"
            });

        except Exception as e :
            return JsonResponse({
                'payload': None,
                'message': "Error: " + str(e)
            });

class ModifyView(APIView) :
    def put(self, request, post_id) :
        token = request.META['HTTP_AUTHORIZATION'];

        if not token :
            raise AuthenticationFailed('Unauthenticated');

        try :
            vo = JSONParser().parse(request);
            post = Post.objects.get(post_id=post_id);

            if not post :
                return JsonResponse({
                    'payload': None,
                    'message': 'Post not found'
                });

            updated_post = DetailSerializer(post).data;
            
            updated_post['title'] = vo['title'];
            updated_post['contents'] = vo['contents'];
            updated_post['is_secret'] = vo['is_secret'];
            
            post_serializer = ModifySerializer(post,
                                               data=updated_post,
                                               partial=True);

            if post_serializer.is_valid() :
                post_serializer.save();

                return JsonResponse({
                    'payload': post_serializer.data,
                    'message': "Successfully modify post"
                });

            return JsonResponse({
                'payload': None,
                'message': "Failed to modify post"
            });

        except Exception as e :
            return JsonResponse({
                'payload': None,
                'message': 'Error: ' + str(e)
            });