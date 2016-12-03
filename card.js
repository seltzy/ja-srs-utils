function isPunctuation(str, atIndex) {}
function isHiragana(str, atIndex) {}
function isKatakana(str, atIndex) {}
function isKanji(str, atIndex) {}
function isFWRomanOrFWKatakana(str, atIndex) {}

function getStartIndexOfKanjiAt(str, atIndex) {}
function getEndIndexOfKanjiAt(str, atIndex) {}

function getIndexOfNextOpeningBrace(str, atIndex) {}
function getIndexOfNextClosingBrace(str, atIndex) {}

function getIndexOfNextWord(str, atIndex, wordDelimiter) {
    str.indexOf(wordDelimiter, atIndex);
}

function parseFuriUsingSquareBrackets(str, wordDelimiter) {
    var elements = $('<ul class="japanese_sentence japanese japanese_gothic clearfix" lang="ja"></ul>');
    var searchText = "";
    var index = 0;
    var endIndex = str.length;
    while (index < endIndex) {
        var bracesStart = getIndexOfNextOpeningBrace(str, index);
        var bracesEnd = getIndexOfNextClosingBrace(str, bracesStart);
        var kanjiStart = getStartIndexOfKanjiAt(str, bracesStart);
        var kanjiEnd = bracesStart - 1;
        searchText += str.substring(index, kanjiEnd);
        index = bracesEnd + 1;
        var kanjiElement = $("<span class='unlinked'>" + str.substring(kanjiStart, kanjiEnd) + "</span>");
        var furiElement = $("<span class='furigana'>" + str.substring(kanjiStart, kanjiEnd) + "</span>");
        var element = $("<li></li>");
        element.append(kanjiElement).append(furiElement);
        elements.append(element);
        // if(isKanji(str, index)) {
        //     kanjiStart = index;
        // } else {
        //     kanjiStart = getStartIndexOfNextKanji(str, index);
        //     formattedElements.append($("<li class='unlinked'>" + str.substring(index, kanjiStart - 1) + "</li>"));
        // }
        // kanjiEnd = getEndIndexOfKanjiAt(str, kanjiStart);
        // formattedElements.append($("<li class='unlinked'>" + str.substring(kanjiStart, kanjiEnd) + "</li>"));
        
    }
    elements.attr("search", searchText);
    return formattedElements;
}

$(".parse-furi").each(
    function(e) {
        e = $(e);
        e.html(parseFuriUsingSquareBrackets(e.text()));
    });

$(".rtk-link").each(
    function(e) {
        e = $(e);
        var rtkLink = "http://kanji.koohi.com/study/kanji/" + e.attr("kanji");
        e.wrap("<a href='" + rtkLink + "'></a>");
    });

$(".jisho-link").each(
		function(e) {
		    e = $(e);
		    var jishoLink = "http://jisho.org/search/" + e.attr("search");
		    e.wrap("<a href='" + jishoLink + "'></a>");
		});

$(".cycle-font").each(
		function(e)
		{
				e = $(e);
				var fontlist = e.attr("fonts");
				if (fontlist != undefined) {
						fontlist = fontlist.split(","); 
				} else {
						return;
				}
				e.attr("curfont", 0);
				e.onclick(
						function(f)
						{
								var f = $(f);
								var curfont = (Number(f.attr("curfont")) + 1) % fontlist.length;
								f.attr("curfont", curfont);
								f.css("font-family", fontlist[curfont]);
						} );
		} );
