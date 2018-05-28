
function msgAI(params){
  alert(params);
}

function checkIllustrator(){
  alert("Illustrator works");
}

var doc = app.activeDocument
var isFill = app.isFillActive();
var exist = app.documents.length > 0;
var hasPaths = doc.pathItems.length > 0;
var switchNumber = 1;

// checkForFill();

// alert(switchScanner());

// giveColor("9900AA");
// setStrokeColor("00AAFF");
// setFillColor("00AAFF");

// alert(colorFromIllustrator());
                                // returns "00AA99"
        // alert(strokeColorFromAI());
        // alert(fillColorFromAI());
                              // returns "00AA99"


function switchScanner() {
  if (app.isFillActive()) {
    return 1;
  } else {
    return 0;
  }
}

function fillColorFromAI() {
  if (exist) {
    var convertColor = rgbToHex(doc.defaultFillColor.red, doc.defaultFillColor.green, doc.defaultFillColor.blue);
    return convertColor;
  } else {
    return "ffffff";
  }
}
function strokeColorFromAI() {
  if (exist) {
    var convertColor = rgbToHex(doc.defaultStrokeColor.red, doc.defaultStrokeColor.green, doc.defaultStrokeColor.blue);
    return convertColor;
  } else {
    return "231f20";
  }
}

function colorToIllustrator(newColor){
  var nColor = new RGBColor;
  nColor.red = hexToRgb(newColor).r;
  nColor.green = hexToRgb(newColor).g;
  nColor.blue = hexToRgb(newColor).b;
  return nColor;
}

function setStrokeColor(newColor) {
  doc.defaultStrokeColor = colorToIllustrator(newColor);
}

function setFillColor(newColor) {
  doc.defaultFillColor = colorToIllustrator(newColor);
}



function colorFromIllustrator() {
  if (app.isFillActive()) {
    defaultColor = fillColorFromAI();
  } else {
    defaultColor = strokeColorFromAI();
  }
  return defaultColor;
}


/// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


///////

// function checkForFill() {
//   if (app.isFillActive()) {
//     alert("is fill");
//   } else {
//     alert("is stroke");
//   }
// }


// var layer = app.activeDocument.activeLayer;
// var testColor = new RGBColor()//initial default colour
// testColor.red = 180;
// testColor.green = 93;
// testColor.blue = 120;
// var myGrey= new CMYKColor()//initial default grey
// myGrey.black=75;
//
//
// // Stepping through each item on the layer.
// for (var i = 0; i < layer.pathItems.length; i++) {
//     var item = layer.pathItems[i];
//     $.writeln("Test colour ",Math.round( item.fillColor.red))
//     if (Math.round(item.fillColor.red) == testColor.red &&
//     Math.round(item.fillColor.green)== testColor.green &&
//     Math.round(item.fillColor.blue) == testColor.blue)
//    {
//       $.writeln("Color function",i );
//       item.fillColor = myGrey;
//    }
//
// }

// colorToIllustrator(newColor)


// alert(doc.pathItems.length);
// alert(doc.textFrames[1].textRange.characterAttributes.stroked)
// alert(doc.pathItems[1].stroked)

// alert(doc.pathItems[1].fillColor);
// alert(doc.pathItems[1].opacity);
// alert(doc.layers.length);

// alert(colorToIllustrator('ff0000'))



// alert(rgbActiveHex("2"));

// lowerOpacity('ff0000');
// returnOpacity();

// alert(doc.pathItems[0].fillColor)

// alert(doc.textFrames[0].characterStyles.characterAttributes.fillColor);

// var textColor = ;
// alert(doc.textFrames[1].textRange.characterAttributes.fillColor.red)

// alert(doc.textFrames[2].opacity)

// alert(doc.compoundPathItems.pathItems.length)

// alert(rgbActiveHex("textFrames", "2"))


// alert(doc.pathItems[0].opacity);

