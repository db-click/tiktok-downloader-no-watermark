function trackEvent(name, data) {

}
!(function ($) {
    var form = document.forms.namedItem("formurl");
    var boxDownload = document.getElementById("download-section");
    var progress = document.querySelector(".progress-dl");
    var alert = document.querySelector("#alert");

    function notifyAction() {
        progress.classList.remove('active');
        alert.classList.add('active');
        document.getElementById("get_video").reset();
    }

    function hideError() {
        progress.classList.remove('active');
        alert.classList.remove('active');

    }


    //发起网络请求
    function sendReq() {
       document.location = "https://ttvideodownload.com";

    }

    navigator.clipboard && document.getElementById("paste").classList.remove("disabled");
    document.getElementById("paste").addEventListener("click",
        function () {

            pasteLink(true);
        });

    //检测链接
    function pasteLink(isReturn) {
        var a = document.getElementById("paste");
        var c = document.getElementById("url");
        '<span><i class="icon icon-clear"></i>Clear</span>' === a.innerHTML ? (c.value = "", a.innerHTML = '<span><i class="icon icon-paste"></i>Paste</span>') :

            navigator.clipboard.readText().then(function (f) {
                    var regTik = /.*https?:\/\/.*tiktok\.com\/.*/ig;
                    var regDouyin = /.*https?:\/\/.*douyin\.com\/.*/ig;
                    console.log("/n链接内容" + f);
                    var isTikLink = regTik.test(f);
                    var isDouyinLink = regDouyin.test(f);
                    console.log("/n格式" + isTikLink);
                    console.log("/n格式" + isDouyinLink);

                    if (!isTikLink && !isDouyinLink) {
                        console.log("/n链接格式错误");
                        isTikLink = false;
                        isDouyinLink = false;
                        //格式错误
                        alert.innerHTML = "Error, The Tiktok link is temporarily invalid.";
                        notifyAction();
                        if (isReturn) {
                            return c.value = "";
                        } else {
                            c.value = "";
                        }

                    } else {
                        console.log("链接格式正确");
                        isTikLink = true;
                        isDouyinLink = true;
                        alert.innerHTML = "";
                        hideError();
                        if (isReturn) {
                            return c.value = f;
                        } else {
                            c.value = f;
                            //获取视频信息

                        }

                    }

                },
                a.innerHTML = '<span><i class="icon icon-clear"></i>Clear</span>');

    }


    $("#send").click(function () {
        trackEvent('downloadButton');
        sendReq();
        return false
    });


    var i, accordion = document.querySelectorAll(".accordion .card-header");
    for (i = 0; i < accordion.length; i++) accordion[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var e = this.nextElementSibling;
        if (e.style.maxHeight) e.style.maxHeight = null; else {
            for (var l = document.querySelectorAll(".accordion .collapse"), i = l.length - 1; i >= 0; i--) l[i].style.maxHeight = null;
            e.style.maxHeight = e.scrollHeight + "px"
        }
    });
    // if (navigator.userAgent.match(/Android/i) && 'serviceWorker' in navigator) navigator.serviceWorker.register('/serviceworker.js?');
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(function (reg) {

            }).catch(function (err) {
        });
    }





})($);

