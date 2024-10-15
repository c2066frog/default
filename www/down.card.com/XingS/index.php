<?php
$appName = "星闪";
$files = scandir(".");
$apkFile = "";
$plistFile = "";
foreach ($files as $file) {
    if (strpos($file, ".apk") !== false) {
        $apkFile = $file;
    }
    if (strpos($file, ".plist") !== false) {
        $plistFile = $file;
    }
}
if ($apkFile) {
    $apkSize = filesize($apkFile) / 1024 / 1024;
    $apkSize = number_format($apkSize, 2);

    date_default_timezone_set("Asia/Shanghai");
    $filetime = filemtime($apkFile);

    $version = substr($apkFile, -12, 8);
}
?>
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>App下载 | <?php echo $appName; ?></title>
    <link rel="stylesheet" href="http://47.76.204.198:43660/plugins/bootstrap-3.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://47.76.204.198:43660/plugins/download.css?v=10.0.0.1">
    <script src="http://47.76.204.198:43660/plugins/jquery-1.12.4/jquery.min.js"></script>
    <script src="http://47.76.204.198:43660/plugins/bootstrap-3.4.1/js/bootstrap.min.js"></script>
</head>
<body>
<div class="container">
    <div class="app-name">
        <div class="thumb">
            <img src="logo.png">
        </div>
        <div class="title"><?php echo $appName; ?></div>
        <div class="help-block">
            <p>版本：<?php echo $version; ?></p>
            <p>大小：<?php echo $apkSize; ?>MB</p>
            <p>更新时间：<?php echo date("Y-m-d", $filetime); ?></p>
        </div>
    </div>
    <div class="clearfix"></div>
    <div class="btn-down">
        <a class="btn btn-primary btn-Android" href="<?php echo $apkFile; ?>">
            <i class="glyphicon glyphicon-download-alt"></i>
            <span>Android下载</span>
        </a>
        <?php if(false){ ?>
        <a class="btn btn-primary btn-iOS" href="https://x.vxff.cn/we3qfs">
            <i class="glyphicon glyphicon-download-alt"></i>
            <span>iOS下载</span>
        </a>
        <?php } ?>
    </div>
    <div class="clearfix"></div>
    <div class="qrcode">
        <img src="qrcode.png">
    </div>
    <div class="clearfix"></div>
    <div class="desc">
        <div class="title">应用描述</div>
        <p class="content"><?php echo $appName; ?></p>
    </div>
</div>
<div class="mask" id="mask"></div>
</body>
<script>
    function is_weixin() {
        var UserAgent = navigator.userAgent.toLowerCase();
        if (UserAgent.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }

    $(function () {
        var isWeixin = is_weixin();

        var UserAgent = navigator.userAgent.toLowerCase();
        var android = UserAgent.indexOf('android');
        var iphone = UserAgent.indexOf('iphone');

        if (isWeixin) {
            if (iphone > 0) {
                $('#mask').html('<img src="../wechat-iPhone.png" />');
                $('#mask').attr('style', 'display:block;');
            } else {
                $('#mask').html('<img src="../wechat-Android.png" />');
                $('#mask').attr('style', 'display:block;');
            }
        }

        if (iphone > 0) {
            $(".btn-Android").hide();
        } else {
            $(".btn-iOS").hide();
        }
    });
</script>
</html>
