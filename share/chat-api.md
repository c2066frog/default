# Chat Api Doc

## 1、协议类型
- 协议类型： Websocket
- 消息格式： JSON

## 2、连接步骤【Demo】
1. 获取邀请码URL， 根据邀请码URL截取inviteCode
~~~
http://chat.thalot03.com/chat.html#/auth/login?inviteCode=CgPRKwGOGIYVBFPb

~~~
2. 【Api】根据inviteCode获取用户ticket信息：/api/auth/login/invite?inviteCode={$inviteCode}
~~~
http://8.218.247.142:43777/api/auth/login/invite?inviteCode=CgPRKwGOGIYVBFPb

~~~
返回：
~~~
{
    "msg": "登录成功", // 操作结果
    "code": 200, // 状态码
    "data": {
        "ticket": "045eb3b4b3f942918ff4a9582b5c900a", // 用户凭据
        "uid": 1020105, // 用户ID
        "datetime": "2023-03-31 11:38:58" // 登陆时间
    }
}

~~~
3. 【Api】根据inviteCode获取Group信息：/api/chat/getGroupInfo?inviteCode={$inviteCode}&uid={$uid}&ticket={$ticket} 
~~~
http://8.218.247.142:43777/api/chat/getGroupInfo?inviteCode=CgPRKwGOGIYVBFPb&uid=1020105&ticket=045eb3b4b3f942918ff4a9582b5c900a

~~~   
返回
~~~
{
    "msg": "操作成功",
    "code": 200,
    "data": {
        "msgs": [], // 历史记录
        "groupId": 1020066, // 群组ID
        "name": "club001", // 群名
        "userId": 1020105, // 群主
        "status": 10 // 群状态（10-正常；90-禁言）
    }
}

~~~

4. 【TCP】根据Ticket发起TCP请求：ws://{$ip}:{$port}/?uid={$uid}&ticket={$ticket}
~~~
ws://8.218.247.142:43101/?uid=1020105&ticket=045eb3b4b3f942918ff4a9582b5c900a

~~~   

5. 【TCP】WS链接成功后发送绑定设备请求
~~~
{
    type: 3,
    key: "client_bind",
    data: {
        uid: 1020105,
        groupId: 1020066
    }
}

~~~
6. 【TCP】协议链接成功，会返回 type=4 的信息，表示客户端绑定成功
~~~
{type: 4}
   
~~~
7. 【TCP】PING/PONG，连接建立后，服务端会不定时发送PING信息，客户端收到PING信息后，回复PONG即可
~~~
【ping/接收】
{
    type: 1
}


【pong/回复】
{
    type: 0
}
~~~

8. 【TCP】消息接收
~~~
{
    type: 2,
    "msg": "操作成功",
    "code": 200,
    "data": {} // 收到的服务端消息内容
}

~~~

## 3、 API【Demo】
- 发送群消息
~~~
http://8.218.247.142:43777/api/chat/send?ticket=e6230e2b49474a4a922d22085eabac8d&uid=1020105&detail=消息内容&groupId=1020066
// detail： 消息内容
// groupId： 群组ID
// datatype: 消息类型（默认：1-文本）

{
    "msg":"操作成功",
    "code":200,
    "data":{
        "createdAt":"2023-03-31 11:55:04",
        "id":1020172,
        "detail":"121212",
        "user":{
            "gender":0,
            "thumb":"http://8.218.247.142:43777/profile/club/logo/2023/03/25/Ahri_20230325224556A002.png",
            "nickname":"Ahri",
            "isOnline":0,
            "id":1020105,
            "userCode":"803943"
        }
    }
}
~~~

- 上传图片
~~~
http://8.218.247.142:43777/api/web/upload
{
    file: (binary), // 图片文件流
    prefix: "chat" // 保存前缀
}
  
~~~
http://8.
  

## 5、类及枚举
- TCPTransform
~~~
{
    Integer type; // 必填：PONG(0)、PING(1)、MESSAGE(2)、SENT_BODY(3)、REPLY_BODY(4)
    Integer tag; // 可空，回复操作类型：发送消息 ACT_CHAT_MESSAGE(1101)、撤回消息 ACT_CHAT_CANCEL(1102)、修改群 ACT_GROUP_UPDATE(1201)
    Integar code; // 可空(PING/PONG没有)，状态码：操作成功 200、操作失败 400、用户过期 403、
    String msg; // 可空，操作结果
    Object data; // 可空，消息内容（List/HashMap/Object/泛型）
}

~~~

- HttpResponse
~~~
{
    Integar code; // 必填，状态码：操作成功 200、操作失败 400、用户过期 403、
    String msg; // 可空，操作结果
    Object data; // 可空，消息内容（List/HashMap/Object/泛型）
}


~~~

- TCP/HTTP 状态码 （code）
- 200： 成功
- 400： 失败
- 403： 登陆失败、用户会话过期


- 消息格式 datatype
- 1： 文本（默认）
- 3： 图片


- 群状态
- 10: 正常
- 90： 禁言
