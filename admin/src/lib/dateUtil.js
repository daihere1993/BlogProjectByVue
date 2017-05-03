var dateUtil = {
  format: function(date, format) {
    if (!date)
      return "";

    if (format === "pithy")
    {
      var now= new Date();
      var short = $filter("date")(date,"shortDate");
      var shortA = $filter("date")(now,"shortDate");
      var minus = now.getTime() - date.getTime();
      var residue = Math.floor(minus/86400000);
      var Y=$filter("date")(now,"yyyy");
      var y=$filter("date")(date,"yyyy");
      var M=$filter("date")(date,"MM");
      var D=$filter("date")(date,"dd");
      var H=$filter("date")(date,"HH");
      var m=$filter("date")(date,"mm");
      if (short == shortA){
        return "今天 "+H+":"+m;
      }
      else if(residue == 0){
        return "昨天 "+H+":"+m;
      }
      else if(0<residue && residue<7){
        return residue+"天前";
      }
      else if(Y == y){
        return  M+"月"+D+"日";
      }else{
        return y+"年"+M+"月"+D+"日";
      }
    }

    if (format === "date")
      format = "yyyy/MM/dd";
    else if (format === "time")
      format = "HH:mm:ss";
    else if (format === "dateTime" || !format)
      format = "yyyy-MM-dd HH:mm:ss";
    return _dateFormat(date, format);
  }
}

module.exports = dateUtil