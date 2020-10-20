$(function () {
  // ‣Generate Calendar
  function generateColor(category) {
    return {
      background: category.background,
      color: category.text,
      "border-left": category.border,
    };
  }
  let table = $(".days");
  let cellContent = `<div><i class="fas fa-check-square"></i><i class="fas fa-check-circle"></i></div>`;
  for (const index in Calendar) {
    let item = Calendar[index];
    let li = $("<li></li>").text(item.id).attr("data-id", item.id);
    item.dayOff ? li.addClass("hidden") : "";
    item.category.name ? li.css(generateColor(item.category)) : "";
    item.id == "33" ? li.addClass("radius-bottom") : "";
    li.append(cellContent);
    table.append(li);
  }

  // ‣Show modal when click cell or click button Add Task
  let modalBox = $("#modalBox");
  let sizeTable = {
    width: $(".calendar--body-table").width(),
    height: $(".calendar--body-table").height(),
  };
  let sizeModal = {
    width: modalBox.width(),
    height: modalBox.height(),
  };
  function showModal() {
    let _this = $(this);
    let positionCell = _this.position();
    let index = _this.attr("data-id");
    // let index = _this.attr()

    let left =
      positionCell.left + sizeModal.width < sizeTable.width
        ? positionCell.left + 100
        : positionCell.left - 300;
    let top =
      positionCell.top + sizeModal.height < sizeTable.height
        ? positionCell.top + 100
        : positionCell.top - 250;

    modalBox
      .show()
      .css({
        left: left,
        top: top,
        position: "absolute",
      })
      .attr("data-id", index);

    // Check add task button
    $("#showDays").text("Close Task").addClass("btn-red");

    // Check trash icons
    let trash = $("#modalBox .fa-trash");
    !!Calendar[index].category.name
      ? trash.removeClass("hidden2")
      : trash.addClass("hidden2");

    let category = $("#modalBox .category");
    !!Calendar[index].category.name
      ? category
          .text(Calendar[index].category.name)
          .css("background-color", Calendar[index].category.border)
      : category.text("+ Calendar").css("background-color", "");

    checkDone(index);
  }
  $(".days>li").on("click", showModal);
  $("#showDays").on("click", function () {
    modalBox.toggle();
    let _this = $(this);
    if (_this.text() === "Add Task") {
      _this.text("Close Task");
    } else {
      _this.text("Add Task");
    }
    _this.toggleClass("btn-red");
  });

  // ‣Reset data when click remove task
  $(".fa-trash").on("click", function () {
    let index = modalBox.attr("data-id");
    Calendar[index].reset = index;
    $(this).addClass("hidden2");
    $("#modalBox .category").css({ background: "" }).text("+ Calendar");
    $(`[data-id=${index}]`).css(generateColor(Category.default));
    modalBox.hide("slow");
    $("#showDays").text("Add Task").removeClass("btn-red");
  });

  // ‣Show day off when click button weekdays
  $("#showWeekends").on("click", function () {
    $(".days>li.hidden, .weekdays>li.hidden").toggle("slow");
    $(".days>li, .weekdays>li").toggleClass("seven");

    $(".weekdays>li:nth-child(5)").toggleClass("radius-top");
    $(".days>li:nth-child(33)").toggleClass("radius-bottom");
  });

  // ‣Task Done
  function checkDone(index) {
    let _this = $(`.fa-check-circle`);
    Calendar[index].done
      ? _this.addClass("fas").removeClass("far")
      : _this.addClass("far").removeClass("fas");
  }
  $("#modalBox .fa-check-circle").on("click", function () {
    let index = modalBox.attr("data-id");
    Calendar[index].done = !Calendar[index].done;
    checkDone(index)
  });
});

jQuery.fn.invisible = function () {
  return this.css("visibility", "hidden");
};
