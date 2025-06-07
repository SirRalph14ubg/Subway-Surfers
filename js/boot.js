/* eslint-disable func-names */
/* eslint-disable no-var */
/** Load script file */
function loadScript(path, onComplete)
{
    var script = document.createElement('script');

    if (onComplete) script.onload = onComplete;
    script.src = path;
    document.head.appendChild(script);
}

    // Promise callback, should be dispatched either way
    function onInitComplete(adBlockerOn)
    {
        PokiSDK.adBlockerOn = adBlockerOn;
        PokiSDK.gameLoadingStart();
        if (onComplete) onComplete();
    }

/** Init app */
function initApp()
{

/** Prevent arrows and space from scrolling browser */
function preventDefaultKeyboardEvents()
{
    const keys = [
        ' ',
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
    ];

    function onKey(e)
    {
        if (keys.indexOf(e.key) < 0) return;
        e.preventDefault();
    }

    window.addEventListener('keydown', onKey);
    window.addEventListener('keyup', onKey);
}

function registerServiceWorker(onComplete)
{
    if (navigator.serviceWorker && !window.NOSW)
    {
        console.log('Service worker available');
        navigator.serviceWorker.register('./sw.js', { scope: './' })
            .then(function ()
            {
                console.log('Service worker registered');
                if (onComplete) onComplete();
            })
            .catch(function (error)
            {
                // eslint-disable-next-line prefer-template
                console.log('Service worker registration failed - ' + error);
                if (onComplete) onComplete();
            });
    }
    else if (onComplete)
    {
        onComplete();
    }
}

/** Prevent default keyboard events */
preventDefaultKeyboardEvents();

/** Register service worker if available */
registerServiceWorker(function ()
{
    });
