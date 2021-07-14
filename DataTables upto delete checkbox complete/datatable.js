$(document).ready(function () {
  var tablelength;
  $('#btn').click(function () {
    $.getJSON('https://api.stackexchange.com/2.2/answers?order=desc&sort=activity&site=stackoverflow', function (data) {
      var userData = [];
      var len = data.items.length;
      for (var i = 0; i < len; i++) {
        userData.push(data.items[i].owner)
      }
      tablelength = userData.length;
      var row = '';
      $.each(userData, function (key, value) {
        row += '<tr id_rep="' + value.reputation + '"  id_uid="' + value.user_id + '" id_uname= "' + value.display_name + '">';
        row += '<td>' + value.reputation + '</td>';
        row += '<td>' + value.user_id + '</td>';
        row += '<td>' + value.display_name + '</td>';
        row += '<td>' + "<button class=" + "edit" + " id=" + "editbtn" + ">Edit</button>" + '</td>';
        row += '<td>' + "<input type =" + "checkbox" + " id=" + "chk" + ">" + '</td>';
        row += '</tr>';
      });
      $('#Table').append(row);
      $('#Table').DataTable();
    });
  });

  $("#addrow").on('click', function () {
    var addRep = $("#addrep").val();
    var addUid = $("#adduid").val();
    var addUname = $("#adduname").val();
    var table = $('#Table').DataTable();
    if (addRep != "" && addUid != "" & addUname != "") {
      table.row.add([
        addRep,
        addUid,
        addUname,
        '<button class=edit id=editbtn>Edit</button>',
        '<input type=checkbox id=chk>']).draw(false);
      tablelength++;

      $("#addrep").val("");
      $("#adduid").val("");
      $("#adduname").val("");
      $("#addrow").attr("data-dismiss", "modal");
    }
    else {
      if (addRep == "") {
        alert("Enter Reputation");
        $("#addModal").modal('show');
      }
      else if (addUid == "") {
        alert("Enter Owner Id");
        $("#addModal").modal('show');
      }
      else {
        alert("Enter Owner Name");
        $("#addModal").modal('show');
      }
    }
  });

  $("#deleterow").on('click', function () {
    var deluserid = $("#deleteid").val();
    var table = $('#Table').DataTable();
    if (deluserid != "") {
      table.row($("#Table td").filter(function () {
        return $(this).text() == deluserid
      }).closest("tr"))
        .remove()
        .draw();

      $("#deleteid").val("");
      $("#deleterow").attr("data-dismiss", "modal");
      alert("Deleted Successfully. Click ok to Refresh");
    }
    else {
      alert("Enter valid userid");
      $("#delModal").modal('show');
    }
  });

  $('#logout').click(function () {
    parent.location.href = "index.html";
  });

  $('#myTable').on('click', '#editbtn', function () {
    $("#rowindex").css("display", "none");
    $("#editModal").modal('show');

    var row_index = $(this).closest("tr").index();
    var edituserid = $(this).parents('tr').find('td:eq(1)').html();
    var editrep = $(this).parents('tr').find('td:eq(0)').html();
    var edituname = $(this).parents('tr').find('td:eq(2)').html();
    $("#edituname").val(edituname);
    $("#edituid").val(edituserid);
    $("#editrep").val(editrep);
    $("#rowindex").text(row_index);

  });

  $('#delchk').on('click', function () {
    var table = $('#Table').DataTable();
    var len = tablelength;
    for (var i = 0; i < len; i++) {
      $(':checkbox:checked').each(function () {
        table.row($(this).closest("tr")).remove().draw();
        tablelength--;
      });
      len = tablelength;
    }
    alert("Selected Items Deleted Successfully. Click to Refresh");
  });

  $('#btn-update').on('click', function () {
    var newrep = $("#editrep").val();
    var newuid = $("#edituid").val();
    var newuname = $("#edituname").val();
    var new_rIndex = $("#rowindex").text();
    var rowindex = parseInt(new_rIndex) + parseInt(1);

    $('#Table tr:eq(' + rowindex + ')').find('td:eq(0)').text(newrep);
    $('#Table tr:eq(' + rowindex + ')').find('td:eq(1)').text(newuid);
    $('#Table tr:eq(' + rowindex + ')').find('td:eq(2)').text(newuname);

    $('#Table tr:eq(' + rowindex + ')').attr('id_rep', newrep);
    $('#Table tr:eq(' + rowindex + ')').attr('id_uid', newuid);
    $('#Table tr:eq(' + rowindex + ')').attr('id_uname', newuname);
    $("#editModal").modal('hide');
  });

});	