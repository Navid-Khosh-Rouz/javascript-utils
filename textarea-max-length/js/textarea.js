/* 

Here you can simply edit control your textarea input
with exact max-length


just call ==> initTextarea(_selector, _max_lines = 4, _max_char = 255);

*/

function checkRemainedChars(obj, _max_char = 255) {
    var remaining =
      _max_char -
      parseInt(
        $(obj)
          .val()
          .replace(/\r(?!\n)|\n(?!\r)/g, "  ").length
      );
  
    if (remaining < 0) {
      $(obj).val(
        $(obj)
          .val()
          .trim()
          .substring(0, _max_char + remaining)
      );
      remaining = 0;
    }
  
    $(obj)
      .parent()
      .find(".textarea-counter span")
      .html(remaining + "/" + _max_char);
  
    return remaining;
  }
  
  function checkTextareaLength(obj, e, _max_lines = 4, _max_char = 255) {
    var text = $(obj).val();
    var textLength = text.length;
  
    var newLines = $(obj).val().split("\n").length;
  
    if (e.keyCode == 13 && newLines >= _max_lines) {
      e.preventDefault();
      return false;
    }
  
    if (_max_char > 0) {
      var remaining =
        _max_char -
        parseInt(
          $(obj)
            .val()
            .replace(/\r(?!\n)|\n(?!\r)/g, "  ").length
        );
  
      if (remaining <= 0) {
        $(obj).val(text.trim().substring(0, _max_char + remaining));
  
        $(obj).attr("maxlength", _max_char + remaining);
        e.preventDefault();
      } else {
        $(obj).attr("maxlength", _max_char);
      }
    }
  
    if (textLength > _max_char) {
      $(obj).val(text.trim().substring(0, _max_char));
    }
  }
  
  // _selector = #digitalContractFormId textarea
  function initTextarea(_selector, _max_lines = 4, _max_char = 255) {
    
    $(_selector).blur(function () {
      var words = $(this)
        .val()
        .replace(/\n\n\s*\n/g, "\n\n");
      $(this).val(words);
    });
  
  
    $(_selector).on('input propertychange', function() {
      checkRemainedChars(this, _max_char);
    });

  
    $(_selector).on("keyup", function (e) {
      checkRemainedChars(this, _max_char);
    });
  
    $(_selector).change(function (e) {
      checkRemainedChars(this, _max_char);
    });
  
    $(_selector).keypress(function (e) {
      let remained_chars = checkRemainedChars(this, _max_char);
      if (remained_chars <= 0) {
        e.preventDefault();
      } else {
        checkTextareaLength(this, e, _max_lines, _max_char);
      }
    });
  }
  