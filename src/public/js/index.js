//===========================
// EVENT HANDLERS
//===========================

$(document).on("click", "#btnSubmit", function () {
  var name = $("#name").val().trim();
  if (name)
    $.ajax({
      url: `/todo/checkExist?name=${name.trim().toLowerCase()}`,
      type: "GET",
      success: function (result) {
        if (!result) {
          $("#todoForm").submit();
        } else {
          $("#name").addClass("border-danger");
          $("#nameHelp").text("Name already exist");
        }
      },
    });
});

function deleteConfirm(id, name) {
  var r = confirm("Are you sure you want to delete?");
  if (r == true) {
    $.ajax({
      url: `/todo/${id}`,
      type: "DELETE",
      success: function (result) {
        if (result) {
          alert(`Task '${name}' Deleted successfully!`);
          location.reload();
        }
      },
    });
  }
}
