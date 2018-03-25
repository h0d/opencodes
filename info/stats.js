var test = [
    {
        "id" : "loc",
        "text" : "removed locations",
        "value" : 0
    },
    {
        "id" : "cam",
        "text" : "removed camera info",
        "value" : 0
    },
    {
        "id" : "det",
        "text" : "detections",
        "value" : 0
    }
]

window.onload = function(){
    var c = document.getElementById("content");

    chrome.storage.sync.set({'count': test}, function() {
        //console.log('Value is set to ' + test);
      });

    chrome.storage.sync.get(['count'], function (result) {
        ///console.log(result);

            for(i in test){
                var e = test[i];
                var div = document.createElement("div");
                
                div.classList.add("pure-u-lg-1-3");
                div.classList.add("pure-u-sm-1-2");
                div.classList.add("info-grid");
        
                var header = document.createElement("p");
                var info = document.createElement("p");
        
                header.classList.add("info-hd");
                info.classList.add("info");
        
                header.innerHTML = e.text;
                info.innerHTML = e.value;
        
                div.appendChild(header);
                div.appendChild(info);
        
                c.appendChild(div);
        
                //console.log(e);
            }


    });
};
