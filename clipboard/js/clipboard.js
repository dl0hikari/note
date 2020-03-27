var DEFAULT_VERSION = 8.0;
var ua = navigator.userAgent.toLowerCase();
var isIE = ua.indexOf('msie') > -1;
var IEVersion;
if (isIE) {
  IEVersion = ua.match(/msie ([\d.]+)/)[1];
}

// if (IEVersion <= DEFAULT_VERSION) {
  var clip = new ZeroClipboard($(".copy_btn"), {
    moviePath: "./js/ZeroClipboard.swf"
  });

  console.log(clip);
  // clip.on( 'click', function(client) {
  //     clip.setText($(this).val());
  // });
  clip.on( 'complete', function(client, args) {
    alert('代码已经复制到您的剪贴板,使用ctrl+v粘贴或者右键粘贴。');
  });
// } else {
//   var clipboardDemos=new ClipboardJS(".copy_btn");
//         clipboardDemos.on('success',function(e){
//           alert('代码已经复制到您的剪贴板,使用ctrl+v粘贴或者右键粘贴。');
//         });
//         clipboardDemos.on('error',function(e){

//         });
// }