function rgbActiveHex(type, here) {
  var activeObject;
  if (type === "pathItems") {
    if (doc.pathItems[here].stroked) {
      activeObject = doc.pathItems[here].strokeColor
    } else if (doc.pathItems[here].filled) {
      activeObject = doc.pathItems[here].fillColor
    }
  } else if (type === "textFrames") {
    activeObject = doc.textFrames[here].textRange.characterAttributes.fillColor
  }
    var convertColor = rgbToHex(activeObject.red, activeObject.green, activeObject.blue);
    return convertColor;
}


function htmlRGBToHex(r, g, b) {
  if ((r !== 'undefined') && (g !== 'undefined') && (b !== 'undefined')) {
    var nColor = new RGBColor;
    nColor.red = r;
    nColor.green = g;
    nColor.blue = b;
    var convertColor = rgbToHex(nColor.red, nColor.green, nColor.blue);
    return convertColor;
  } else {
    console.log("refuse");
  }
}

// alert(doc.textFrames.length)

var allPaths = doc.pathItems.length;
var allTexts = doc.textFrames.length;

var prevOpacityTexts = [];
var prevOpacityPaths = [];

function lowerOpacity(exceptThis) {
  if (exist && hasPaths) {
    while (prevOpacityPaths.length > 0) {
      prevOpacityPaths.pop();
    }
    while (prevOpacityTexts.length > 0) {
      prevOpacityTexts.pop();
    }
    // Path Items
    for (var index = 0; index < allPaths; index++) {
      prevOpacityPaths.push(doc.pathItems[index].opacity)
      if (rgbActiveHex("pathItems", index) === exceptThis) {
        doc.pathItems[index].opacity = 100;
      } else {
        doc.pathItems[index].opacity = 20;
      }
    }
    // Text frames
    for (var index = 0; index < allTexts; index++) {
      prevOpacityTexts.push(doc.textFrames[index].opacity)
      if (rgbActiveHex("textFrames", index) === exceptThis) {
        doc.textFrames[index].opacity = 100;
      } else {
        doc.textFrames[index].opacity = 20;
      }
    }
    //
  }
}

function returnOpacity() {
  if (exist && hasPaths) {
    for (var index = 0; index < allPaths; index++) {
      var previous = prevOpacityPaths[index];
      doc.pathItems[index].opacity = prevOpacityPaths[index];
    }
    for (var index = 0; index < allTexts; index++) {
      var previous = prevOpacityTexts[index];
      doc.textFrames[index].opacity = prevOpacityTexts[index];
    }
  }
}

function giveColor(newColor) {
  if (app.isFillActive()) {
    setFillColor(newColor);
  } else {
    setStrokeColor(newColor);
  }
  if (exist && hasPaths) {
      for (var A_Index = 0; A_Index < app.selection.length; A_Index++) {
        try {
          var currentSelection = app.selection[A_Index];
          if (app.isFillActive()) {
            currentSelection.fillColor = colorToIllustrator(newColor);
          } else {
            currentSelection.strokeColor = colorToIllustrator(newColor);
          }
        }
        catch (e){alert(e)}
      }
    }
};


/*--
// Broken and I don't know why
var doc = app.activeDocument;
var isFill = app.isFillActive();

function fillColorFromAI() {
  if (app.documents.length > 0) {
    var convertColor = rgbToHex(doc.defaultFillColor.red, doc.defaultFillColor.green, doc.defaultFillColor.blue);
    return convertColor;
  } else {
    return "ffffff";
  }
}
function strokeColorFromAI() {
  if (app.documents.length) {
    var convertColor = rgbToHex(doc.defaultStrokeColor.red, doc.defaultStrokeColor.green, doc.defaultStrokeColor.blue);
    return convertColor;
  } else {
    return "231f20";
  }
}

function colorFromIllustrator() {
  var defColor;
  // if (exist) {
    if (isFill) {
      defColor = doc.defaultFillColor;
    } else {
      defColor = doc.defaultStrokeColor;
    }
    var convertColor = rgbToHex(defColor.red, defColor.green, defColor.blue);
    return convertColor;
  // }
}

function msgAI(){
  alert("Illustrator active");
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

--*/
