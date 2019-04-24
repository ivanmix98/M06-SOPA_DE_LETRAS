
(function (document, $, wordfind) {
  'use strict';

  var drawPuzzle = function (el, puzzle) {
    var output = '';
    for (var i = 0, height = puzzle.length; i < height; i++) {
      var row = puzzle[i];
      output += '<div>';
      for (var j = 0, width = row.length; j < width; j++) {
        output += '<button class="puzzleSquare" x="' + j + '" y="' + i + '">';
        output += row[j] || '&nbsp;';
        output += '</button>';
      }
      output += '</div>';
    }

    $(el).html(output);
  };

  var getWords = function () {
    return $('input.word').toArray().map(wordEl => wordEl.value.toLowerCase()).filter(word => word);
  };

  var calcOrientation = function (x1, y1, x2, y2) {

    for (var orientation in wordfind.orientations) {
      var nextFn = wordfind.orientations[orientation];
      var nextPos = nextFn(x1, y1, 1);

      if (nextPos.x === x2 && nextPos.y === y2) {
        return orientation;
      }
    }

    return null;
  };


  /**
   * Initializes the WordFindGame object.
   *
   * Creates a new word find game and draws the board and words.
   */
  var WordFindGame = function (puzzleEl, options) {

    // Configuració Inicial:
    var wordList, puzzle;

    var startSquare, selectedSquares = [], curOrientation, curWord = '';

    var startTurn = function () {
      $(this).addClass('selected');
      startSquare = this;
      selectedSquares.push(this);
      curWord = $(this).text();
    };

    var touchMove = function(e) {
      var xPos = e.originalEvent.touches[0].pageX;
      var yPos = e.originalEvent.touches[0].pageY;
      var targetElement = document.elementFromPoint(xPos, yPos);
      select(targetElement)
    };

    var mouseMove = function() {
      select(this);
    };

    var select = function (target) {

      if (!startSquare) {
        return;
      }

      var lastSquare = selectedSquares[selectedSquares.length-1];
      if (lastSquare == target) {
        return;
      }

      var backTo;
      for (var i = 0, len = selectedSquares.length; i < len; i++) {
        if (selectedSquares[i] == target) {
          backTo = i+1;
          break;
        }
      }

      while (backTo < selectedSquares.length) {
        $(selectedSquares[selectedSquares.length-1]).removeClass('selected');
        selectedSquares.splice(backTo,1);
        curWord = curWord.substr(0, curWord.length-1);
      }


      var newOrientation = calcOrientation(
        $(startSquare).attr('x')-0,
        $(startSquare).attr('y')-0,
        $(target).attr('x')-0,
        $(target).attr('y')-0
      );

      if (newOrientation) {
        selectedSquares = [startSquare];
        curWord = $(startSquare).text();
        if (lastSquare !== startSquare) {
          $(lastSquare).removeClass('selected');
          lastSquare = startSquare;
        }
        curOrientation = newOrientation;
      }

      var orientation = calcOrientation(
        $(lastSquare).attr('x')-0,
        $(lastSquare).attr('y')-0,
        $(target).attr('x')-0,
        $(target).attr('y')-0
      );

      // if the new square isn't along a valid orientation, just ignore it.
      // this makes selecting diagonal words less frustrating
      if (!orientation) {
        return;
      }

      if (!curOrientation || curOrientation === orientation) {
        curOrientation = orientation;
        playTurn(target);
      }
    };

    var playTurn = function (square) {

      // make sure we are still forming a valid word
      for (var i = 0, len = wordList.length; i < len; i++) {
        if (wordList[i].indexOf(curWord + $(square).text()) === 0) {
          $(square).addClass('selected');
          selectedSquares.push(square);
          curWord += $(square).text();
          break;
        }
      }
    };

    /**
     * Event that handles mouse up on a square. Checks to see if a valid word
     * was created and updates the class of the letters and word if it was. Then
     * resets the game state to start a new word.
     *
     */
    var endTurn = function () {
      // see if we formed a valid word
      for (var i = 0, len = wordList.length; i < len; i++) {

        if (wordList[i] === curWord) {
          $('.selected').addClass('found');
          wordList.splice(i,1);
          $('input.word[value="' + curWord + '"]').addClass('wordFound');
        }

        if (wordList.length === 0) {
          $('.puzzleSquare').addClass('complete');
        }
      }

      // reset the turn
      $('.selected').removeClass('selected');
      startSquare = null;
      selectedSquares = [];
      curWord = '';
      curOrientation = null;
    };

    /* Constructor START */
    $('input.word').removeClass('wordFound');

    // Class properties, game initial config:
    wordList = getWords().sort();
    puzzle = wordfind.newPuzzleLax(wordList, options);

    // Draw all of the words
    drawPuzzle(puzzleEl, puzzle);

    if (window.navigator.msPointerEnabled) {
      $('.puzzleSquare').on('MSPointerDown', startTurn);
      $('.puzzleSquare').on('MSPointerOver', select);
      $('.puzzleSquare').on('MSPointerUp', endTurn);
    } else {
      $('.puzzleSquare').mousedown(startTurn);
      $('.puzzleSquare').mouseenter(mouseMove);
      $('.puzzleSquare').mouseup(endTurn);
      $('.puzzleSquare').on("touchstart", startTurn);
      $('.puzzleSquare').on("touchmove", touchMove);
      $('.puzzleSquare').on("touchend", endTurn);
    }

    /**
     * Solves an existing puzzle.
     *
     * @param {[[String]]} puzzle: The puzzle to solve
     */
    this.solve = function() {
      var solution = wordfind.solve(puzzle, wordList).found;

      for( var i = 0, len = solution.length; i < len; i++) {
        var word = solution[i].word,
          orientation = solution[i].orientation,
          x = solution[i].x,
          y = solution[i].y,
          next = wordfind.orientations[orientation];

        var wordEl = $('input.word[value="' + word + '"]');
        if (!wordEl.hasClass('wordFound')) {
          for (var j = 0, size = word.length; j < size; j++) {
            var nextPos = next(x, y, j);
            $('[x="' + nextPos.x + '"][y="' + nextPos.y + '"]').addClass('solved');
          }

          wordEl.addClass('wordFound');
        }
      }
    };
  };

  WordFindGame.emptySquaresCount = function () {
    var allSquares = $('.puzzleSquare').toArray();
    return allSquares.length - allSquares.filter(b => b.textContent.trim()).length;
  };


  WordFindGame.insertWordBefore = function (el, word) {
    $('<li><input class="word" value="' + (word || '') + '"></li>').insertBefore(el);
  };
  window.WordFindGame = WordFindGame;

}(document, jQuery, wordfind));
