$(function() {

  const indexToName = [
    'Gabriel Hutchison',
    'Jessie Pullaro',
    'Sam Uribe',
    'Kristyn Ardrey',
  ];

  function clickFace(index) {
    if (index == 0) {
      alert("You no click yourself dumbo");
      return;
    }
    $("#chat .messages").addClass("hidden");
    $("#chat .messages").eq(index - 1).removeClass("hidden");
    $(".header").text(indexToName[index]);
  }
  $(".p1").click(function(event) { clickFace(0); });
  $(".p2").click(function(event) { clickFace(1); });
  $(".p3").click(function(event) { clickFace(2); });
  $(".p4").click(function(event) { clickFace(3); });

  $(".chat-button:not(.disabled)").click(function(event) {
    var chatButton = $(event.currentTarget);
    var parentPost = chatButton.closest(".post");
    var face = parentPost.find(".posthead");
    var faceClasses = face.attr("class");
    var whichFaceClass = faceClasses.split(" ")[1];
    var faceNumber = parseInt(whichFaceClass[1]);
    clickFace(faceNumber - 1);
  });

  function hideSuggestion(event) {
    $(".suggestions").removeClass("show");
    $("*:not(input)").off("click", hideSuggestion);
  }

  $("input").click(function(event) {
    event.stopPropagation();
    $(".suggestions").addClass("show");
    setTimeout(function() {
      $("*:not(input)").on("click", hideSuggestion);
    }, 1);
  });

  $("input").on("change paste keyup", function(event) {
    if ($("input").eq(0).val().trim() === "") {
      $(".suggestions").addClass("show");
    } else {
      $(".suggestions").removeClass("show");
    }
  });

  $("input").keyup(function(event) {
    if (event.keyCode === 13) {
      $(".fa-chevron-circle-right").click();
    }
  });

  $(".suggestion").click(function(event) {
    var suggestion = $(event.currentTarget);
    var message = suggestion.find(".message");
    $("input").val(message.text());
  });

  $(".fa-chevron-circle-right").click(function(event) {
    var newMessage = $(".message.right").eq(0).clone();
    newMessage.find(".face").removeClass(["p2", "p3", "p4"]);
    newMessage.find(".face").addClass("p1");
    newMessage.find(".bubble").text($("input").val());
    $("input").val("");
    $(".messages:not(.hidden)").append(newMessage);
    setTimeout(function() {
      fakeReply();
    }, 3000);
  });

  function fakeReply() {
    var faceElem = $(".messages:not(.hidden) .face");
    var faceClass = faceElem.attr("class").split(" ")[1];
    var newMessage = $(".message.left").eq(0).clone();
    newMessage.find(".face").removeClass(["p1", "p2", "p3", "p4"]);
    newMessage.find(".face").addClass(faceClass);
    newMessage.find(".bubble").text("...");
    $(".messages:not(.hidden)").append(newMessage);
    setTimeout(function() {
      newMessage.find(".bubble").text("I thought that was awesome!!");
    }, 2000);
  }
});
