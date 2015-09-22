;(function($){
    
    var config = {
        "theme" : "default"
        ,"outlineHTML" : '<div class="{className}">'
                        +    '<div class="ejs_editor_toolbar" unselectable="on" onselectstart="return false" onmousedown="return false;"><dl>{widget}</dl></div>'
                        +    '<div class="ejs_editor_design" >'
                        +        '<iframe frameborder="0" allowtransparency="true" src=\'{src}\' width="100%" height="100%" ></iframe>'
                        +    '</div>'
                        +    '<div class="ejs_editor_source">'
                        +        '<textarea spellcheck="false"></textarea>'
                        +    '</div>'
                        +'</div>'
        ,"style" : {
           "default"  : {
                "className" : "ejs_editor_default"
                
                //图标路径
                ,"path" : "../../theme/editor/default/"
                    
                ,"toolbarHeight" : 50
           }
        }
        ,"widget" : [
             "source"
             ,"bold"
             ,"italic"
             ,"strikethrough"
             ,"underline"
             ,"anchor"
             ,"link"
             ,"unlink"
             ,"superscript"
             ,"subscript"
             ,"justifyleft"
             ,"justifycenter"
             ,"justifyright"
             ,"justifyjustify"
             ,"insertimage"
             ,"clearformat"
             /*
             ,"forecolor"
             ,"fontborder"
             ,"backcolor"
             ,"lineheight"
             ,"rowspacingtop"
             ,"rowspacingbottom"
             ,"indent"
             
             ,"insertvideo"
             ,"insertgmap"
             ,"insertbmap"
             ,"insertiframe"
             ,"insertpagebreak"
             ,"inserttable"
             ,"deletetable"
             ,"insertparagraphbeforetable"
             ,"insertrow"
             ,"insertcol"
             ,"deleterow"
             ,"deletecol"
             ,"mergecells"
             ,"mergeright"
             ,"mergedown"
             ,"splittocells"
             ,"splittorows"
             ,"splittocols"
             ,"fontfamily"
             ,"fontsize"
             */
                    ]
        ,"keyProxy" : {
            "#" : {
                "8" : "backspace"//
                ,"46" : ""
            }
            ,"ctrl" : {
                "65" : "selectAll"//ctrl+a
            }
            ,"alt" : {
                
            }
        }
        
    };
    
    
    
    
    
    var dtd = (function() {
        function _( s ) {
            for (var k in s) {
                s[k.toUpperCase()] = s[k];
            }
            return s;
        }
        var X = function (t) {
            var a = arguments;
            for (var i = 1; i < a.length; i++) {
                var x = a[i];
                for (var k in x) {
                    if (!t.hasOwnProperty(k)) {
                        t[k] = x[k];
                    }
                }
            }
            return t;
        };
        var A = _({isindex:1,fieldset:1}),
            B = _({input:1,button:1,select:1,textarea:1,label:1}),
            C = X( _({a:1}), B ),
            D = X( {iframe:1}, C ),
            E = _({hr:1,ul:1,menu:1,div:1,blockquote:1,noscript:1,table:1,center:1,address:1,dir:1,pre:1,h5:1,dl:1,h4:1,noframes:1,h6:1,ol:1,h1:1,h3:1,h2:1}),
            F = _({ins:1,del:1,script:1,style:1}),
            G = X( _({b:1,acronym:1,bdo:1,'var':1,'#':1,abbr:1,code:1,br:1,i:1,cite:1,kbd:1,u:1,strike:1,s:1,tt:1,strong:1,q:1,samp:1,em:1,dfn:1,span:1}), F ),
            H = X( _({sub:1,img:1,embed:1,object:1,sup:1,basefont:1,map:1,applet:1,font:1,big:1,small:1}), G ),
            I = X( _({p:1}), H ),
            J = X( _({iframe:1}), H, B ),
            K = _({img:1,embed:1,noscript:1,br:1,kbd:1,center:1,button:1,basefont:1,h5:1,h4:1,samp:1,h6:1,ol:1,h1:1,h3:1,h2:1,form:1,font:1,'#':1,select:1,menu:1,ins:1,abbr:1,label:1,code:1,table:1,script:1,cite:1,input:1,iframe:1,strong:1,textarea:1,noframes:1,big:1,small:1,span:1,hr:1,sub:1,bdo:1,'var':1,div:1,object:1,sup:1,strike:1,dir:1,map:1,dl:1,applet:1,del:1,isindex:1,fieldset:1,ul:1,b:1,acronym:1,a:1,blockquote:1,i:1,u:1,s:1,tt:1,address:1,q:1,pre:1,p:1,em:1,dfn:1}),

            L = X( _({a:0}), J ),//a不能被切开，所以把他
            M = _({tr:1}),
            N = _({'#':1}),
            O = X( _({param:1}), K ),
            P = X( _({form:1}), A, D, E, I ),
            Q = _({li:1,ol:1,ul:1}),
            R = _({style:1,script:1}),
            S = _({base:1,link:1,meta:1,title:1}),
            T = X( S, R ),
            U = _({head:1,body:1}),
            V = _({html:1});

        var block = _({address:1,blockquote:1,center:1,dir:1,div:1,dl:1,fieldset:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,hr:1,isindex:1,menu:1,noframes:1,ol:1,p:1,pre:1,table:1,ul:1}),

            empty =  _({area:1,base:1,basefont:1,br:1,col:1,command:1,dialog:1,embed:1,hr:1,img:1,input:1,isindex:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1});

        return  _({

            // $ 表示自定的属性

            // body外的元素列表.
            $nonBodyContent: X( V, U, S ),

            //块结构元素列表
            $block : block,

            //内联元素列表
            $inline : L,

            $inlineWithA : X(_({a:1}),L),

            $body : X( _({script:1,style:1}), block ),

            $cdata : _({script:1,style:1}),

            //自闭和元素
            $empty : empty,

            //不是自闭合，但不能让range选中里边
            $nonChild : _({iframe:1,textarea:1}),
            //列表元素列表
            $listItem : _({dd:1,dt:1,li:1}),

            //列表根元素列表
            $list: _({ul:1,ol:1,dl:1}),

            //不能认为是空的元素
            $isNotEmpty : _({table:1,ul:1,ol:1,dl:1,iframe:1,area:1,base:1,col:1,hr:1,img:1,embed:1,input:1,link:1,meta:1,param:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1}),

            //如果没有子节点就可以删除的元素列表，像span,a
            $removeEmpty : _({a:1,abbr:1,acronym:1,address:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,s:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,'var':1}),

            $removeEmptyBlock : _({'p':1,'div':1}),

            //在table元素里的元素列表
            $tableContent : _({caption:1,col:1,colgroup:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1,table:1}),
            //不转换的标签
            $notTransContent : _({pre:1,script:1,style:1,textarea:1}),
            html: U,
            head: T,
            style: N,
            script: N,
            body: P,
            base: {},
            link: {},
            meta: {},
            title: N,
            col : {},
            tr : _({td:1,th:1}),
            img : {},
            embed: {},
            colgroup : _({thead:1,col:1,tbody:1,tr:1,tfoot:1}),
            noscript : P,
            td : P,
            br : {},
            th : P,
            center : P,
            kbd : L,
            button : X( I, E ),
            basefont : {},
            h5 : L,
            h4 : L,
            samp : L,
            h6 : L,
            ol : Q,
            h1 : L,
            h3 : L,
            option : N,
            h2 : L,
            form : X( A, D, E, I ),
            select : _({optgroup:1,option:1}),
            font : L,
            ins : L,
            menu : Q,
            abbr : L,
            label : L,
            table : _({thead:1,col:1,tbody:1,tr:1,colgroup:1,caption:1,tfoot:1}),
            code : L,
            tfoot : M,
            cite : L,
            li : P,
            input : {},
            iframe : P,
            strong : L,
            textarea : N,
            noframes : P,
            big : L,
            small : L,
            //trace:
            span :_({'#':1,br:1,b:1,strong:1,u:1,i:1,em:1,sub:1,sup:1,strike:1,span:1}),
            hr : L,
            dt : L,
            sub : L,
            optgroup : _({option:1}),
            param : {},
            bdo : L,
            'var' : L,
            div : P,
            object : O,
            sup : L,
            dd : P,
            strike : L,
            area : {},
            dir : Q,
            map : X( _({area:1,form:1,p:1}), A, F, E ),
            applet : O,
            dl : _({dt:1,dd:1}),
            del : L,
            isindex : {},
            fieldset : X( _({legend:1}), K ),
            thead : M,
            ul : Q,
            acronym : L,
            b : L,
            a : X( _({a:1}), J ),
            blockquote :X(_({td:1,tr:1,tbody:1,li:1}),P),
            caption : L,
            i : L,
            u : L,
            tbody : M,
            s : L,
            address : X( D, I ),
            tt : L,
            legend : L,
            q : L,
            pre : X( G, C ),
            p : X(_({'a':1}),L),
            em :L,
            dfn : L
        });
    })();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Editor的私有方法<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    var initHtml = '<p>' + ($.Client.browser.isIE ? '' : '<br/>') + '</p>';
    
    
    var CMDMAP = {
        "source" : {
            "cmd" : "source"
        }    
        ,"bold" : {
            "cmd" : "command1"
            ,"tag" : ["strong", "b"]
        }
        ,"italic" : {
            "cmd" : "command1"
            ,"tag" : ["em", "i"]
        }
        ,"strikethrough" : {
            "cmd" : "command2"
            ,"tag" : ["span"]
            ,"style" : {
                "text-decoration" : "line-through"
            }
        }
        ,"underline" : {
            "cmd" : "command2"
            ,"tag" : ["span"]
            ,"style" : {
                "text-decoration" : "underline"
            }
        }
        ,"link" : {
            "cmd" : "link"
            ,"tag" : ["a"]
            ,"attribute" : {
                "href" : ""                
            }
        }
        ,"unlink" : {
            "cmd" : "unlink"
            ,"tag" : ["a"]
            ,"attribute" : {
                "href" : ""
            }
        }
        ,"superscript" : {
            "cmd" : "command2"
            ,"tag" : ["sup"]
        }
        ,"subscript" : {
            "cmd" : "command2"
            ,"tag" : ["sub"]
        }
        ,"forecolor" : {
            "cmd" : "command2"
            ,"tag" : ["span"]
            ,"style" : {
                "color" : "#ff0000"
            }
        }
        ,"fontborder" : {
            "cmd" : "command2"
            ,"tag" : ["span"]
            ,"style" : {
                "border" : "1px solid #000"
                
            }
        }
        ,"backcolor" : {
            "cmd" : "command2"
            ,"tag" : ["span"]
            ,"style" : {
                "background-color" : "#00ff00"
            }
        }
        ,"clearformat" : {
            "cmd" : "clearformat"
        }
        ,"lineheight" : {
            "cmd" : "command3"
            ,"tag" : ["p"]
            ,"style" : {
                "line-height" : "2em"
            }
        }
        ,"rowspacingtop" : {
            "cmd" : "command3"
            ,"tag" : ["p"]
            ,"style" : {
                "margin-top" : "10px"
            }
        }
        ,"rowspacingbottom" : {
            "cmd" : "command3"
            ,"tag" : ["p"]
            ,"style" : {
                "margin-bottom" : "10px"
            }
        }
        ,"indent" : {
            "cmd" : "command3"
            ,"tag" : ["p"]
            ,"style" : {
                "text-indent" : "2em"
            }
        }
        ,"justifyleft" : {
            "cmd" : "command3"
            ,"tag" : ["p"]
            ,"style" : {
                "text-align" : "left"
            }
        }
        ,"justifycenter" : {
            "cmd" : "command3"
            ,"tag" : ["p"]
            ,"style" : {
                "text-align" : "center"
            }
        }
        ,"justifyright" : {
            "cmd" : "command3"
            ,"tag" : ["p"]
            ,"style" : {
                "text-align" : "right"
            }
        }
        ,"justifyjustify" : {
            "cmd" : "command3"
            ,"tag" : ["p"]
            ,"style" : {
                "text-align" : "justify"
            }
        }
        ,"insertimage111" : {
            "cmd" : "command4"
            ,"tag" : ["img"]
            ,"attribute" : {
                "src" : "http://news.baidu.com/z/resource/r/image/2014-03-19/2e8b261b7a761de1cc102610ae8d4e25.jpg"
            }
        }
        ,"insertimage" : {
            "cmd" : "insertImage"
        }
        ,"insertvideo" : {
            "cmd" : "command4"
            ,"tag" : ["p"]
            ,"style" : {
                "line-height" : "2em"
            }
        }
        ,"insertgmap" : {
            "cmd" : "command4"
            ,"tag" : ["p"]
            ,"style" : {
                "line-height" : "2em"
            }
        }
        ,"insertbmap" : {
            "cmd" : "command4"
            ,"tag" : ["p"]
            ,"style" : {
                "line-height" : "2em"
            }
        }
        ,"insertiframe" : {
            "cmd" : "command4"
            ,"tag" : ["iframe"]
            ,"attribute" : {
                "src" : "xxx"
                ,"frameborder" : "0"
            }
        }
        ,"insertpagebreak" : {
            "cmd" : "command4"
            ,"tag" : ["hr"]
            ,"attribute" : {
                "size" : "5"
                ,"noshade" : "noshade"
                ,"unselectable" : "on"
            }
        }
        
    };
    
    
    var fillChar = $.Client.browser.isIE6 ? '\ufeff' : '\u200B';
    function isWhitespace (node) {
        return !new RegExp('[^ \t\n\r' + fillChar + ']').test(node.nodeValue);
    }
    
    function isBookmarkNode (node) {
        return node.nodeType == 1 && node.id && /^mark_/i.test(node.id);
    }
    
    function isEmptyInlineElement (node) {
        if (node.nodeType != 1 || !dtd.$removeEmpty[ node.tagName ]) {
            return false;
        }
        node = node.firstChild;
        while (node) {
            //如果是创建的bookmark就跳过
            if (isBookmarkNode(node)) {
                return false;
            }
            if(node.nodeType == 1 && !isEmptyInlineElement(node) ||
                node.nodeType == 3 && !isWhitespace(node)){
                return false;
            }
            node = node.nextSibling;
        }
        return true;
    }
    
    //没有样式也没有属性的行级元素才可以被移除
    function canRemoveInlineElement(node){
        $.logout("noteType="+node.nodeType);
        if (node.nodeType != 1 || !dtd.$removeEmpty[ node.tagName ]) {
            return false;
        }
        var attrList = ["href"];
        var hasAttribute = false;
        for(var i in attrList){
            //$.logout("属性="+ attrList[i]);
            if(node.getAttribute(attrList[i])){
                hasAttribute = true;
                break;
            }
        }
        $.logout(hasAttribute + "," + node.style.cssText );
        if(!hasAttribute && !node.style.cssText){
            return true;
        }
        return false;
        
    }
    
    
    
    function clearEmptySibling (node, ignoreNext, ignorePre) {
        function clear(next, dir) {
            var tmpNode;
            while (next && !isBookmarkNode(next) && (isEmptyInlineElement(next)
                //这里不能把空格算进来会吧空格干掉，出现文字间的空格丢掉了
                || !new RegExp('[^\t\n\r' + fillChar + ']').test(next.nodeValue) )) {
                tmpNode = next[dir];
                remove(next);
                next = tmpNode;
            }
        }
        !ignoreNext && clear(node.nextSibling, 'nextSibling');
        !ignorePre && clear(node.previousSibling, 'previousSibling');
    }
    
    
    
    function filterNode(_node, _tagNames, _style, _attribute){
        var matchTag = false
            ,matchStyle = true
            ,matchAttribute = true;
        if (_node.nodeType == 1 && $.Util.indexOf(_tagNames, _node.tagName.toLowerCase()) > -1) {
            matchTag = true;
            if(_style){
                for(var name in _style){
                    var jsName = styleCache.get(name);
                    if(_node.style[jsName] == null || _node.style[jsName] == ''){
                        matchStyle = false;
                        break;
                    }
                }
            }
            if(_attribute){
                for(var name in _attribute){
                    $.logout(name+":attribute="+_node.getAttribute(name));
                    if(_node.getAttribute(name) == null){
                        matchAttribute = false;
                        break;
                    }
                }
            }
        }
        return matchTag && matchStyle && matchAttribute;
    };
    
    
    function removeStyle(range, _tagNames, _style, _attribute){
        if(_tagNames.constructor != Array){
            _tagNames = [_tagNames];
        }
        //adjustRange(range);
        
        var start = range.startContainer;
        var end = range.endContainer;
        
        var startOffset = range.startOffset;
        var endOffset = range.endOffset;
        
        //var same = start == end ? true : false; 
        
        var start = findParent(start, function(_node){
            return filterNode(_node, _tagNames, _style, _attribute);
        }, false);
        var end = findParent(end, function(_node){
            return filterNode(_node, _tagNames, _style, _attribute);
        }, false);
        
        
        
        
        var mark = new RangeMark();
        mark.createRangeMark(range);
        var tmpRange = rangy.createRange(), frag;
        
        if (start) {
            
            tmpRange.setEndBefore(mark.getStart());
            tmpRange.setStartBefore(start);
            frag = tmpRange.extractContents();
            tmpRange.insertNode(frag);
            clearEmptySibling(start, true);
            start.parentNode.insertBefore(mark.getStart(), start);
            
        }
        if (end) {
            
            tmpRange.setStartAfter(mark.getEnd());
            tmpRange.setEndAfter(end);
            frag = tmpRange.extractContents();
            tmpRange.insertNode(frag);
            clearEmptySibling(end, false, true);
            end.parentNode.insertBefore(mark.getEnd(), end.nextSibling);
        }
        
        
        tmpRange.setStartAfter(mark.getStart());
        tmpRange.setEndBefore(mark.getEnd());
        
        var removeNodes = tmpRange.getNodes([1], function(_node){
            return filterNode(_node, _tagNames, _style, _attribute);
        });
        
        
        for(var i = removeNodes.length - 1; i >= 0; i--){
            
            if(_style || _attribute){
                removeInnerStyle(removeNodes[i], _style, _attribute);
            }else{
                remove(removeNodes[i], true);
            }
        }
        var selection = rangy.getSelection(this._conWin);
        selection.removeAllRanges();
        tmpRange.setStartAfter(mark.getStart());
        tmpRange.setEndBefore(mark.getEnd());
        selection.addRange(tmpRange);
        mark.remove();
    }
    
    
    function onlyContain(_pnode, _cnode){
        if(!_pnode || !_cnode || _pnode.nodeType != 1) return false;
        
        var result = false;
        for(var i in _pnode.childNodes){
            var cur = _pnode.childNodes[i];
            if(isBody(cur)){
                break;
            }
            if((cur.nodeType != 1 && cur.nodeType != 3) || isBookmarkNode(cur)){
                continue;
            }
            if(cur == _cnode){
                result = true;
            }else{
                return false;
            }
        }
        return result;
        
    }
    
    
    function applyStyle(_range, _tagNames, _style, _attribute){
        
        var mark = new RangeMark();
        mark.createRangeMark(_range);
        _range.setStartAfter(mark.getStart());
        _range.setEndBefore(mark.getEnd());
        
        
        var sameTags = [];//记录与_tagNames中相同的父节点
        
        var textNodes = _range.getNodes([3], function(node){
            
            var curNode = node;
            var flag = false;
            while(true){
                if(isBody(curNode)) break;
                
                if(onlyContain(curNode.parentNode, curNode)){
                    if ($.Util.indexOf(_tagNames, curNode.parentNode.tagName.toLowerCase()) > -1) {
                        sameTags.push(curNode.parentNode);
                        flag = true;
                        break;
                    }else{
                        curNode = curNode.parentNode;
                    }
                }else{
                    break;
                }
                
            }
            if(!flag){
                sameTags.push(node);
            }
            
            
            
            return false;
        });
        
        
        
        
        $.Util.each(sameTags, function(node, i){
            if(node.nodeType == 1){
                for(var name in _style){
                    var jsName = styleCache.get(name);
                    node.style[jsName] = _style[name];
                }
                for(var name in _attribute){
                    node.setAttribute(name, _attribute[name]);
                }
            }else if(node.nodeType == 3){
                var wrapper = document.createElement(_tagNames[0]);
                for(var name in _style){
                    var jsName = styleCache.get(name);
                    wrapper.style[jsName] = _style[name];
                }
                for(var name in _attribute){
                    wrapper.setAttribute(name, _attribute[name]);
                }
                _range.selectNode(node);
                _range.surroundContents(wrapper);
            }
        
        });
        
        
        _range.setStartAfter(mark.getStart());
        _range.setEndBefore(mark.getEnd());
        var selection = rangy.getSelection(this._conWin);
        selection.removeAllRanges();
        selection.addRange(_range);
        mark.remove();
    }
    
    
    
    
    
    
    function mouseupWidget(_e){
        var clsName = $.CssHelper.getName(_e.target);
        
        if(!CMDMAP[clsName]) return false;
        
        var cmd = CMDMAP[clsName]["cmd"];//命令名
        
        if(!commandMap[cmd]) return false;
        $.logout("command:"+clsName);
        
        
        
        
        
        
        
        if(cmd == "command1"){
            var tags = CMDMAP[clsName]["tag"];//使用的标签，用数组表示
            commandMap[cmd].call(this, clsName, tags);
        }else if(cmd == "command2"){
            var tags = CMDMAP[clsName]["tag"];//使用的标签，用数组表示
            var style = CMDMAP[clsName]["style"];//部分命令会使用样式
            var attribute = CMDMAP[clsName]["attribute"];//
            commandMap[cmd].call(this, clsName, tags, style, attribute);
        }else{
            var tags = CMDMAP[clsName]["tag"];//使用的标签，用数组表示
            var style = CMDMAP[clsName]["style"];//部分命令会使用样式
            var attribute = CMDMAP[clsName]["attribute"];//
            commandMap[cmd].call(this, clsName, tags, style, attribute);
        }
        //CMDMAP[clsName] && commandMap[CMDMAP[clsName]["cmd"]].call(this, clsName, CMDMAP[clsName]["tag"]);
        return false;
    }
    
    
    function mousedownWidget(_e){
        return false;
    }
    
    
    function editorKeydown(_e){
        
        var proxyCMD = config.keyProxy["#"];
        if(_e.ctrlKey){
            proxyCMD = config.keyProxy["ctrl"];
        }else if(_e.altKey){
            proxyCMD = config.keyProxy["alt"];
        }
        var cmd = proxyCMD[_e.keyCode];
        if(cmd){
            //如果命令返回值为假或没有返回时就阻止一切默认行为
            !(commandMap[cmd].call(this)) || _e.preventDefault();
        }
        return false;
    }
    
    function editorKeyup(_e){
        
        
        return false;
    }
    
    function editorMousedown(_e){
        if($.Util.Format.lowercase(_e.target.tagName) == "img"){
            
            
        }
        
    }
    
    //从传入的节点开始，一直到body间的元素路径
    function getElementPath(_node){
        var result = [];
        do{
            _node = _node.parentNode;
            if($.Util.Format.lowercase(_node.tagName) != 'body'){
                result.push(_node);
            }else{
                break;
            }
        }while(true)
        return result;
    }
    
   
    
    //获取第一个文本节点
    function getNextFirstTextNode(_node, _turnLeft){
        var attr = _turnLeft ? ["previousSibling","lastChild"] : ["nextSibling","firstChild"];
        console.log(_node);
        var point = _node;   
        while(true){
            if(point[attr[0]] == null){
                point = point.parentNode;
                if(point.nodeType == 9) return null;
            }else{
               point = point[attr[0]];
               do{
                    if(point.nodeType == 3){
                       return point;
                    }else if(point.nodeType == 1){
                       point = point[attr[1]];
                       if(!point) break;
                    }else{
                       break;
                    }
               }while(true);
            }
         }
    }
    
    
    //向右获取兄弟节点
    function getRightSideLeaf(startNode, endNode){
        var nodes = [];
        var point = startNode;
        while(true){
            if(point.nextSibling == null){//右边没有兄弟节点
                point = point.parentNode;
                if($.Util.Format.lowercase(point.tagName) == 'body' ) break; 
            }else{//右边有兄弟节点
                point = point.nextSibling;
                if(!(point.nodeType == 1 || point.nodeType == 3)) continue;
                if(point.nodeType == 1){
                    while(point.childNodes.length > 0){
                        point = point.childNodes[0];
                    }
                }
                if(point != endNode){
                    nodes.push(point);
                }else{
                    break;
                }
            }
        }
        return nodes;
    }
    
    
    
    
    

    function getChildTextNode(_node, _turnLeft){
        var point = _node;
        var attr = _turnLeft ? 'firstChild' : 'lastChild';
        do{
            if(point.nodeType == 3){
                return point;
            }else{
                if(point[attr]){
                    point = point[attr];
                }else{
                    return null;
                }   
            }
        }while(true);
    }
    
    
    //将range调整到合适的位置
    //例： <em><span>xxxxxx[</span><b>xxxxxx]</b></em>  => <em><span>xxxxxx</span><b>[xxxxxx]</b></em>
    function adjustRange(range){
        var startContainer = range.startContainer;
        var endContainer = range.endContainer;
        var startOffset = range.startOffset;
        var endOffset = range.endOffset;
        
        var point = range.startContainer;
        if(!(point.nodeType == 3 && startOffset < point.length)){//如果开始位置落在文本节点上，则不作处理
            if(point.nodeType == 1 && startOffset == 0){//开始位置为普通节点，位置为第一个子元素之前
              var tmp = getChildTextNode(point, true);//获取第一个文本类型的子元素
              if(!tmp){//没有文本类型的子元素
                    point = getNextFirstTextNode(point);//向右边查找文本类型的子元素
                }else{
                    point = tmp;//第一个子节点中找到文本类型子元素
                }
            }else{
                if(point.nodeType == 3){//文本节点的最末端
                    point = point.parentNode;
                }else if(point.nodeType == 1){//第一个子元素之后
                    if(startOffset == startContainer.childNodes.length){//最后一个结点的后面
                        point = startContainer;
                    }else{//第一个子元素之后
                        point = startContainer.childNodes[startOffset - 1];
                    }
                }
                point = getNextFirstTextNode(point);
            
            }
            range.setStartBefore(point);
        }
        
        var point = range.endContainer;
        if(!(point.nodeType == 3 && endOffset > 0)){//如果结束位置落在文本节点上，则不作处理
            if(point.nodeType == 1 && endOffset == point.childNodes.length){//开始位置为普通节点，位置为第一个子元素之前
              var tmp = getChildTextNode(point, false);//获取第一个文本类型的子元素
              if(!tmp){//没有文本类型的子元素
                    point = getNextFirstTextNode(point, true);//向右边查找文本类型的子元素
                }else{
                    point = tmp;//第一个子节点中找到文本类型子元素
                }
            }else{
                if(point.nodeType == 3){//文本节点的最末端
                    point = point.parentNode;
                }else if(point.nodeType == 1){//第一个子元素之后
                    if(endOffset == 0){//第一个结点的前面
                        point = endContainer;
                    }else{//最后一个子元素之前
                        point = endContainer.childNodes[endOffset];
                    }
                }
                point = getNextFirstTextNode(point, true);
            }
            range.setEndAfter(point);
        }
        
        return range;
        
    }
    
    /**
     * 给定一个节点数组，在通过指定的过滤器过滤后， 获取其中满足过滤条件的第一个节点
     * @method filterNodeList
     * @param { Array } nodeList 需要过滤的节点数组
     * @param { Function } fn 过滤器， 对符合条件的节点， 执行结果返回true， 反之则返回false
     * @return { Node | NULL } 如果找到符合过滤条件的节点， 则返回该节点， 否则返回NULL
     * @example
     * ```javascript
     * var divNodes = document.getElementsByTagName("div");
     * divNodes = [].slice.call( divNodes, 0 );
     *
     * //output: null
     * console.log( filterNodeList( divNodes, function ( node ) {
     *     return node.tagName.toLowerCase() !== 'div';
     * } ) );
     * 
     */

    /**
     * 给定一个节点数组nodeList和一组标签名tagNames， 获取其中能够匹配标签名的节点集合中的第一个节点
     * @method filterNodeList
     * @param { Array } nodeList 需要过滤的节点数组
     * @param { String } tagNames 需要匹配的标签名， 多个标签名之间用空格分割
     * @return { Node | NULL } 如果找到标签名匹配的节点， 则返回该节点， 否则返回NULL
     * @example
     * ```javascript
     * var divNodes = document.getElementsByTagName("div");
     * divNodes = [].slice.call( divNodes, 0 );
     *
     * //output: null
     * 
     * 
     */

    /**
     * 给定一个节点数组，在通过指定的过滤器过滤后， 如果参数forAll为true， 则会返回所有满足过滤
     * 条件的节点集合， 否则， 返回满足条件的节点集合中的第一个节点
     * @method filterNodeList
     * @param { Array } nodeList 需要过滤的节点数组
     * @param { Function } fn 过滤器， 对符合条件的节点， 执行结果返回true， 反之则返回false
     * @param { Boolean } forAll 是否返回整个节点数组, 如果该参数为false， 则返回节点集合中的第一个节点
     * @return { Array | Node | NULL } 如果找到符合过滤条件的节点， 则根据参数forAll的值决定返回满足
     *                                      过滤条件的节点数组或第一个节点， 否则返回NULL
     * @example
     * javascript
     * var divNodes = document.getElementsByTagName("div");
     * divNodes = [].slice.call( divNodes, 0 );
     *
     * //output: 3（假定有3个div）
     * 
     *
     * var nodes = filterNodeList( divNodes, function ( node ) {
     *     return node.tagName.toLowerCase() === 'div';
     * }, true );
     *
     * //output: 3
     * 
     *
     * var node = filterNodeList( divNodes, function ( node ) {
     *     return node.tagName.toLowerCase() === 'div';
     * }, false );
     *
     * //output: div
     * 
     * 
     */
    function filterNodeList(nodelist, filter, forAll){
        var results = [];
        if(!$.Util.isFunction(filter)){
            var str = filter;
            filter = function(n){
                return n.nodeType == 1 &&  $.Util.indexOf($.Util.isArray(str) ? str : str.split(' '), n.tagName.toLowerCase()) != -1;
            };
        }
        $.Util.each(nodelist, function(n){
            filter(n) && results.push(n);
        });
        return results.length  == 0 ? null : results.length == 1 || !forAll ? results[0] : results;
    }
    
    function isBody(node) {
        return  node && node.nodeType == 1 && node.tagName.toLowerCase() == 'body';
    }
    
    /**
     * 根据给定的过滤规则filterFn， 查找符合该过滤规则的node节点的第一个祖先节点，
     * 查找的起点是给定node节点的父节点。
     * @method findParent
     * @param { Node } node 需要查找的节点
     * @param { Function } filterFn 自定义的过滤方法。
     * @warning 查找的终点是到body节点为止
     * @remind 自定义的过滤方法filterFn接受一个Node对象作为参数， 该对象代表当前执行检测的祖先节点。 如果该
     *          节点满足过滤条件， 则要求返回true， 这时将直接返回该节点作为findParent()的结果， 否则， 请返回false。
     * @return { Node | Null } 如果找到符合过滤条件的节点， 就返回该节点， 否则返回NULL
     * @example
     * ```javascript
     * var filterNode = UE.dom.domUtils.findParent( document.body.firstChild, function ( node ) {
     *
     *     //由于查找的终点是body节点， 所以永远也不会匹配当前过滤器的条件， 即这里永远会返回false
     *     return node.tagName === "HTML";
     *
     * } );
     *
     * //output: true
     * console.log( filterNode === null );
     * ```
     */

    /**
     * 根据给定的过滤规则filterFn， 查找符合该过滤规则的node节点的第一个祖先节点，
     * 如果includeSelf的值为true，则查找的起点是给定的节点node， 否则， 起点是node的父节点
     * @method findParent
     * @param { Node } node 需要查找的节点
     * @param { Function } filterFn 自定义的过滤方法。
     * @param { Boolean } includeSelf 查找过程是否包含自身
     * @warning 查找的终点是到body节点为止
     * @remind 自定义的过滤方法filterFn接受一个Node对象作为参数， 该对象代表当前执行检测的祖先节点。 如果该
     *          节点满足过滤条件， 则要求返回true， 这时将直接返回该节点作为findParent()的结果， 否则， 请返回false。
     * @remind 如果includeSelf为true， 则过滤器第一次执行时的参数会是节点本身。
     *          反之， 过滤器第一次执行时的参数将是该节点的父节点。
     * @return { Node | Null } 如果找到符合过滤条件的节点， 就返回该节点， 否则返回NULL
     * @example
     * ```html
     * <body>
     *
     *      <div id="test">
     *      </div>
     *
     *      <script type="text/javascript">
     *
     *          //output: DIV, BODY
     *          var filterNode = UE.dom.domUtils.findParent( document.getElementById( "test" ), function ( node ) {
     *
     *              console.log( node.tagName );
     *              return false;
     *
     *          }, true );
     *
     *      </script>
     * </body>
     * ```
     */
    function findParent(node, filterFn, includeSelf) {
        if (node && !isBody(node)) {
            node = includeSelf ? node : node.parentNode;
            while (node) {
                if (!filterFn || filterFn(node) || isBody(node)) {
                    return filterFn && !filterFn(node) && isBody(node) ? null : node;
                }
                node = node.parentNode;
            }
        }
        return null;
    }
    
    /**
     * 查找节点node的祖先节点集合， 查找的起点是给定节点的父节点，结果集中不包含给定的节点。
     * @method findParents
     * @param { Node } node 需要查找的节点对象
     * @return { Array } 给定节点的祖先节点数组
     * @grammar findParents(node)  => Array  //返回一个祖先节点数组集合，不包含自身
     * @grammar findParents(node,includeSelf)  => Array  //返回一个祖先节点数组集合，includeSelf指定是否包含自身
     * @grammar findParents(node,includeSelf,filterFn)  => Array  //返回一个祖先节点数组集合，filterFn指定过滤条件，返回true的node将被选取
     * @grammar findParents(node,includeSelf,filterFn,closerFirst)  => Array  //返回一个祖先节点数组集合，closerFirst为true的话，node的直接父亲节点是数组的第0个
     */

    /**
     * 查找节点node的祖先节点集合， 如果includeSelf的值为true，
     * 则返回的结果集中允许出现当前给定的节点， 否则， 该节点不会出现在其结果集中。
     * @method findParents
     * @param { Node } node 需要查找的节点对象
     * @param { Boolean } includeSelf 查找的结果中是否允许包含当前查找的节点对象
     * @return { Array } 给定节点的祖先节点数组
     */
    function findParents(node, includeSelf, filterFn, closerFirst) {
        var parents = includeSelf && ( filterFn && filterFn(node) || !filterFn ) ? [node] : [];
        while (node = findParent(node, filterFn)) {
            parents.push(node);
        }
        return closerFirst ? parents : parents.reverse();
    }
    
   
    
    
    function removeInnerStyle(element, _style, _attribute) {
        
        
        for(var name in _style){
            
            
            if(element.style.removeProperty){
                var jsName = styleCache.get(name);
                element.style.removeProperty (name);
            }else{
                element.style.cssText = element.style.cssText.replace(new RegExp(name + '[^:]*:[^;]+;?','ig'),'');
            }
            
            
        }
        
        if (!element.style.cssText) {
            element.removeAttribute("style");
        }
        
        
        for(var name in _attribute){
            element.removeAttribute(name);
        }
        
        
        if(canRemoveInlineElement(element)){
            remove(element, true);
        }
    }
    
    
    
    
    function remove (node, keepChildren) {
        var parent = node.parentNode,
            child;
        if (parent) {
            if (keepChildren && node.hasChildNodes()) {
                while (child = node.firstChild) {
                    parent.insertBefore(child, node);
                }
            }
            parent.removeChild(node);
        }
        return node;
    }
    
    var RangeMark = function(){
        this.start = null;
        this.end = null;
        
    };
    RangeMark.prototype = {
        //给range做开始与结束的标记
        createRangeMark : function(range){
            var newRange = range.cloneRange();
            var markHtml = "<span class='{classname}' id='{markid}'>\u200D</span>";
            var startOfragment = EJS.DomHelper.buildHtml(EJS.Util.Format.replace(markHtml, {
                "classname" : "mark"
                ,"markid" : "mark_"+ $.IDX.next()
            }));
            this.start = startOfragment.childNodes[0];
            
            var collapsed = true;
            if(!range.collapsed){
                collapsed = false;
                var endOfragment = EJS.DomHelper.buildHtml(EJS.Util.Format.replace(markHtml, {
                    "classname" : "mark"
                    ,"markid" : "mark_"+ $.IDX.next()
                }));
                this.end = endOfragment.childNodes[0];
                newRange.collapse();
                newRange.insertNode(this.end);
            }
            
            
            range.insertNode(this.start);
            
            range.setStartAfter(this.start);
            
            if(!collapsed){
                range.setEndBefore(this.end);
                var selection = rangy.getSelection(this._conWin);
                selection.removeAllRanges();
                selection.addRange(range);
            }else{
                range.collapse(true);
            }
            
            
            
        }
        ,getStart : function(){
            return this.start;
        }
        ,getEnd : function(){
            return this.end;
        }
        ,remove : function(){
            this.start && this.start.parentNode.removeChild(this.start);
            this.end && this.end.parentNode.removeChild(this.end);
            this.start = null;
            this.end = null;
        }
    };
    
    
    

    
    var styleCache = function(){
        var map = $.Util.MapFactory.newInstance();
        return{
            get : function(_name){
                if(!map.contains(_name)){
                    map.put(_name, _name.toLowerCase().replace(/-./g, function (match) {
                        return match.charAt(1).toUpperCase();
                    }));
                }
                return map.get(_name);
            }
        };
    }();
    
    function getCurrentRange(){
        var selection = rangy.getSelection(this._conWin);
        var range = selection.getRangeAt(0);
        if(!selection.isCollapsed){//如果没有选区则直接返回
            range = adjustRange(range);
        }
        return range;
    }
    
    //清除格式
    function clearformat(_html){
        console.log('clearformat');
        return util.html.format(_html);
    }

    
  //从本地上传图片时，成功加载图片后调用的方法
    function uploadLocalImgReady(_view, _id, _url){
    }
    
    //图片上传成功调用的方法
    function uploadLocalImgDone(_view, _id, _data){
        this.insertHTML('<img src="'+_data[_id]+'" />');
    }
    
    function uploadLocalImgProgress(_view, _id, _loaded, _total){
    }
    
    function uploadLocalImgFailure(_view, _id){
    }
    
    
    
    
    
    var commandMap = {
            source : function(){
                
                if(this.sourceIsDisplay){
                    this.sourceIsDisplay = false;
                    $.DomHelper.hide(this.getDom().childNodes[2]);
                    $.DomHelper.show(this.getDom().childNodes[1]);
                    this._conWin.document.body.innerHTML = this.getDom().childNodes[2].childNodes[0].value.replace(/\t/g, '');
                    commandMap.focus.call(this);
                }else{
                    this.sourceIsDisplay = true;
                    $.DomHelper.hide(this.getDom().childNodes[1]);
                    $.DomHelper.show(this.getDom().childNodes[2]);
                    // this.getDom().childNodes[2].childNodes[0].value = $.HtmlHelper.HTMLtoXML(this._conWin.document.body.innerHTML, true);
                    this.getDom().childNodes[2].childNodes[0].value = HTMLFormat(this._conWin.document.body.innerHTML);
                }
            }
            ,command1 : function(cmdName, tagNames){
                var selection = rangy.getSelection(this._conWin);
                if(selection.isCollapsed){//如果没有选区则直接返回
                    return;
                }
                var range = selection.getRangeAt(0);
                //adjustRange(range);//调整选区范围
                if(filterNodeList(findParents(range.startContainer, true, null, true), tagNames)){
                    removeStyle(range, tagNames);
                }else{
                    applyStyle(range, tagNames);
                }
            }
            ,command2 : function(_cmdName, _tagNames, _style, _attribute){
                
                var range = getCurrentRange.call(this);
                if(range.collapsed){
                    return false;
                }
                adjustRange(range);
                if(filterNodeList(findParents(range.startContainer, true, null, true), function(_node){
                    $.logout(_node.tagName + "=" +_node.nodeType+"="+_tagNames);
                    return filterNode(_node, _tagNames, _style, _attribute);
                })){
                    $.logout("移除");
                    removeStyle(range, _tagNames, _style, _attribute);
                }else{
                    $.logout("增加");
                    applyStyle(range, _tagNames, _style, _attribute);
                }
            }
            ,command3 : function(_cmdName, _tagNames, _style, _attribute){
                var range = getCurrentRange.call(this);
                var nodes;
                var start = findParent(range.startContainer, function(_node){
                    return filterNode(_node, _tagNames, null, null);
                }, true);
                if(!start || start.nodeType != 1) return false;
                if(!range.collapsed){
                    var end = findParent(range.endContainer, function(_node){
                        return filterNode(_node, _tagNames, null, null);
                    }, true);
                    if(!end || end.nodeType != 1) return false;
                    
                    if(start == end){
                        nodes = [start];
                    }else{
                        nodes = range.getNodes([1], function(_node){
                            return filterNode(_node, _tagNames, null, null);
                        });
                    }
                }else{
                    nodes = [start];
                }
                for(var i in nodes){
                    for(var name in _style){
                        var jsName = styleCache.get(name);
                        nodes[i].style[jsName] = _style[name];
                    }
                    for(var name in _attribute){
                        nodes[i].setAttribute(name, _attribute[name]);
                    }
                }
            }
            ,command4 : function(_cmdName, _tagNames, _style, _attribute){
                var range = getCurrentRange.call(this);
                
                var element = document.createElement(_tagNames[0]);
                for(var name in _style){
                    var jsName = styleCache.get(name);
                    element.style[jsName] = _style[name];
                }
                for(var name in _attribute){
                    element.setAttribute(name, _attribute[name]);
                }
                
                var start = findParent(range.startContainer, function(_node){
                    return filterNode(_node, ["p"], null, null);
                }, true);
                if(!start || start.nodeType != 1) return false;
                
                
                var flag = false;
                if(flag){
                    var mark = new RangeMark();
                    mark.createRangeMark(range);
                    range.setStartBefore(start);
                    range.setEndBefore(mark.getStart());
                    frag = range.extractContents();
                    range.insertNode(frag);
                    $.DomHelper.insertBefore(mark.getStart(), mark.getStart().parentNode);
                    range.setStartBefore(mark.getStart());
                    range.collapse(true);
                    range.insertNode(element);
                    mark.remove();
                }else{
                    range.insertNode(element);
                }
            }
            ,insertImage : function(){
                
                
                this.uploader.openFileSelector("/con/dx/info/uploadthumb", $.FunctionHelper.bind(this, uploadLocalImgReady), $.FunctionHelper.bind(this, uploadLocalImgDone), $.FunctionHelper.bind(this, uploadLocalImgProgress));
                
            }
            ,clearformat : function(){
                var result = clearformat(this.getValue());
                $.logout(result);
                this.setValue(result);
            }
            
            ,link : function(_cmdName, _tagNames, _style, _attribute){
                
                
                var range = getCurrentRange.call(this);
                if(range.collapsed){
                    return false;
                }
                if(filterNodeList(findParents(range.startContainer, true, null, true), function(node){
                    if(node.nodeType == 1 && $.Util.indexOf(_tagNames, node.tagName.toLowerCase()) > -1){
                        return true;
                    }
                })){//如果选区上已有A标签则先对其先移除
                    $.logout("移动链接");
                    removeStyle(range, _tagNames, _style, _attribute);
                }
                //这里弹出对话框输入要链接的地址
                
                $.logout("添加链接");
                var range = getCurrentRange.call(this);
                applyStyle(range, _tagNames, _style, _attribute);
                
            }
            ,unlink : function(_cmdName, _tagNames, _style, _attribute){
                var range = getCurrentRange.call(this);
                if(range.collapsed){
                    return false;
                }
                if(filterNodeList(findParents(range.startContainer, true, null, true), function(node){
                    if(node.nodeType == 1 && $.Util.indexOf(_tagNames, node.tagName.toLowerCase()) > -1){
                        return true;
                    }
                })){//如果选区上已有A标签则先对其先移除
                    
                    removeStyle(range, _tagNames, _style, _attribute);
                }
            }
            //全选
            ,selectAll : function(){
                
                var range = rangy.createRange(); 
                
                range.setStartBefore(this._conWin.document.body.firstChild);
                range.setEndAfter(this._conWin.document.body.lastChild);
                this.selection.removeAllRanges(); 
                this.selection.addRange(range);
                
                
            }
            //编辑器获得焦点
            ,focus : function(){
                
                
                
                
                var selection = rangy.getSelection(this._conWin);
                var range = rangy.createRange(); 
                
                range.setStart(this._conWin.document.body.firstChild, 0);
                range.collapse(true);
                selection.removeAllRanges(); 
                selection.addRange(range);
                
                
                
                
            }
            ,backspace : function(){
                if(this.isEmpty()){
                    
                    return true;
                }else{
                    var selection = rangy.getSelection(this._conWin);
                    
                    var range = selection.getRangeAt(0);
                    
                    var range1 = rangy.createRange(); 
                    range1.setStartBefore(this._conWin.document.body.firstChild);
                    range1.setEndAfter(this._conWin.document.body.lastChild);
                    
                }
            }
    };
    
    
    function propertiesSet(_id, _properties){
        this.setLeft(!isNaN(_properties.left) ? parseInt(_properties.left) : 0);
        this.setTop(!isNaN(_properties.top) ? parseInt(_properties.top) : 0);
        this.setWidth(!isNaN(_properties.width) ? parseInt(_properties.width) : 100);
        this.setHeight(!isNaN(_properties.height) ? parseInt(_properties.height) : 100); 
        $.DomHelper.setAttribute(this.getDom(), {oid : this.getObjectId()});
        var innerPage = (($.Client.browser.isIE && $.Client.browser.version < 9) ? "" : "<!DOCTYPE html>") +
        "<html xmlns=\\\"http://www.w3.org/1999/xhtml\\\"  class=\\\"view\\\">" +
        
        "<head></head>" +
        "<body onload=(function(){(window.parent.EJS.Component.EditorFactory.find(\\\""+_id+"\\\"))._iframeReady();})()></body>" +
        "</html>";
        if($.Client.browser.isIE){
            this.getDom().childNodes[1].childNodes[0].src = "javascript:void(function(){document.open();document.write(\""+innerPage+"\");document.close();}())";
        }else{
            //这里有点奇怪，如果用setTimeout的方式调用，在chrome里会执行两次脚本
            this.getDom().childNodes[1].childNodes[0].src = "javascript:void(window.setTimeout(function(){document.open();document.write(\""+innerPage+"\");document.close();}, 0))";
        }
        this.uploader = $.Component.UploaderFactory.find(EJS.Component.UploaderFactory.create({}, null, null, false));
        
    };
    function release(){
        this.hide();
        this.getDom().childNodes[1].childNodes[0].src = "";
        this.getDom().childNodes[2].childNodes[0].value = "";
        //回收上传控件
        $.Component.UploaderFactory.recycle(this.uploader.getObjectId());
        delete this.uploader;
    }
    
/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Editor的私有方法>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
    
    
    var Editor = $.ClassHelper.create();
    Editor.prototype = $.ObjectHelper.extend({
        initialize : function(_id, _properties){
            _properties = _properties || {};
            this.theme = _properties.theme || config.theme;
            
            var widgetHTML = "";
            for(var i = 0; i < config.widget.length; i++){
                widgetHTML += '<dd class="enable" unselectable="on"><a unselectable="on"><em class="'+config.widget[i]+'" unselectable="on"></em></a></dd>';
            }
            //alert("##"+_id);
            var ofragment = EJS.DomHelper.buildHtml(
                EJS.Util.Format.replace(config.outlineHTML, {
                    "className" : config.style[this.theme].className
                    ,"widget" : widgetHTML
                    //,"src" : "javascript:void(function(){if(window.parent.EJS.Component.EditorFactory.contains(\""+_id+"\")){document.open();document.write(\""+innerPage+"\");document.close();}}())"
                    ,"src" : "" 
                })
            );
            this.setDom(ofragment.childNodes[0]);
            
            
            $.EventListener.add(this.getDom().childNodes[0], "mousedown", EJS.FunctionHelper.bindAsEvent(this, mousedownWidget));
            
            $.EventListener.add(this.getDom().childNodes[0], "click", EJS.FunctionHelper.bindAsEvent(this, mouseupWidget));
           
        }
        ,_iframeReady : function(){
            var toolbarHeight = config.style[this.theme].toolbarHeight;
            
            this._frameDom = this.getDom().childNodes[1].childNodes[0];
            this._conWin = this._frameDom.contentWindow;
            //ie浏览器会将焦点放置到编辑器内第一个p标签外面，造成内容输入到p标签之外
            if($.Client.browser.isIE){
                this._conWin.document.body.disabled = true;
                this._conWin.document.body.contentEditable = true;
                this._conWin.document.body.disabled = false;
            }else{
                this._conWin.document.body.contentEditable = true;
            }
           //this._frameDom.focus();
           //this._conWin.focus();
           
            
            //this._conWin.document.body.contentEditable = true;
            //关闭拼写检查
            this._conWin.document.body.spellcheck = false;
            this._conWin.document.body.innerHTML = initHtml;
            //10 为toolbar 的 padding高度
            $.DomHelper.setStyle(this._frameDom.contentWindow.document.body, {"height" : (this.height - toolbarHeight - 20 - 10) + "px"});
            $.EventListener.add(this._conWin.document, "keydown", EJS.FunctionHelper.bindAsEvent(this, editorKeydown));
            $.EventListener.add(this._conWin.document, "keyup", EJS.FunctionHelper.bindAsEvent(this, editorKeyup));
            $.EventListener.add(this._conWin.document, "mousedown", EJS.FunctionHelper.bindAsEvent(this, editorMousedown));
            this.selection =  rangy.getSelection(this._conWin);
            this._conWin.document.body.focus();
            return this;
        }
        ,setHeight : function(_height){
            this.height = _height;
            $.DomHelper.setStyle(this.getDom(), {"height" : _height + "px"});
            var toolbarHeight = config.style[this.theme].toolbarHeight;
            //10 为toolbar 的 padding高度
            $.DomHelper.setStyle(this.getDom().childNodes[0], {"height" : (toolbarHeight) + "px"});
            $.DomHelper.setStyle(this.getDom().childNodes[1], {"height" : (_height - toolbarHeight  - 10) + "px"});
            $.DomHelper.setStyle(this.getDom().childNodes[2], {"height" : (_height - toolbarHeight  - 10) + "px"});
            
        }
        ,isEmpty : function(){
            var notEmptyTag = ['table', 'ul', 'ol', 'dl', 'iframe', 'area', 'base', 'col', 'hr', 'img', 'embed', 'input', 'link', 'meta', 'param', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
            var reg = /[ \t\r\n]/g;
            if (this._conWin.document.body[$.Client.browser.isIE ? 'innerText' : 'textContent'].replace(reg, '').length > 0) {
                return false;
            }
            for(var i in notEmptyTag){
                if(this._conWin.document.body.getElementsByTagName(notEmptyTag[i]).length > 0){
                    return false;
                }
            }
            return true;
        }
        ,selectAll : function(){
            //alert(12345467);
            commandMap.selectAll.call(this);
        }
        ,focus : function(){
            commandMap.focus.call(this);
        }
        ,setValue : function(_val){
            var self = this;
            //防止编辑器还没有加载成功时向其赋值
            window.setTimeout(function(){
                // self._conWin.document.body.innerHTML = $.HtmlHelper.HTMLtoXML(_val);
                self._conWin.document.body.innerHTML = HTMLFormat(_val);
            }, 0);
            //this._conWin.document.body.innerHTML = $.HtmlHelper.HTMLtoXML(_val);
        }
        ,getValue : function(){
            return this._conWin.document.body.innerHTML;
        }
        ,insertHTML : function(_html){
            var ofragment = $.DomHelper.buildHtml(_html);
            for(var i = 0; i < ofragment.childNodes.length; i++){
                var range = getCurrentRange.call(this);
                range.insertNode(ofragment.childNodes[i]);
            }
            
        }
        
        
    }
    ,new $.Component.Base());
    
    $.Component.EditorFactory = $.Component.Factory.create(Editor, propertiesSet, release, new $.Util.Index(0, "Editor_"));


})(EJS);

/** 格式化html，默认清除html标签所有属性，将所有标签替换为p 
    可自定义，不删除的属性，不替换的标签
    util.html.loadConfig();加载
    util.html.format(str);格式化
*/
var util = {};

Array.prototype.contains = function (item) {
    if (!item) {
        return false;
    }
    return new RegExp("(^|,)" + item.toString() + "($|,)").test(this);
};
(function(P){
    var _this = null;
    _this = P.html = {
        /** 默认配置 */
        defaultConfig : {
            //,ignoreTags : ['table','img']//忽略标签
            ignoreTags : ['br', 'span', 'a', 'img', 'b', 'strong', 'i', 'u', 'font', 'p', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'h1', 'h2', 'h3', 'h4', 'hr','table','thead','th','tbody','tr','td'],//忽略属性
            ignoreAttrs : {
              img: ['src', 'alt', 'width', 'height', 'data-non-image'],
              a: ['href', 'target'],
              font: ['color'],
              code: ['class']
            },
            ignoreStyles : {
              span: ['color'],
              p: ['margin-left', 'text-align'],
              h1: ['margin-left', 'text-align'],
              h2: ['margin-left', 'text-align'],
              h3: ['margin-left', 'text-align'],
              h4: ['margin-left', 'text-align']
            }
        },
        _cleanNode : function(node, tag){
            if (!node) {//node不存在
                return;
            }

            if (_this._isEmptyNode(node)){//node 是空的或者 仅内容都为空格
                var pNode = node.parentNode;
                node.remove();
                // _this._cleanNode(pNode);
            }else{
                if (node.nodeType == 3 || node.localName === null) {//如果是文本节点
                    return;
                }
              
                var childNodes = [];
                var length = 0;
                var index = 0;
                if (node.localName && _this.defaultConfig.ignoreTags.contains(node.localName)) {//不需要替换为p的标签
                    _this._cleanNodeAttrs(node);
                    childNodes = node.childNodes;
                    length = childNodes.length - 1;
                    for (index = length; index >= 0; index--) {
                        _this._cleanNode(childNodes[index]);
                    }

                }else{//默认讲标签替换为p
                    /** replace tags */
                    var p = document.createElement('p');
                    p.innerHTML = node.innerHTML;

                    if(node.parentNode){
                        node.parentNode.replaceChild(p, node);  
                    }

                    childNodes = p.childNodes;
                    length = childNodes.length - 1;
                    for (index = length; index >= 0; index--) {
                        _this._cleanNode(childNodes[index]);
                    }
                }
            }
        },
        _cleanNodeAttrs : function(node){//清除node上的属性
            if (node.nodeType == 3) {
                return;
            } 
            var attrs = node.attributes;
            var length = attrs.length - 1;
            for (var i = length; i >= 0; i--) {
                var attrNode = attrs[i];
                if (node.localName && attrNode.localName && _this.defaultConfig.ignoreAttrs[node.localName] && _this.defaultConfig.ignoreAttrs[node.localName].contains([attrNode.localName])) {
                    continue;//保留node下的attr属性，如img的src，a标签的href等
                }
                node.attributes[i]   = '';
                if (node.removeAttributeNode) {//高级浏览器支持removeAttributeNode方法
                    node.removeAttributeNode(node.attributes[i]);// node.attributes[i];
                }else{//低版本浏览器不支持removeAttributeNode 替代方法
                    // console.log(node.attributes[i]);
                }
            }
        },
        _isEmptyNode : function(node, tag){
            if (node.nodeType == 8) {
                return true;
            }
            console.log(node.childNodes.length + ' ' + node.localName);
            if (node.childNodes.length > 0 || node.localName == 'img') {
                return false;
            }
            var text = '';
            if (node.nodeType == 1) {//it is a text node
                text = node.innerHTML;
            }else if (node.nodeType == 3) {//it is a text node
                text = node.data;
            }

            text = text.replace(/\s|&nbsp;/g,'');//去掉空格之后，判断node内容是否全为空格
            if(text === ''){
                return true;
            }
            return false;
        },
        _isEmptyDeepSearch : function(node){
            if(node.childNodes && node.childNodes == 1){
                _this._isEmptyDeepSearch(node.childNodes[0]);
            }
            if (node.childNodes.length > 0 || node.localName == 'img') {
                return false;
            }
            var text = '';
            if (node.nodeType == 1) {//it is a text node
                text = node.innerHTML;
            }else if (node.nodeType == 3) {//it is a text node
                text = node.data;
            }

            text = text.replace(/\s|&nbsp;/g,'');//去掉空格之后，判断node内容是否全为空格
            if(text === ''){
                return true;
            }
            return false;
        },
        /** 格式化并返回格式化结果 */
        format : function(str){
            var tempNode = document.createElement('div');
            tempNode.innerHTML = str;
            var start = new Date().getTime();

            var childNodes = tempNode.childNodes;
            var length = childNodes.length - 1;

            console.log(HTMLFormat(tempNode.innerHTML));
            for (var i = length; i >= 0; i--) {
                _this._cleanNode(childNodes[i]);
            }

            console.log(HTMLFormat(tempNode.innerHTML));

            // console.log('use time:' + (new Date().getTime() - start) + 'ms');

            return tempNode.innerHTML;
        }
    };
})(util);



/** html格式化 */
var HTMLFormat = (function() {
    function style_html(html_source, indent_size, indent_character, max_char) {
        var Parser, multi_parser;
 
        Parser = function () {
 
            this.pos = 0;
            this.token = '';
            this.current_mode = 'CONTENT';
            this.tags = {
                parent: 'parent1',
                parentcount: 1,
                parent1: ''
            };
            this.tag_type = '';
            this.token_text = this.last_token = this.last_text = this.token_type = '';
 
 
            this.Utils = {
                whitespace: "\n\r\t ".split(''),
                single_token: 'br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed'.split(','),
                extra_liners: 'head,body,/html'.split(','),
                in_array: function(what, arr) {
                    for (var i = 0; i < arr.length; i++) {
                        if (what === arr[i]) {
                            return true;
                        }
                    }
                    return false;
                }
            };
 
            this.get_content = function() {
                var char = '';
                var content = [];
                var space = false;
                while (this.input.charAt(this.pos) !== '<') {
                    if (this.pos >= this.input.length) {
                        return content.length ? content.join('') : ['', 'TK_EOF'];
                    }
 
                    char = this.input.charAt(this.pos);
                    this.pos++;
                    this.line_char_count++;
 
 
                    if (this.Utils.in_array(char, this.Utils.whitespace)) {
                        if (content.length) {
                            space = true;
                        }
                        this.line_char_count--;
                        continue;
                    } else if (space) {
                        if (this.line_char_count >= this.max_char) {
                            content.push('\n');
                            for (var i = 0; i < this.indent_level; i++) {
                                content.push(this.indent_string);
                            }
                            this.line_char_count = 0;
                        } else {
                            content.push(' ');
                            this.line_char_count++;
                        }
                        space = false;
                    }
                    content.push(char);
                }
                return content.length ? content.join('') : '';
            };
 
            this.get_script = function() {
                var char = '';
                var content = [];
                var reg_match = new RegExp('\<\/script' + '\>', 'igm');
                reg_match.lastIndex = this.pos;
                var reg_array = reg_match.exec(this.input);
                var end_script = reg_array ? reg_array.index : this.input.length;
                while (this.pos < end_script) {
                    if (this.pos >= this.input.length) {
                        return content.length ? content.join('') : ['', 'TK_EOF'];
                    }
 
                    char = this.input.charAt(this.pos);
                    this.pos++;
 
 
                    content.push(char);
                }
                return content.length ? content.join('') : '';
            };
 
            this.record_tag = function(tag) {
                if (this.tags[tag + 'count']) {
                    this.tags[tag + 'count']++;
                    this.tags[tag + this.tags[tag + 'count']] = this.indent_level;
                } else {
                    this.tags[tag + 'count'] = 1;
                    this.tags[tag + this.tags[tag + 'count']] = this.indent_level;
                }
                this.tags[tag + this.tags[tag + 'count'] + 'parent'] = this.tags.parent;
                this.tags.parent = tag + this.tags[tag + 'count'];
            };
 
            this.retrieve_tag = function(tag) {
                if (this.tags[tag + 'count']) {
                    var temp_parent = this.tags.parent;
                    while (temp_parent) {
                        if (tag + this.tags[tag + 'count'] === temp_parent) {
                            break;
                        }
                        temp_parent = this.tags[temp_parent + 'parent'];
                    }
                    if (temp_parent) {
                        this.indent_level = this.tags[tag + this.tags[tag + 'count']];
                        this.tags.parent = this.tags[temp_parent + 'parent'];
                    }
                    delete this.tags[tag + this.tags[tag + 'count'] + 'parent'];
                    delete this.tags[tag + this.tags[tag + 'count']];
                    if (this.tags[tag + 'count'] == 1) {
                        delete this.tags[tag + 'count'];
                    } else {
                        this.tags[tag + 'count']--;
                    }
                }
            };
 
            this.get_tag = function() {
                var char = '';
                var content = [];
                var space = false;
 
                do {
                    if (this.pos >= this.input.length) {
                        return content.length ? content.join('') : ['', 'TK_EOF'];
                    }
 
                    char = this.input.charAt(this.pos);
                    this.pos++;
                    this.line_char_count++;
 
                    if (this.Utils.in_array(char, this.Utils.whitespace)) {
                        space = true;
                        this.line_char_count--;
                        continue;
                    }
 
                    if (char === "'" || char === '"') {
                        if (!content[1] || content[1] !== '!') {
                            char += this.get_unformatted(char);
                            space = true;
                        }
                    }
 
                    if (char === '=') {
                        space = false;
                    }
 
                    if (content.length && content[content.length - 1] !== '=' && char !== '>' && space) {
                        if (this.line_char_count >= this.max_char) {
                            this.print_newline(false, content);
                            this.line_char_count = 0;
                        } else {
                            content.push(' ');
                            this.line_char_count++;
                        }
                        space = false;
                    }
                    content.push(char);
                } while (char !== '>');
 
                var tag_complete = content.join('');
                var tag_index;
                if (tag_complete.indexOf(' ') != -1) {
                    tag_index = tag_complete.indexOf(' ');
                } else {
                    tag_index = tag_complete.indexOf('>');
                }
                var tag_check = tag_complete.substring(1, tag_index).toLowerCase();
                if (tag_complete.charAt(tag_complete.length - 2) === '/' || this.Utils.in_array(tag_check, this.Utils.single_token)) {
                    this.tag_type = 'SINGLE';
                } else if (tag_check === 'script') {
                    this.record_tag(tag_check);
                    this.tag_type = 'SCRIPT';
                } else if (tag_check === 'style') {
                    this.record_tag(tag_check);
                    this.tag_type = 'STYLE';
                } else if (tag_check.charAt(0) === '!') {
                    var comment = '';
                    if (tag_check.indexOf('[if') != -1) {
                        if (tag_complete.indexOf('!IE') != -1) {
                            comment = this.get_unformatted('-->', tag_complete);
                            content.push(comment);
                        }
                        this.tag_type = 'START';
                    } else if (tag_check.indexOf('[endif') != -1) {
                        this.tag_type = 'END';
                        this.unindent();
                    } else if (tag_check.indexOf('[cdata[') != -1) {
                        comment = this.get_unformatted(']]>', tag_complete);
                        content.push(comment);
                        this.tag_type = 'SINGLE';
                    } else {
                        comment = this.get_unformatted('-->', tag_complete);
                        content.push(comment);
                        this.tag_type = 'SINGLE';
                    }
                } else {
                    if (tag_check.charAt(0) === '/') {
                        this.retrieve_tag(tag_check.substring(1));
                        this.tag_type = 'END';
                    } else {
                        this.record_tag(tag_check);
                        this.tag_type = 'START';
                    }
                    if (this.Utils.in_array(tag_check, this.Utils.extra_liners)) {
                        this.print_newline(true, this.output);
                    }
                }
                return content.join('');
            };
 
            this.get_unformatted = function(delimiter, orig_tag) {
                if (orig_tag && orig_tag.indexOf(delimiter) != -1) {
                    return '';
                }
                var char = '';
                var content = '';
                var space = true;
                do {
                    char = this.input.charAt(this.pos);
                    this.pos++;
 
                    if (this.Utils.in_array(char, this.Utils.whitespace)) {
                        if (!space) {
                            this.line_char_count--;
                            continue;
                        }
                        if (char === '\n' || char === '\r') {
                            content += '\n';
                            for (var i = 0; i < this.indent_level; i++) {
                                content += this.indent_string;
                            }
                            space = false;
                            this.line_char_count = 0;
                            continue;
                        }
                    }
                    content += char;
                    this.line_char_count++;
                    space = true;
                } while (content.indexOf(delimiter) == -1);
                return content;
            };
 
            this.get_token = function() {
                var token;
 
                if (this.last_token === 'TK_TAG_SCRIPT') {
                    var temp_token = this.get_script();
                    if (typeof temp_token !== 'string') {
                        return temp_token;
                    }
                    return [temp_token, 'TK_CONTENT'];
                }
                if (this.current_mode === 'CONTENT') {
                    token = this.get_content();
                    if (typeof token !== 'string') {
                        return token;
                    } else {
                        return [token, 'TK_CONTENT'];
                    }
                }
 
                if (this.current_mode === 'TAG') {
                    token = this.get_tag();
                    if (typeof token !== 'string') {
                        return token;
                    } else {
                        var tag_name_type = 'TK_TAG_' + this.tag_type;
                        return [token, tag_name_type];
                    }
                }
            };
 
            this.printer = function(source, indent_character, indent_size, max_char) {
                this.input = source || '';
                this.output = [];
                this.indent_character = indent_character || ' ';
                this.indent_string = '';
                this.indent_size = indent_size || 2;
                this.indent_level = 0;
                this.max_char = max_char || 70;
                this.line_char_count = 0;
                for (var i = 0; i < this.indent_size; i++) {
                    this.indent_string += this.indent_character;
                }
 
                this.print_newline = function(ignore, arr) {
                    this.line_char_count = 0;
                    if (!arr || !arr.length) {
                        return;
                    }
                    if (!ignore) {
                        while (this.Utils.in_array(arr[arr.length - 1], this.Utils.whitespace)) {
                            arr.pop();
                        }
                    }
                    arr.push('\n');
                    for (var i = 0; i < this.indent_level; i++) {
                        arr.push(this.indent_string);
                    }
                };
 
 
                this.print_token = function(text) {
                    this.output.push(text);
                };
 
                this.indent = function() {
                    this.indent_level++;
                };
 
                this.unindent = function() {
                    if (this.indent_level > 0) {
                        this.indent_level--;
                    }
                };
            };
            return this;
        };
 
 
 
 
        multi_parser = new Parser();
        multi_parser.printer(html_source, indent_character, indent_size);
        while (true) {
            var t = multi_parser.get_token();
            multi_parser.token_text = t[0];
            multi_parser.token_type = t[1];
 
            if (multi_parser.token_type === 'TK_EOF') {
                break;
            }
 
 
            switch (multi_parser.token_type) {
            case 'TK_TAG_START':
            case 'TK_TAG_SCRIPT':
            case 'TK_TAG_STYLE':
                multi_parser.print_newline(false, multi_parser.output);
                multi_parser.print_token(multi_parser.token_text);
                multi_parser.indent();
                multi_parser.current_mode = 'CONTENT';
                break;
            case 'TK_TAG_END':
                multi_parser.print_newline(true, multi_parser.output);
                multi_parser.print_token(multi_parser.token_text);
                multi_parser.current_mode = 'CONTENT';
                break;
            case 'TK_TAG_SINGLE':
                multi_parser.print_newline(false, multi_parser.output);
                multi_parser.print_token(multi_parser.token_text);
                multi_parser.current_mode = 'CONTENT';
                break;
            case 'TK_CONTENT':
                if (multi_parser.token_text !== '') {
                    multi_parser.print_newline(false, multi_parser.output);
                    multi_parser.print_token(multi_parser.token_text);
                }
                multi_parser.current_mode = 'TAG';
                break;
            }
            multi_parser.last_token = multi_parser.token_type;
            multi_parser.last_text = multi_parser.token_text;
        }
        return multi_parser.output.join('');
    }
 
    return function(data) {
        var dataHolder = ['__dataHolder_', [Math.random(), Math.random(), Math.random(), Math.random()].join('_').replace(/[^0-9]/g, '_'), '_'].join('_');
        var dataHolders = {};
        var index = 0;
        data = data.replace(/(\")(data:[^\"]*)(\")/g, function($0, $1, $2, $3) {
            var name = dataHolder + index++;
            dataHolders[name] = $2;
            return $1 + name + $3;
        });
        data = style_html(data, 1, '\t', 0x10000000);
        data = data.replace(new RegExp(dataHolder + '[0-9]+', 'g'), function($0) {
            return dataHolders[$0];
        });
 
        return data;
    };
})();