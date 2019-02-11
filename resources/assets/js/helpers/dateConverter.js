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
  toTimeOnly: date => {
    if(!date) throw new Error('You need to pass date object.');
  },
  toStageDate: date => {
    if(!date) throw new Error('You need to pass date object.');
    if(typeof date !== Date) {
      date = new Date(date)
    } else {
      throw new Error('dateConverter.toDateOnly method can receive only date objects.');
    }

    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();

    const addedTime = date.getTime(),
          currentTime = new Date().getTime(),
          distinction = currentTime - addedTime;

    //I know, right :D?
    const addedDate = distinction < 9999
    ? 'kilka sekund temu'
    : (distinction >= 9999 && distinction < 59999)
    ? 'kilkanaście sekund temu'
    : (distinction >= 59999 && distinction < 299999)
    ? 'ponad minutę temu'
    : (distinction >= 299995 && distinction < 1799999)
    ? 'ponad 5 minut temu'
    : (distinction >= 1799999 && distinction < 359999)
    ? 'ponad 30 minut temu'
    : (distinction >= 359999 && distinction < 7199999)
    ? 'ponad godzinę temu'
    : (distinction >= 7199999 && distinction < 17999999)
    ? 'ponad 2 godziny temu'
    : (distinction >= 17999999 && distinction < 18119999)
    ? 'ponad 5 godzin temu'
    : `${date.toLocaleString()}`;

    return addedDate;
  }
}

export default dateConverter;
