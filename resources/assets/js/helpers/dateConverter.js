const dateConverter = {
  toDateOnly: date => {
    if(!date) throw new Error('You need to pass date object.');
    if(typeof date !== Date) {
      date = new Date(date)
    } else {
      throw new Error('dateConverter.toDateOnly method can receive only date objects.');
    }

    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();

    return `${year}.${month < 10 ? "0" + month : month}.${day < 10 ? '0' + day : day}`;
  },
  toStageDate: date => {
    if(!date)
      throw new Error('You need to pass a parameter.');
    if(typeof date !== Date)
      date = new Date(date);

    let milisecondsDiff =  Date.now() - date.getTime(),
      secondsDiff = Math.floor(milisecondsDiff / 1000),
      minutesDiff = Math.floor(secondsDiff / 60),
      hoursDiff = Math.floor(minutesDiff / 60),
      dayDiff = Math.floor(hoursDiff / 24);

    if(secondsDiff > 0 && secondsDiff < 2) return ` ${secondsDiff} second ago`;
    if(secondsDiff > 1 && secondsDiff < 60) return ` ${secondsDiff} seconds ago`;
    if(minutesDiff >= 1 && minutesDiff < 2) return ` ${minutesDiff} minute ago`;
    if(minutesDiff > 1 && minutesDiff < 60) return ` ${minutesDiff} minutes ago`;
    if(hoursDiff >= 1 && hoursDiff < 2) return ` ${hoursDiff} hour ago`;
    if(hoursDiff > 1 && hoursDiff < 24) return ` ${hoursDiff} hours ago`;
    if(dayDiff >= 1 && dayDiff < 2) return ` ${dayDiff} day ago`;
    if(dayDiff > 1) return ` ${dayDiff} days ago`;
  }
}

export default dateConverter;
