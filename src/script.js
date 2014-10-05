(function() {

    var observerConfig = {
        attributes: true,
        childList: true,
        characterData: true
    };

    var replyModeObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName === 'class') {
                var newVal = $(mutation.target).prop(mutation.attributeName);
                if (0 > newVal.indexOf('active')) {
                    alert('パブリック返信モードに変わりました');
                }
            }
        });
    });

    function watchReplyMode() {
        replyModeObserver.observe(
            $('.comment-actions .private_note')[0],
            observerConfig
        );
    }

    function interruptionEvent(e) {
        if (window.confirm('送信しますか?')) {
            return true;
        } else {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            alert('送信をキャンセルしました');
            return false;
        }
    }

    function guardTransmission() {
        // 最初に実行させたいのでonではなくbindを使う
        $('.ticket_submit_buttons .save').bind('click mousedown', function(e) {
            interruptionEvent(e);
        });
        // 最初に実行させたいのでonではなくbindを使う
        $('.ticket_submit_buttons li.status').bind('click mousedown', function(e) {
            interruptionEvent(e);
        });
    }

    window.onload = function() {
        watchReplyMode();
        guardTransmission();
    };
})();
