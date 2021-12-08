var target,replace;

function getFontList(){
	app.refreshFonts();
}

function findFontByPSName(postScriptName){	
	for(var i=0; i<app.fonts.length; i++)
	{
		if( app.fonts[i].postScriptName == postScriptName)
		{
			return app.fonts[i];
		}
	}
}

function getFontName(type){
	if(app.activeDocument.activeLayer.kind!==LayerKind.TEXT){
		alert('请选择字体图层！')
		return false
	}
	var font = app.activeDocument.activeLayer.textItem.font
	var fontPsName = findFontByPSName(font)
	switch(type){
		case 'target':
			target = fontPsName
			break;
		case 'replace':
			replace = fontPsName
			break;
	}
	return fontPsName.family
}


function setFont(item){
	if(item.layers){
		for(var i=0;i<item.layers.length;i++){
			setFont(item.layers[i])
		}
	}else{
		if(item.kind === LayerKind.TEXT){
			if(item.textItem.font===target.postScriptName){
				item.textItem.font=replace.postScriptName
			}
		}
	}
}


function start(){
	if(replace.postScriptName===target.postScriptName){
		return alert('目标字体与替换字体相同！')
	}
	var layers = app.activeDocument.layers
	for(var i=0;i<layers.length;i++){
		setFont(layers[i])
	}
}