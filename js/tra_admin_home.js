baseUrl = "https://114.115.170.135/user/";


$(document).ready(function(){
  function search() {
    let curDate = new Date();
    let startDate = $("#start-date").val().split("-");
    let endDate = $("#end-date").val().split("-");
    let likesNum = $("#likes-num").val();
    let commentNum = $("#comment-num").val();
    let ifStarred = $("#if-starred").val();
    let ifInspected = $("#if-inspected").val();
    let ifTipsOff = $("#if-tipping-off").val();
    let searchContent = $("#search-content").val();

    let constrainedResult;

    let dateSearchUrl = baseUrl + "select_time?";
    if (startDate.length != 1 && endDate.length != 1) {
      dateSearchUrl += "begin_year=" + startDate[0] + "&" +
          "begin_month=" + startDate[1] + "&" +
          "begin_day=" + startDate[2] + "&" +
          "end_year=" + endDate[0] + "&" +
          "end_month=" + endDate[1] + "&" +
          "end_day=" + endDate[2];
    } else if (endDate.length != 1) {
      dateSearchUrl += "begin_year=2021&" +
          "begin_month=01&" +
          "begin_day=01&" +
          "end_year=" + endDate[0] + "&" +
          "end_month=" + endDate[1] + "&" +
          "end_day=" + endDate[2];
    } else if (startDate.length != 1) {
      dateSearchUrl += "begin_year=" + startDate[0] + "&" +
          "begin_month=" + startDate[1] + "&" +
          "begin_day=" + startDate[2] + "&" +
          "end_year=2100&" +
          "end_month=12&" +
          "end_day=31";
    } else {
      dateSearchUrl += "begin_year=2021&" +
          "begin_month=01&" +
          "begin_day=01&" +
          "end_year=2100&" +
          "end_month=12&" +
          "end_day=31";
    }

    $.ajax({
      url: dateSearchUrl,
      async: false,
      success: function (data, status) {
        data = eval("(" + data + ")");
        constrainedResult = data.tra_ids;
      }
    });

    let keySearchUrl = baseUrl + "select_key?" +
        "key=" + searchContent;

    $.ajax({
      url: keySearchUrl,
      async: false,
      success: function (data, status) {
        data = eval("(" + data + ")");
        let keyResult = data.tra_ids;
        constrainedResult = keyResult.filter(function (num) {
          return constrainedResult.indexOf(num) !== -1;
        });
      }
    });

    if (!localStorage) {
      alert("No localStorage!");
      return;
    }
    localStorage.removeItem("searchResult");
    localStorage.setItem("searchResult", constrainedResult);
    console.log("SearchResult: " + constrainedResult);
  }

  function display() {
    if (!localStorage) {
      alert("No localStorage!");
      return;
    }
    let constrainedResult = eval("[" + localStorage.getItem("searchResult") + "]");
    // Remove content
    $(".table-body-line").remove();
    if (constrainedResult == undefined) {
      alert("Search result error!");
      return ;
    }
    console.log(constrainedResult);
    // Display
    for (let i = 0; i < constrainedResult.length; i++) {
      let getContentUrl = baseUrl + "get_tra_content?" +
          "id=" + constrainedResult[i];
      $.ajax({
        url: getContentUrl,
        async: true,
        success: function(data, status) {
          data = eval("(" + data + ")");
          let row = document.getElementById("tra-table-elem").insertRow(-1);
          row.setAttribute("class", "table-body-line")
          let title = row.insertCell(0);
          let content = row.insertCell(1);
          let userId = row.insertCell(2);
          let time = row.insertCell(3);
          let location = row.insertCell(4);

          title.setAttribute("id", "tra-title-" + i);
          $("#tra-title-" + i).click(function() {
            localStorage.setItem("examineId", constrainedResult[i]);
            window.location.href = "../html/tra_admin_examine.html";
          });
          title.innerHTML = data.title;
          content.innerHTML = data.content.slice(0, 20);
          userId.innerHTML = data.user_id;
          time.innerHTML = data.time;
          location.innerHTML = "(" + Math.floor(data.latitude) + ", " + Math.floor(data.longitude) + ")";
        }
      });
    }
  }

  display();

  $("#search-btn").click(function() {
    search();
    display();
    if (!localStorage) {
      alert("No localStorage!");
      return;
    }
    console.log("cookie: " + localStorage.getItem("searchResult"));  // debug
  });

  $("#logout").click(function(){
    window.location.href = "../html/tra_admin_login.html";
  });

  $("#journal-list").click(function(){
    window.location.href = "../html/tra_admin_home.html";
  });

  $("#tipOff-todo").click(function(){
    window.location.href = "../html/tra_admin_tipOff.html";
  });
});