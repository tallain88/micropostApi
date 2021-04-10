# micropostApi


API ROUTES

| URL                   | Req. Method   | Action  |    Controller  |
|:---------------------:|:-------------:|:-------:|:--------------:|   
| /user                 |GET            |get()    | UserController |
| /user/create          | POST          |post()   | UserController |
| /user/:userId         | GET           |get()    | UserController |
| /user/:userId         | PUT           |put()    | UserController |
| /user/:userId         | DELETE        |delete() | UserController |
| /reply                | GET           |get()    | ReplyController|
| /reply/create         | POST          |post()   | ReplyController|
| /reply/:replyId       | POST          |get()    | ReplyController|
| /reply/:replyId       | PUT           |put()    | ReplyController|
| /reply/:replyId       | DELETE        |delete() | ReplyController|
| /post/                | GET           |get()    | PostController |
| /post/create          | POST          |post()   | PostController |
| /post/user/:userId    | GET           |get()    | PostController |
| /post/:postId         | PUT           |put()    | PostController |
| /post/:postId         | DELETE        |delete() | PostController |
| /post/:postId         | GET           |delete() | PostController |
| /like/                | GET           |get()    | LikeController |
| /like/create          | POST          |post()   | LikeController |
| /like/user/:userId    | GET           |get()    | LikeController |
| /like/post/:postId    | GET           |get()    | LikeController |
| /like/:userId/:postId | GET           |get()    | LikeController |
| /like/:likeId         | DELETE        |delete() | LikeController |



